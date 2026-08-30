export type MediaType = "image" | "video";

export type MediaItem = {
  id: string;
  type: MediaType;
  src: string;
  thumb?: string;
  alt: string;
  caption?: string;
};

const HERO: MediaItem = {
  id: "hero",
  type: "image",
  src: "/photos/hero.png",
  alt: "Nikola i kum",
};

const INTRO: MediaItem[] = [
  {
    id: "uvod-01",
    type: "image",
    src: "/photos/uvod/01.png",
    alt: "Lovački dom Srna u sumrak",
    caption: "Ferežani",
  },
  {
    id: "uvod-02",
    type: "image",
    src: "/photos/uvod/02.png",
    alt: "Ekipa na terasi lovačkog doma",
    caption: "Zagrijavanje",
  },
  {
    id: "uvod-03",
    type: "image",
    src: "/photos/uvod/03.png",
    alt: "Unutrašnjost Lovačkog doma Srna",
    caption: "Lovački dom Srna",
  },
];

const R2_BASE =
  "https://pub-d3956d58a15a4a7699662ffbc0748825.r2.dev/momacka";

const R2_VIDEO: Record<string, string> = {
  muzika: `${R2_BASE}/muzikasi.mp4`,
  vecera: `${R2_BASE}/vecera.mp4`,
  sredina: `${R2_BASE}/nastavak.mp4`,
  majica: `${R2_BASE}/majica.mp4`,
};

const MUSIC: MediaItem[] = [
  {
    id: "muzika-01",
    type: "image",
    src: "/photos/muzika/01.png",
    alt: "Muzikaši",
    caption: "Muzikaši",
  },
  {
    id: "muzika-video",
    type: "video",
    src: R2_VIDEO.muzika,
    thumb: "/photos/muzika/poster.jpg",
    alt: "Muzikaši sviraju",
    caption: "Tamburaši",
  },
];

const DINNER: MediaItem[] = [
  {
    id: "vecera-video",
    type: "video",
    src: R2_VIDEO.vecera,
    thumb: "/photos/vecera/204256-poster.jpg",
    alt: "Večera",
    caption: "Pa je bilo vrijeme da si pojedemo nekaj",
  },
  {
    id: "vecera-01",
    type: "image",
    src: "/photos/vecera/205011.jpg",
    alt: "Bufet spreman za večeru",
    caption: "Prije jela",
  },
  {
    id: "vecera-02",
    type: "image",
    src: "/photos/vecera/205015.jpg",
    alt: "Roštilj na bufetu",
    caption: "Večera",
  },
  {
    id: "vecera-03",
    type: "image",
    src: "/photos/vecera/205028.jpg",
    alt: "Pite i vino na stolu",
    caption: "Nekaj za jest",
  },
  {
    id: "vecera-04",
    type: "image",
    src: "/photos/vecera/205933.jpg",
    alt: "Ekipa za stolom",
    caption: "Za stolom",
  },
];

const GIFT: MediaItem[] = [
  {
    id: "poklon-01",
    type: "image",
    src: "/photos/poklon/01.jpg",
    alt: "Otvaranje poklona",
    caption: "Poklon",
  },
  {
    id: "poklon-02",
    type: "image",
    src: "/photos/poklon/02.jpg",
    alt: "Novi sat",
    caption: "Sat",
  },
  {
    id: "poklon-03",
    type: "image",
    src: "/photos/poklon/03.jpg",
    alt: "Čestitka i kuverta",
    caption: "Kuverta",
  },
  {
    id: "poklon-04",
    type: "image",
    src: "/photos/poklon/04.jpg",
    alt: "Novci u harmonici",
    caption: "Ako nekog zanima gdje su završili novci iz kuverte :)",
  },
];

export async function getHero(): Promise<MediaItem> {
  return HERO;
}

export async function getIntro(): Promise<MediaItem[]> {
  return INTRO;
}

export async function getMusic(): Promise<MediaItem[]> {
  return MUSIC;
}

export async function getDinner(): Promise<MediaItem[]> {
  return DINNER;
}

export async function getGift(): Promise<MediaItem[]> {
  return GIFT;
}

const MEDIA_EXT = /\.(jpe?g|png|webp|gif|mp4|webm)$/i;

function publicName(file: string) {
  return file.replace(/\(\d+\)(?=\.[^.]+$)/, "");
}

async function listMediaFiles(dir: string): Promise<string[]> {
  const { readdir } = await import("fs/promises");
  try {
    return (await readdir(dir)).filter((file) => MEDIA_EXT.test(file));
  } catch {
    return [];
  }
}

async function syncFolder(fromRel: string, toRel: string) {
  const { copyFile, mkdir, stat } = await import("fs/promises");
  const path = await import("path");
  const fromDir = path.join(process.cwd(), fromRel);
  const toDir = path.join(process.cwd(), toRel);
  await mkdir(toDir, { recursive: true });
  const files = await listMediaFiles(fromDir);
  await Promise.all(
    files.map(async (file) => {
      const from = path.join(fromDir, file);
      const to = path.join(toDir, publicName(file));
      try {
        const [source, existing] = await Promise.all([
          stat(from),
          stat(to).catch(() => null),
        ]);
        if (!existing || source.size !== existing.size) {
          await copyFile(from, to);
        }
      } catch {
        await copyFile(from, to);
      }
    }),
  );
}

function toMediaItems(
  files: string[],
  folder: string,
  alt: string,
): MediaItem[] {
  return files.map((file) => {
    const isVideo = /\.(mp4|webm)$/i.test(file);
    const base = file.replace(/\.[^.]+$/, "");
    return {
      id: `${folder}-${file}`,
      type: isVideo ? "video" : "image",
      src: isVideo && R2_VIDEO[folder] ? R2_VIDEO[folder] : `/photos/${folder}/${file}`,
      alt,
      thumb: isVideo ? `/photos/${folder}/${base}-poster.jpg` : undefined,
    };
  });
}

export async function getMid(): Promise<MediaItem[]> {
  const path = await import("path");
  await syncFolder("slike/sredina", "public/photos/sredina");
  const dir = path.join(process.cwd(), "public/photos/sredina");
  const files = (await listMediaFiles(dir))
    .filter((file) => !/-poster\./i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const featuredName = "20260829_204137.jpg";
  const ordered = [
    ...files.filter((file) => file === featuredName),
    ...files.filter((file) => file !== featuredName),
  ];
  return toMediaItems(ordered, "sredina", "Nastavak večeri");
}

async function getSyncedFolder(
  fromRel: string,
  toRel: string,
  folder: string,
  alt: string,
): Promise<MediaItem[]> {
  const path = await import("path");
  await syncFolder(fromRel, toRel);
  const dir = path.join(process.cwd(), toRel);
  const files = (await listMediaFiles(dir))
    .filter((file) => !/-poster\./i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return toMediaItems(files, folder, alt);
}

export async function getShirt(): Promise<MediaItem[]> {
  return getSyncedFolder(
    "slike/majica",
    "public/photos/majica",
    "majica",
    "Pa je došlo vrijeme za malo golotinje",
  );
}

export async function getFinale(): Promise<MediaItem[]> {
  return getSyncedFolder(
    "slike/uzalud trud sviraci",
    "public/photos/uzalud",
    "uzalud",
    "Uzalud vam trud svirači",
  );
}

export async function getBonus(): Promise<MediaItem[]> {
  return getSyncedFolder(
    "slike/bonus",
    "public/photos/bonus",
    "bonus",
    "Jopi i ja, frenda dva",
  );
}
