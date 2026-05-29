import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { experience, skills } from "@/lib/site-data";

export function ExperienceSection() {
  return (
    <section className="py-12">
      <SectionHeading title="Experience" />
      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-12">
        <ul className="space-y-8">
          {experience.map((job) => (
            <li key={job.company} className="space-y-1">
              <Link
                href={job.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                {job.company}
              </Link>
              <p className="text-sm text-muted-foreground">{job.role}</p>
              <p className="text-sm text-muted-foreground tabular-nums">
                {job.start} - {job.end}
              </p>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="mb-4 text-xl font-medium leading-[1.1] tracking-tight text-foreground">
            Skills
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
