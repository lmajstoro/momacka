"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { MediaItem } from "@/lib/media";

type LightboxProps = {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const item = items[index];
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      const next = (index + delta + items.length) % items.length;
      onIndexChange(next);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-50 flex h-dvh w-full flex-col bg-black"
      onTouchStart={(event) => {
        if ((event.target as HTMLElement).closest("video")) return;
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current == null) return;
        if ((event.target as HTMLElement).closest("video")) {
          touchStartX.current = null;
          return;
        }
        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const dx = endX - touchStartX.current;
        touchStartX.current = null;
        if (dx > 50) go(-1);
        if (dx < -50) go(1);
      }}
    >
      <div className="flex items-center justify-between px-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
        <p className="px-3 text-xs tracking-widest text-cream/50">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex min-h-11 min-w-11 items-center justify-center text-cream"
          aria-label="Zatvori"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M2 2L16 16M16 2L2 16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-1 top-1/2 z-10 hidden min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-cream/80 sm:flex"
          aria-label="Prethodna"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11.5 3L5.5 9L11.5 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="absolute inset-3 sm:inset-6">
          {item.type === "video" ? (
            <video
              key={item.id}
              src={item.src}
              poster={item.thumb}
              controls
              playsInline
              autoPlay
              className="h-full w-full object-contain"
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          )}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-1 top-1/2 z-10 hidden min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-cream/80 sm:flex"
          aria-label="Sljedeća"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M6.5 3L12.5 9L6.5 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {item.caption ? (
        <p className="px-6 pb-[max(1rem,env(safe-area-inset-bottom))] text-center font-serif italic text-cream/70">
          {item.caption}
        </p>
      ) : (
        <div className="pb-[max(1rem,env(safe-area-inset-bottom))]" />
      )}
    </div>
  );
}
