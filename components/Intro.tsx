"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";
import Lightbox from "./Lightbox";

type IntroProps = {
  items: MediaItem[];
};

export default function Intro({ items }: IntroProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="uvod" className="px-2 py-16 sm:px-4 sm:py-20">
      <div className="mx-auto mb-10 max-w-md px-4 text-center sm:mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
          Prva stanica
        </p>
        <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
          Lovački dom Srna
        </h2>
        <p className="mt-2 text-[0.7rem] uppercase tracking-[0.28em] text-gold/80">
          Ferežani
        </p>
        <p className="mt-6 font-serif text-lg leading-relaxed text-cream/80 sm:text-xl">
          Tu smo se zagrijali i pripremali za dolazak tamburaša.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className={`group relative overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              index === 0
                ? "col-span-2 aspect-[4/5] md:col-span-1 md:aspect-[3/4]"
                : "aspect-[3/4]"
            }`}
            aria-label={item.alt}
          >
            <Image
              src={item.thumb ?? item.src}
              alt={item.alt}
              fill
              sizes={
                index === 0
                  ? "(max-width: 768px) 100vw, 33vw"
                  : "(max-width: 768px) 50vw, 33vw"
              }
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
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
