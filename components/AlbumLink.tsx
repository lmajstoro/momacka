import { ALBUM_URL } from "@/lib/links";

type AlbumLinkProps = {
  className?: string;
  variant?: "text" | "fab";
};

export default function AlbumLink({
  className = "",
  variant = "text",
}: AlbumLinkProps) {
  const isFab = variant === "fab";

  return (
    <a
      href={ALBUM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        isFab
          ? `fixed z-40 inline-flex min-h-11 items-center justify-center rounded-full border border-gold/50 bg-background/85 px-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold shadow-[0_10px_28px_rgba(0,0,0,0.55)] backdrop-blur-md transition-colors hover:border-gold hover:text-cream bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.75rem))] right-[max(0.75rem,env(safe-area-inset-right))] ${className}`
          : `inline-flex min-h-11 items-center justify-center px-2 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-gold/45 transition-colors hover:text-gold/80 ${className}`
      }
    >
      Pogledaj sve slike
    </a>
  );
}
