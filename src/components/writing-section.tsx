import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { articles } from "@/lib/site-data";

export function WritingSection() {
  return (
    <section className="py-12">
      <SectionHeading
        title="Latest writing"
        link={{ label: "Read all", href: "/articles" }}
      />
      <ul className="divide-y divide-border overflow-hidden rounded-xl bg-surface-2 shadow-surface-2">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={article.href}
              className="group flex items-start justify-between gap-6 p-6 transition-colors hover:bg-muted/40"
            >
              <div className="space-y-3">
                <h3 className="text-base font-medium leading-[1.1] text-foreground">
                  {article.title}
                </h3>
                <p className="max-w-prose text-sm leading-normal text-muted-foreground">
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
    </section>
  );
}
