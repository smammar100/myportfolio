import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { NavToolbar } from "@/components/nav-toolbar";
import { SiteFooter } from "@/components/site-footer";
import { ProjectToc } from "@/components/project-toc";
import { Elevated } from "@/lib/elevated";
import { getProjectDetail, projectDetails } from "@/lib/project-data";
import { projects } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import type { ProjectDetail } from "@/types/portfolio";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) return {};
  return {
    title: `${project.title} — John`,
    description: project.tagline,
  };
}

/** Editorial section heading with a quiet trailing period. */
function SectionTitle({ id, children }: { id?: string; children: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-2xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-3xl"
    >
      {children}
      <span className="text-muted-foreground">.</span>
    </h2>
  );
}

/** A meta column: small label over a stacked list of values. */
function MetaList({
  label,
  items,
}: {
  label: string;
  items: React.ReactNode[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-base text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MediaTile({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("rounded-2xl bg-muted ring-1 ring-border/60", className)}
    />
  );
}

function NextProject({ slug }: { slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const next = projects[(idx + 1) % projects.length];

  return (
    <Link
      href={next.href}
      className="group mt-28 block border-t border-border pt-12"
      aria-label={`Next project: ${next.title}`}
    >
      <Elevated
        offset={1}
        className="overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <div className="grid sm:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Next project
            </span>
            <div className="space-y-2">
              <h2 className="text-xl font-medium leading-[1.1] tracking-tight text-foreground">
                {next.title}
              </h2>
              <p className="text-sm leading-normal text-muted-foreground">
                {next.description}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              View project
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <div className="relative aspect-video bg-muted sm:aspect-auto sm:min-h-[12rem]">
            <Image
              src={next.cover}
              alt={next.title}
              fill
              sizes="(min-width: 640px) 480px, 100vw"
              unoptimized
              className="object-contain p-6"
            />
          </div>
        </div>
      </Elevated>
    </Link>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project: ProjectDetail | undefined = getProjectDetail(slug);
  if (!project) notFound();

  const hasMetrics = (project.metrics?.length ?? 0) > 0;
  const hasGallery = (project.gallery?.length ?? 0) > 0;

  const tocItems = [
    { id: "overview", title: "Overview" },
    ...(hasMetrics ? [{ id: "metrics", title: "Impact" }] : []),
    { id: "goals", title: "Goals" },
    ...project.sections.map((s) => ({ id: s.id, title: s.title })),
    ...(hasGallery ? [{ id: "gallery", title: "Gallery" }] : []),
    { id: "conclusion", title: "Conclusion" },
  ];

  return (
    <>
      <NavToolbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-32 pt-20">
        <div className="pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRightIcon className="size-3.5 rotate-180" />
            Back
          </Link>
        </div>

        <article className="pt-14 pb-20">
          {/* Cover — the feature image opens the case study */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              priority
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Hero — tagline carries the page, like an editorial opener */}
          <header className="mt-14 space-y-8">
            <h1 className="max-w-3xl text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {project.tagline}
            </h1>
          </header>

          {/* Meta — hairline-divided editorial groups */}
          <div className="mt-14">
            <div className="grid gap-8 border-t border-border py-8 sm:grid-cols-3">
              <MetaList
                label="Services"
                items={project.services ?? project.roles}
              />
              <MetaList
                label="Deliverables"
                items={
                  project.deliverables ?? [project.platform]
                }
              />
              <MetaList
                label="Links"
                items={
                  project.demoUrl
                    ? [
                        <Link
                          key="demo"
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 transition-colors hover:text-muted-foreground"
                        >
                          Live site
                          <ArrowUpRightIcon className="size-3.5" />
                        </Link>,
                      ]
                    : []
                }
              />
            </div>

            <div className="grid gap-8 border-t border-border py-8 sm:grid-cols-3">
              {project.client ? (
                <MetaList label="Client" items={[project.client]} />
              ) : null}
              <MetaList label="Team" items={[project.team]} />
              <MetaList label="Roles" items={[project.roles.join(", ")]} />
            </div>

            {hasMetrics ? (
              <div className="grid grid-cols-2 gap-8 border-t border-border py-8 sm:grid-cols-4">
                {project.metrics!.map((m) => (
                  <div key={m.label} className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {m.label}
                    </p>
                    <p className="text-3xl font-medium tabular-nums tracking-tight text-foreground sm:text-4xl">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="border-t border-border" />
          </div>

          <ProjectToc items={tocItems} />

          <div className="mt-20 space-y-24 sm:space-y-32">
            {/* Overview */}
            <section className="space-y-6">
              <SectionTitle id="overview">Overview</SectionTitle>
              <p className="max-w-prose text-xl leading-[1.4] text-foreground">
                {project.overviewSummary}
              </p>
              <p className="max-w-prose text-lg leading-normal text-muted-foreground">
                {project.overviewDetail}
              </p>
            </section>

            {/* Impact */}
            {hasMetrics ? (
              <section className="space-y-8" id="metrics">
                <SectionTitle>Impact</SectionTitle>
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                  {project.metrics!.map((m) => (
                    <div key={m.label} className="space-y-2">
                      <p className="text-4xl font-medium tabular-nums tracking-tight text-foreground sm:text-5xl">
                        {m.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Goals */}
            <section className="space-y-8">
              <SectionTitle id="goals">Goals</SectionTitle>
              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {project.goals.map((goal, i) => (
                  <li
                    key={goal.title}
                    className="rounded-xl bg-surface-2 shadow-surface-2 p-5"
                  >
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-base font-medium leading-[1.1] text-foreground">
                      {goal.title}
                    </h3>
                    <p className="mt-2 text-sm leading-normal text-muted-foreground">
                      {goal.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Narrative — stacked text + full-width media */}
            {project.sections.map((section) => (
              <section
                key={section.id}
                className="space-y-14 sm:space-y-20"
              >
                <SectionTitle id={section.id}>{section.title}</SectionTitle>
                {section.items.map((item) => (
                  <div key={item.title} className="space-y-6">
                    <h3 className="text-lg font-medium leading-[1.1] text-foreground sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="max-w-prose text-lg leading-normal text-muted-foreground">
                      {item.body}
                    </p>
                    <MediaTile className="aspect-video w-full" />
                  </div>
                ))}
              </section>
            ))}

            {/* Gallery */}
            {hasGallery ? (
              <section className="space-y-8" id="gallery">
                <SectionTitle>Gallery</SectionTitle>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.gallery!.map((src, i) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted"
                    >
                      <Image
                        src={src}
                        alt={`${project.title} — image ${i + 1}`}
                        fill
                        sizes="(min-width: 640px) 320px, 50vw"
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Pull quote */}
            {project.pullQuote ? (
              <figure className="space-y-6">
                <blockquote className="max-w-3xl text-2xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-3xl">
                  “{project.pullQuote.quote}”
                </blockquote>
                {project.pullQuote.attribution ? (
                  <figcaption className="text-sm text-muted-foreground">
                    — {project.pullQuote.attribution}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            {/* Conclusion */}
            <section className="space-y-6 border-t border-border pt-14">
              <SectionTitle id="conclusion">Conclusion</SectionTitle>
              <p className="max-w-prose text-lg leading-normal text-muted-foreground">
                {project.conclusion}
              </p>
              {project.demoUrl ? (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Visit the live site
                  <ArrowUpRightIcon className="size-4" />
                </Link>
              ) : null}
            </section>
          </div>

          <NextProject slug={project.slug} />
        </article>
      </main>
      <SiteFooter showContributions={false} />
    </>
  );
}
