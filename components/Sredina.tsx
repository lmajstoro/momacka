"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/media";
import Lightbox from "./Lightbox";

type SredinaProps = {
  items: MediaItem[];
};

function Tile({
  item,
  onOpen,
}: {
  item: MediaItem;
  onOpen: () => void;
}) {
  if (item.type === "video") {
    return (
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        <video
          src={item.src}
          poster={item.thumb}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[3/4] overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={item.alt}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
    </button>
  );
}

export default function Sredina({ items }: SredinaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const featured =
    items.find((item) => item.src.endsWith("/20260829_204137.jpg")) ??
    items[0];
  const rest = items.filter((item) => item !== featured);

  if (!featured) return null;

  return (
    <section id="sredina" className="px-2 py-16 sm:px-4 sm:py-20">
      <div className="mx-auto mb-10 max-w-xl px-4 text-center sm:mb-12">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
          Nastavak večeri
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-snug text-cream sm:text-4xl">
          A onda smo nastavili jače nego ikada
        </h2>
      </div>

      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => setOpenIndex(items.indexOf(featured))}
          className="group relative aspect-[16/10] w-full overflow-hidden bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label={featured.alt}
        >
          <Image
            src={featured.src}
            alt={featured.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </button>

        {rest.length > 0 ? (
          <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:mt-2 sm:gap-2 md:grid-cols-4">
            {rest.map((item) => (
              <Tile
                key={item.id}
                item={item}
                onOpen={() => setOpenIndex(items.indexOf(item))}
              />
            ))}
          </div>
        ) : null}
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
