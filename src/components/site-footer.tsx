import Link from "next/link";
import { profile } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="py-12">
      <div className="mx-auto flex max-w-3xl items-center justify-center px-6 text-sm">
        <Link
          href={`mailto:${profile.email}`}
          className="text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
        >
          {profile.email}
        </Link>
      </div>
    </footer>
  );
}
