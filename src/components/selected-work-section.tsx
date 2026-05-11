import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/site-data";

export function SelectedWorkSection() {
  return (
    <section className="py-12">
      <SectionHeading
        title="Selected work"
        link={{ label: "View all", href: "/projects" }}
      />
      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={project.href} className="group block">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(min-width: 640px) 360px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5 space-y-2">
                <h3 className="text-base font-medium text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
