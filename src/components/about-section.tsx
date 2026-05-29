import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { aboutParagraphs, aboutPhotos } from "@/lib/site-data";

const photoLayout = [
  { aspect: "aspect-[3/4]", rotate: "-rotate-3", badgePos: "top-3 right-3" },
  { aspect: "aspect-[4/3]", rotate: "rotate-3", badgePos: "bottom-3 right-3" },
  { aspect: "aspect-square", rotate: "-rotate-2", badgePos: "top-3 right-3" },
];

const fallbackEmoji = ["👨‍💻", "🏔️", "🐶"];

export function AboutSection() {
  return (
    <section className="py-12">
      <SectionHeading title="About" />
      <div className="space-y-5 text-base leading-normal text-muted-foreground">
        {aboutParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <ul className="mt-12 grid grid-cols-3 items-center gap-6 sm:gap-10">
        {aboutPhotos.map((photo, i) => {
          const cfg = photoLayout[i] ?? photoLayout[0];
          const emoji = photo.emoji ?? fallbackEmoji[i];
          return (
            <li key={photo.src} className={`relative ${cfg.rotate}`}>
              <div
                className={`relative ${cfg.aspect} w-full overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border/40`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 280px, 33vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              {emoji ? (
                <span
                  aria-hidden
                  className={`absolute ${cfg.badgePos} z-10 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-lg shadow-sm`}
                >
                  {emoji}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
