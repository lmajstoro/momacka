"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";
import Lightbox from "./Lightbox";

type MusicProps = {
  items: MediaItem[];
};

function FeaturedVideo({ item }: { item: MediaItem }) {
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
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
  );
}

export default function Music({ items }: MusicProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="muzika" className="px-2 py-16 sm:px-4 sm:py-20">
      <div className="mx-auto mb-10 max-w-lg px-4 text-center sm:mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
          Muzika
        </p>
        <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
          Muzikaši
        </h2>
        <p className="mt-6 font-serif text-lg leading-relaxed text-cream/80 sm:text-xl">
          A onda su došli muzikaši, pa je bilo vrijeme da zabava započne.
        </p>
      </div>

      <div className="mx-auto flex w-full flex-col items-center gap-1.5 sm:gap-2 md:flex-row md:items-start md:justify-center">
        {items.map((item, index) =>
          item.type === "video" ? (
            <div key={item.id} className="w-[80%] md:w-[37%]">
              <FeaturedVideo item={item} />
            </div>
          ) : (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative aspect-[9/16] w-[80%] overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:w-[37%]"
              aria-label={item.alt}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 80vw, 37vw"
                className="object-cover"
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
