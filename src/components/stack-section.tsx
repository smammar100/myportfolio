import { SectionHeading } from "@/components/section-heading";
import {
  GraphqlIcon,
  NextJsIcon,
  NodeIcon,
  PostgresIcon,
  PrismaIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/components/icons";

const stack = [
  { name: "TypeScript", Icon: TypescriptIcon },
  { name: "Next.js", Icon: NextJsIcon },
  { name: "Prisma", Icon: PrismaIcon },
  { name: "Node.js", Icon: NodeIcon },
  { name: "PostgreSQL", Icon: PostgresIcon },
  { name: "React", Icon: ReactIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "GraphQL", Icon: GraphqlIcon },
];

export function StackSection() {
  return (
    <section className="py-12">
      <SectionHeading title="My stack" />
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {stack.map(({ name, Icon }) => (
          <li
            key={name}
            className="group relative flex aspect-square items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className="size-6" aria-label={name} />
            <span
              role="tooltip"
              className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              {name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
