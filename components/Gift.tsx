"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";
import Lightbox from "./Lightbox";

type GiftProps = {
  items: MediaItem[];
};

export default function Gift({ items }: GiftProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const opening = items.slice(0, 3);
  const punchline = items[3];

  return (
    <section id="poklon" className="px-2 py-16 sm:px-4 sm:py-20">
      <div className="mx-auto mb-10 max-w-lg px-4 text-center sm:mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
          Poklon
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-snug text-cream sm:text-4xl">
          Od nas svih, od srca, za našeg Nikolu
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-1.5 sm:gap-2">
        {opening.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[3/4] overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={item.alt}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 33vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {punchline ? (
        <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center px-2 sm:mt-10">
          <button
            type="button"
            onClick={() => setOpenIndex(3)}
            className="group relative aspect-[3/4] w-full max-w-md overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:w-[46%]"
            aria-label={punchline.alt}
          >
            <Image
              src={punchline.src}
              alt={punchline.alt}
              fill
              sizes="(max-width: 768px) 100vw, 46vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-3 pb-2.5 pt-10">
              <span className="block text-center font-serif text-[0.7rem] leading-snug text-cream/90 sm:text-xs">
                Ako nekog zanima gdje su završili novci iz kuverte :)
              </span>
            </span>
          </button>
        </div>
      ) : null}

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
