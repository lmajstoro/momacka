import AlbumLink from "./AlbumLink";

export default function Footer() {
  return (
    <footer className="px-6 pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.25rem))] pt-4 text-center sm:pb-24">
      <div className="mx-auto mb-6 h-px w-12 bg-gold/40" />
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold/80">
        29. 8. 2026.
      </p>
      <p className="mt-3 font-serif italic text-cream/55">Za uspomenu.</p>
      <div className="mt-2">
        <AlbumLink />
      </div>
    </footer>
  );
}
