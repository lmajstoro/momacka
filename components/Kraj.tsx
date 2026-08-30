"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";
import Lightbox from "./Lightbox";

type KrajProps = {
  items: MediaItem[];
};

export default function Kraj({ items }: KrajProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const photo = items.find((item) => item.type === "image");

  if (!photo) return null;

  const index = items.findIndex((item) => item.id === photo.id);

  return (
    <section id="kraj" className="px-2 py-16 sm:px-4 sm:py-20">
      <div className="mx-auto mb-10 max-w-xl px-4 text-center sm:mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
          Kraj večeri
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-snug text-cream sm:text-4xl">
          Uzalud vam trud svirači
        </h2>
        <p className="mt-6 font-serif text-lg leading-relaxed text-cream/80 sm:text-xl">
          Ostali su najjači.
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-2">
        <button
          type="button"
          onClick={() => setOpenIndex(index)}
          className="group relative aspect-[9/16] w-full max-w-md overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:w-[37%]"
          aria-label={photo.alt}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 37vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        </button>
        <p className="mt-5 max-w-md px-4 text-center font-serif text-lg leading-snug text-cream/85 sm:text-xl">
          Neka ti ova večer ostane u najljepšem sjećanju, a brak koji je pred
          tobom bude još bolji!!!
        </p>
      </div>

      {openIndex !== null ? (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      ) : null}
    </section>
  );
}
