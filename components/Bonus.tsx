"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";
import Lightbox from "./Lightbox";

type BonusProps = {
  items: MediaItem[];
};

export default function Bonus({ items }: BonusProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section id="bonus" className="px-2 py-16 sm:px-4 sm:py-20">
      <div className="mx-auto mb-10 max-w-xl px-4 text-center sm:mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
          Bonus
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-snug text-cream sm:text-4xl">
          Jopi i ja, frenda dva
        </h2>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-1.5 px-2 sm:gap-2">
        {items.map((item, index) =>
          item.type === "video" ? (
            <div
              key={item.id}
              className="relative aspect-[9/16] w-full max-w-md overflow-hidden bg-black md:w-[37%]"
            >
              <video
                src={item.src}
                poster={item.thumb}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              >
                Vaš preglednik ne podržava video.
              </video>
            </div>
          ) : (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative aspect-[9/16] w-full max-w-md overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:w-[37%]"
              aria-label={item.alt}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 37vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </button>
          ),
        )}
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
