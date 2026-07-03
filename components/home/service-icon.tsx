import {
  Eye,
  CircleDot,
  MoonStar,
  Droplets,
  Sparkles,
  Monitor,
  Activity,
  Gauge,
  Glasses,
  Sun,
} from "lucide-react";
import type { Service } from "@/lib/site";

const icons = {
  eye: Eye,
  contact: CircleDot,
  moon: MoonStar,
  droplet: Droplets,
  sparkles: Sparkles,
  monitor: Monitor,
  activity: Activity,
  gauge: Gauge,
  glasses: Glasses,
  sun: Sun,
} as const;

export function ServiceIcon({
  icon,
  className = "size-6",
}: {
  icon: Service["icon"];
  className?: string;
}) {
  const Icon = icons[icon];
  return <Icon className={className} strokeWidth={1.7} aria-hidden="true" />;
}
