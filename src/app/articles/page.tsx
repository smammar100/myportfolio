import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon } from "@/components/icons";
import { NavToolbar } from "@/components/nav-toolbar";
import { SiteFooter } from "@/components/site-footer";
import { articles, profile } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Articles — John",
  description: profile.tagline,
};

export default function ArticlesPage() {
  return (
    <>
      <NavToolbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-24 pt-24">
        <header>
          <h1 className="text-3xl font-medium tracking-tight text-foreground">
            Articles &amp; notes
          </h1>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>
        </header>

        <ul className="mt-12 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={article.href}
                className="group flex items-start justify-between gap-6 p-6 transition-colors hover:bg-muted/40"
              >
                <div className="space-y-3">
                  <h2 className="text-base font-medium text-foreground">
                    {article.title}
                  </h2>
                  <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <p className="text-sm font-medium text-foreground tabular-nums">
                    {article.date}
                  </p>
                </div>
                <ArrowRightIcon className="mt-1 size-4 shrink-0 text-foreground/70 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
