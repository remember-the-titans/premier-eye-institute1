"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { withBasePath } from "@/lib/base-path";
import { FRAME_FINISHES, LENS_TINTS } from "@/lib/eyewear-studio";
import { GlassesModel } from "@/components/eyewear/glasses-model";

/* The homepage hero glasses — the REAL 3D model (public/models/glasses.glb),
   not a photo. It does one fast turntable turn around the vertical axis the
   first time it scrolls into view (front → temple → genuine back → around to
   front), then rests facing front. Real geometry, so the back is really the
   back — no flat-image squish. Transparent canvas, so no multiply-blend hack
   is needed. Reduced motion / no-JS falls back to the settled still. */

const SPIN_DURATION = 1.5; // seconds for one full turn (a bit fast)
const SPIN_DELAY = 0.35; // beat before it starts, so the turn is noticed

const FALLBACK_CLASS = "w-[min(80vw,360px)]";
const FALLBACK_STYLE = {
  mixBlendMode: "multiply" as const,
  filter: "brightness(1.07)",
};

function GlassesFallback() {
  return (
    <Image
      src={withBasePath("/hero-fallback/glasses.webp")}
      alt="A pair of black-framed glasses with a warm orange accent line"
      width={900}
      height={900}
      priority
      className={FALLBACK_CLASS}
      style={FALLBACK_STYLE}
    />
  );
}

/* Rotates the frame group 0 → 360° once, eased, then locks it front-on and
   signals done so the parent can stop the render loop. */
function SpinRig({ onDone }: { onDone: () => void }) {
  const ref = useRef<THREE.Group>(null);
  const startAt = useRef<number | null>(null);
  const done = useRef(false);

  useFrame((state) => {
    const g = ref.current;
    if (!g || done.current) return;
    const now = state.clock.getElapsedTime();
    if (startAt.current === null) startAt.current = now + SPIN_DELAY;
    const p = Math.min(1, Math.max(0, (now - startAt.current) / SPIN_DURATION));
    // easeInOutCubic — starts and settles softly, quick through the middle
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    g.rotation.y = e * Math.PI * 2;
    if (p >= 1) {
      g.rotation.y = 0; // rest facing front
      done.current = true;
      onDone();
    }
  });

  return (
    <group ref={ref}>
      <GlassesModel finish={FRAME_FINISHES[0]} tint={LENS_TINTS[0]} />
    </group>
  );
}

export default function HeroGlasses() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [spinDone, setSpinDone] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // one-time trigger
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduceMotion) {
    return (
      <div className={`flex justify-center ${FALLBACK_CLASS}`}>
        <GlassesFallback />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`aspect-square ${FALLBACK_CLASS}`}>
      <Canvas
        dpr={[1, 2]}
        frameloop={inView && !spinDone ? "always" : "never"}
        camera={{ position: [0, 0.06, 2.7], fov: 30, near: 0.1, far: 20 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {inView && <SpinRig onDone={() => setSpinDone(true)} />}
          <Environment resolution={256}>
            <Lightformer intensity={1.7} position={[0, 2.2, 2]} scale={[6, 3, 1]} />
            <Lightformer
              intensity={0.9}
              position={[-3, 1, -1]}
              rotation-y={Math.PI / 2}
              scale={[4, 2, 1]}
              color="#ffe3d1"
            />
            <Lightformer
              intensity={0.8}
              position={[3, 0.6, 1]}
              rotation-y={-Math.PI / 2}
              scale={[4, 2, 1]}
            />
            <Lightformer
              intensity={0.45}
              position={[0, -2, 3]}
              scale={[5, 2, 1]}
              color="#ffd9c2"
            />
          </Environment>
          <ContactShadows
            position={[0, -0.42, 0]}
            opacity={0.38}
            scale={2.4}
            blur={2.8}
            far={0.9}
            color="#2a150a"
            frames={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
