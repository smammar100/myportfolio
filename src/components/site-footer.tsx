import Link from "next/link";
import { ContributionGraph } from "@/components/contribution-graph";
import { contributionYear, getContributions } from "@/lib/github";
import { profile } from "@/lib/site-data";

export async function SiteFooter() {
  const calendar = await getContributions(profile.githubUsername);
  const year = contributionYear();

  return (
    <footer className="py-12">
      <div className="mx-auto w-full max-w-3xl px-6">
        {calendar ? (
          <div className="mb-10">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-medium tracking-tight text-foreground">
                GitHub contributions
              </h2>
              <Link
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
              >
                {calendar.totalContributions.toLocaleString("en-US")}{" "}
                contributions in {year}
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
