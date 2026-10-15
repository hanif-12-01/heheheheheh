import Image from "next/image";
import { cn } from "@/lib/utils";

/** Original illustration layers only. Portfolio information always lives in HTML. */
export function WorldScene({ variant = "hero", className }: {
  variant?: "hero" | "workshop" | "trail" | "clearing" | "hall" | "courtyard";
  className?: string;
}) {
  if (variant === "workshop") {
    return <div className={cn("world-workshop-art", className)} aria-hidden="true">
      <Image src="/pixel/environment/workshop-interior.webp" alt="" width={384} height={288}
        unoptimized loading="lazy" className="world-raster" />
    </div>;
  }
  const scenes = { trail: "connected-trail", hall: "achievement-hall", courtyard: "engineering-courtyard" };
  if (variant === "trail" || variant === "hall" || variant === "courtyard") {
    return <div className={cn("world-scene", "world-scene--illustrated", `world-scene--${variant}`, className)} aria-hidden="true">
      <Image src={`/pixel/environment/${scenes[variant]}.webp`} alt="" fill unoptimized
        loading="lazy" sizes="(max-width: 768px) 100vw, 1200px" className="world-landscape world-raster" />
    </div>;
  }
  return <div className={cn("world-scene", `world-scene--${variant}`, className)} aria-hidden="true">
    {variant === "hero" && <Image src="/pixel/environment/woodland-workshop.webp" alt=""
      fill unoptimized preload sizes="100vw" className="world-landscape world-raster" />}
    <Image src="/pixel/environment/clouds.svg" alt="" width={768} height={160}
      unoptimized className="world-clouds" />
    <Image src="/pixel/environment/foreground.svg" alt="" width={768} height={96}
      unoptimized className="world-foreground" />
  </div>;
}
