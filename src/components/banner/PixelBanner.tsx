"use client";

import Image, { type StaticImageData } from "next/image";
import { DigitalClock } from "./digital-clock";
import { ParticleField } from "./particle-field";
import { DAY_PARTICLE_PALETTE, NIGHT_PARTICLE_PALETTE } from "./particle-palettes";
import { useIsDark } from "./use-is-dark";

export type PixelBannerProps = {
  dayImage: StaticImageData | string;
  nightImage: StaticImageData | string;
  alt: string;
  /** Available-work (or other) label shown inside the lower-left corner. */
  availability?: string | null;
  showClock?: boolean;
  showParticles?: boolean;
  /** Particle count multiplier. Defaults to 1. */
  density?: number;
  /** Set true for a banner rendered above the fold. */
  priority?: boolean;
  className?: string;
};

export function PixelBanner({
  dayImage,
  nightImage,
  alt,
  availability = null,
  showClock = true,
  showParticles = true,
  density = 1,
  priority = false,
  className = "h-56 sm:h-72",
}: PixelBannerProps) {
  const isDark = useIsDark();

  return (
    <div className={`pixel-banner relative isolate w-full overflow-hidden bg-[#06101d] ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={dayImage}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="pixel-banner-media object-cover object-[center_55%] opacity-100 transition-opacity duration-700 ease-out dark:opacity-0"
        />
        <Image
          src={nightImage}
          alt=""
          aria-hidden="true"
          fill
          priority={priority}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="pixel-banner-media object-cover object-[center_55%] opacity-0 transition-opacity duration-700 ease-out dark:opacity-100"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#020617]/45 via-transparent to-[#020617]/10"
        aria-hidden="true"
      />

      {showParticles ? (
        <ParticleField
          palette={isDark ? NIGHT_PARTICLE_PALETTE : DAY_PARTICLE_PALETTE}
          density={density}
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        />
      ) : null}

      {(availability || showClock) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-3">
          {availability ? (
            <div className="inline-flex items-center gap-2 border border-white/25 bg-black/65 px-2.5 py-1.5 font-mono text-[10px] text-white sm:px-3 sm:text-[11px]">
              <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {availability}
            </div>
          ) : (
            <span />
          )}

          {showClock ? <DigitalClock /> : null}
        </div>
      )}
    </div>
  );
}
