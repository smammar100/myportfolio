import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { NavToolbar } from "@/components/nav-toolbar";
import { SiteFooter } from "@/components/site-footer";
import { ProjectToc } from "@/components/project-toc";
import { getProjectDetail, projectDetails } from "@/lib/project-data";

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

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) notFound();

  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "goals", title: "Goals" },
    ...project.sections.map((s) => ({ id: s.id, title: s.title })),
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

        <article className="pt-12 pb-20">
          <header className="mb-12 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-surface-2 shadow-surface-1 px-2.5 py-1 text-muted-foreground">
                {project.version}
              </span>
              <span className="rounded-full bg-surface-2 shadow-surface-1 px-2.5 py-1 text-muted-foreground">
                {project.platform}
              </span>
              {project.roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-surface-2 shadow-surface-1 px-2.5 py-1 text-muted-foreground"
                >
                  {r}
                </span>
              ))}
            </div>
            <h1 className="text-4xl tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>
            {project.demoUrl ? (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View live demo
                <ArrowUpRightIcon className="size-4" />
              </Link>
            ) : null}
          </header>

          <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-2xl bg-muted">
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

          <ProjectToc items={tocItems} />
          <div className="space-y-20">
              <section id="overview" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-medium tracking-tight text-foreground">
                  Overview
                </h2>
                <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
                  {project.overviewSummary}
                </p>
                <dl className="grid grid-cols-1 gap-y-3 rounded-xl bg-surface-2 shadow-surface-2 p-5 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-muted-foreground">Team</dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {project.team}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Platform</dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {project.platform}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Roles</dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {project.roles.join(", ")}
                    </dd>
                  </div>
                </dl>
                <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
                  {project.overviewDetail}
                </p>
              </section>

              <section id="goals" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-medium tracking-tight text-foreground">
                  Goals
                </h2>
                <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {project.goals.map((goal, i) => (
                    <li
                      key={goal.title}
                      className="rounded-xl bg-surface-2 shadow-surface-2 p-5"
                    >
                      <span className="text-xs font-medium tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 text-base font-medium text-foreground">
                        {goal.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {goal.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {project.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 space-y-8"
                >
                  <h2 className="text-2xl font-medium tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  <ul className="space-y-10">
                    {section.items.map((item) => (
                      <li key={item.title} className="space-y-3">
                        <h3 className="text-lg font-medium text-foreground">
                          {item.title}
                        </h3>
                        <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                        <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 text-xs text-muted-foreground">
                          Loading video…
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <section
                id="conclusion"
                className="scroll-mt-24 space-y-6 border-t border-border pt-12"
              >
                <h2 className="text-2xl font-medium tracking-tight text-foreground">
                  Conclusion
                </h2>
                <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
                  {project.conclusion}
                </p>
                {project.demoUrl ? (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-surface-2 shadow-surface-2 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Try the demo
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                ) : null}
              </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
