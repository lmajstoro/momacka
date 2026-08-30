import Image from "next/image";
import type { MediaItem } from "@/lib/media";
import GrainOverlay from "./GrainOverlay";

type HeroProps = {
  image: MediaItem;
};

export default function Hero({ image }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-dvh items-end justify-center overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_22%] md:object-contain md:object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-[#0a0a0a]"
      />
      <GrainOverlay />

      <div className="relative z-20 flex w-full flex-col items-center px-6 pb-16 pt-24 text-center sm:pb-20">
        <p className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-gold sm:text-xs">
          29. 8. 2026.
        </p>
        <h1 className="font-serif text-[2.65rem] leading-[1.05] text-cream sm:text-6xl md:text-7xl">
          Nikolina momačka
        </h1>
        <p className="mt-5 max-w-sm font-serif text-lg italic leading-snug text-cream/80 sm:max-w-md sm:text-xl">
          Posljednja večera mladog boema
        </p>
      </div>

      <a
        href="#uvod"
        className="absolute bottom-6 left-1/2 z-20 flex min-h-11 min-w-11 -translate-x-1/2 flex-col items-center justify-center gap-1 text-cream/70"
        aria-label="Skrolaj na uvod"
      >
        <span className="block h-8 w-px bg-gold/70" />
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          className="animate-bounce"
          aria-hidden
        >
          <path
            d="M1 1.5L7 6.5L13 1.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
