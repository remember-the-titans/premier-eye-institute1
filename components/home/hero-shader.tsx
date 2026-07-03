"use client";

import { useEffect, useRef } from "react";

/* Ambient WebGL wash behind the hero: warm light drifting across the page,
   like sunlight through a lens. Colors mirror the tokens in globals.css
   (--hero-wash, --accent-tint, --accent). Renders at reduced resolution —
   the softness is the point — and pauses whenever the hero is offscreen or
   the tab is hidden. If WebGL is unavailable the canvas simply stays
   transparent and the static gradient underneath shows through. */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;

/* globals.css: --bg, --hero-wash, --accent-tint, --accent */
const vec3 WHITE  = vec3(1.0, 1.0, 1.0);
const vec3 WASH   = vec3(0.992, 0.957, 0.933);
const vec3 TINT   = vec3(0.988, 0.922, 0.882);
const vec3 ACCENT = vec3(0.906, 0.349, 0.165);

float bloom(vec2 p, vec2 c, float r) {
  float d = length(p - c);
  return exp(-(d * d) / (r * r));
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;
  float t = uTime * 0.05;

  /* Base: white settling into the warm wash toward the top. */
  vec3 col = mix(WHITE, WASH, smoothstep(0.45, 1.15, uv.y));

  /* Three slow warm blooms wandering the stage. */
  vec2 c1 = vec2(0.5 * uRes.x / uRes.y + 0.30 * sin(t * 0.9), 0.72 + 0.10 * sin(t * 1.3 + 1.7));
  vec2 c2 = vec2(0.5 * uRes.x / uRes.y - 0.34 * sin(t * 0.7 + 0.8), 0.38 + 0.12 * cos(t * 1.1));
  vec2 c3 = vec2(0.5 * uRes.x / uRes.y + 0.18 * cos(t * 1.4 + 2.6), 0.55 + 0.16 * sin(t * 0.8 + 4.2));

  col = mix(col, TINT, 0.38 * bloom(p, c1, 0.42));
  col = mix(col, WASH, 0.48 * bloom(p, c2, 0.50));
  col = mix(col, TINT, 0.28 * bloom(p, c3, 0.34));

  /* A faint accent halo that breathes near the heart of the stage. */
  float halo = bloom(p, vec2(0.5 * uRes.x / uRes.y, 0.52), 0.34);
  col = mix(col, ACCENT, halo * (0.028 + 0.01 * sin(t * 2.0)));

  /* Dither so the subtle gradient never bands. */
  col += (hash(gl_FragCoord.xy) - 0.5) * (1.8 / 255.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");

    /* Half-resolution render: soft by design, cheap by consequence. */
    const SCALE = 0.5;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let running = false;
    let visible = true;
    let shown = false;
    const start = performance.now();

    const frame = () => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
      }
      raf = requestAnimationFrame(frame);
    };

    const setRunning = (next: boolean) => {
      if (next === running) return;
      running = next;
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        setRunning(visible && !document.hidden);
      },
      { rootMargin: "80px" }
    );
    io.observe(canvas);

    const onVisibility = () => setRunning(visible && !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      setRunning(false);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full opacity-0 transition-opacity duration-700"
    />
  );
}
