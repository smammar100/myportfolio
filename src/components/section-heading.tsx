import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

interface SectionHeadingProps {
  title: string;
  link?: { label: string; href: string };
}

export function SectionHeading({ title, link }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-medium leading-[1.1] tracking-tight text-foreground">
        {title}
      </h2>
      {link ? (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {link.label}
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
