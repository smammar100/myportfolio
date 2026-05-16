import Link from "next/link";
import { ContributionGraph } from "@/components/contribution-graph";
import { getContributions } from "@/lib/github";
import { profile } from "@/lib/site-data";

export async function SiteFooter() {
  const calendar = await getContributions(profile.githubUsername);

  return (
    <footer className="py-12">
      <div className="mx-auto w-full max-w-3xl px-6">
        {calendar ? (
          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-sm font-medium text-foreground">
                GitHub contributions
              </h2>
              <Link
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
              >
                {calendar.totalContributions.toLocaleString("en-US")}{" "}
                contributions in the last year
              </Link>
            </div>
            <ContributionGraph calendar={calendar} />
          </div>
        ) : null}

        <div className="flex items-center justify-center text-sm">
          <Link
            href={`mailto:${profile.email}`}
            className="text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
          >
            {profile.email}
          </Link>
        </div>
      </div>
    </footer>
  );
}
