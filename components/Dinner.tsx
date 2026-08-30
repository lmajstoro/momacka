"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";
import Lightbox from "./Lightbox";

type DinnerProps = {
  items: MediaItem[];
};

export default function Dinner({ items }: DinnerProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const video = items.find((item) => item.type === "video");
  const photos = items.filter((item) => item.type === "image");

  return (
    <section id="vecera" className="px-2 py-16 sm:px-4 sm:py-20">
      <div className="mx-auto mb-10 max-w-lg px-4 text-center sm:mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
          Večera
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-snug text-cream sm:text-4xl">
          Pa je bilo vrijeme da si pojedemo nekaj
        </h2>
      </div>

      <div className="mx-auto max-w-7xl">
        {video ? (
          <div className="mx-auto mb-1.5 w-[80%] sm:mb-2 md:w-[37%]">
            <div className="relative aspect-[9/16] overflow-hidden bg-black">
              <video
                src={video.src}
                poster={video.thumb}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {photos.map((item) => {
            const index = items.findIndex((entry) => entry.id === item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative aspect-[3/4] overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={item.alt}
              >
                <Image
                  src={item.thumb ?? item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </button>
            );
          })}
        </div>
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
