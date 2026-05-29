import Image from "next/image";
import type { Metadata } from "next";
import { HeadphoneIcon, MouseIcon } from "@/components/icons";
import { NavToolbar } from "@/components/nav-toolbar";
import { TunesGrid } from "@/components/tunes-grid";
import { aboutHero, manifesto, tools, tunes } from "@/lib/about-data";

export const metadata: Metadata = {
  title: "About — John",
  description: aboutHero.paragraphs[0],
};

const colorClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  amber:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  emerald:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
};

export default function AboutPage() {
  return (
    <>
      <NavToolbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-24 pt-24">
        <section className="grid grid-cols-1 gap-10 sm:grid-cols-[260px_1fr]">
          <div
            className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
            style={{ width: "100%", maxWidth: 280 }}
          >
            <Image
              src={aboutHero.photo}
              alt="John walking"
              fill
              sizes="280px"
              priority
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="space-y-5 pt-1">
            <h1 className="text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              {aboutHero.greeting}{" "}
              <span className="font-mono text-base font-normal text-muted-foreground">
                {aboutHero.phonetic}
              </span>
            </h1>
            <div className="space-y-4 text-base leading-normal text-muted-foreground">
              {aboutHero.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="rounded-2xl bg-surface-2 shadow-surface-2 p-8 sm:p-10">
            <h2 className="text-base font-semibold leading-[1.1] text-foreground">
              {manifesto.title}
            </h2>
            <p className="mt-5 text-base leading-normal text-muted-foreground">
              {manifesto.body}
            </p>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-2">
            <MouseIcon className="size-4 text-foreground" />
            <h2 className="text-sm font-medium text-foreground">
              Tools I&apos;m lovin&apos;
            </h2>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <li
                key={tool.name}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${colorClasses[tool.color]}`}
              >
                {tool.name}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-2">
            <HeadphoneIcon className="size-4 text-foreground" />
            <h2 className="text-sm font-medium text-foreground">
              Tunes I&apos;m lovin&apos;
            </h2>
          </div>
          <TunesGrid tunes={tunes} />
        </section>
      </main>
    </>
  );
}
