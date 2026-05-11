import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "@/components/icons";
import { profile } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section className="pt-16 pb-12">
      <div className="flex flex-col items-start gap-6">
        <div className="relative size-16 overflow-hidden rounded-full border border-border">
          <Image
            src={profile.avatar}
            alt={`${profile.name}'s avatar`}
            fill
            sizes="64px"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl tracking-tight text-foreground sm:text-4xl">
            {profile.greeting}
          </h1>
          <p className="max-w-prose text-base text-muted-foreground">
            {profile.tagline}
          </p>
        </div>
        <Link
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <MailIcon className="size-4" />
          {profile.email}
        </Link>
      </div>
    </section>
  );
}
