import Image from "next/image";

const scenes = {
  library: "/pixel/environment/atelier-library.webp",
  arcade: "/pixel/environment/atelier-arcade.webp",
  gallery: "/pixel/environment/atelier-gallery.webp",
  observatory: "/pixel/environment/atelier-observatory.webp",
} as const;

/** Architectural scenery only; portfolio facts and controls remain in HTML. */
export function AtelierRoomScene({
  variant,
  className = "",
}: {
  variant: keyof typeof scenes;
  className?: string;
}) {
  return (
    <div className={`atelier-room-scene atelier-room-scene--${variant} ${className}`} aria-hidden="true">
      <picture>
        <source media="(max-width: 767px)" srcSet={scenes[variant].replace(".webp", "-compact.webp")} />
        <Image src={scenes[variant]} alt="" width={960} height={640} unoptimized loading="lazy" />
      </picture>
    </div>
  );
}
