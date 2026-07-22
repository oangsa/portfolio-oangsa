import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { projectsInterface } from "@/interfaces/interfaces";

interface ProjectsCardProps {
  project: projectsInterface;
}

export default function ProjectsCard({ project }: ProjectsCardProps): JSX.Element {
  const statusClass = project.status === "In progress"
    ? "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200"
    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[16/9] overflow-hidden bg-black/5 dark:bg-white/5">
        <Image
          src={project.image}
          alt={`${project.name} project preview`}
          fill
          sizes="(min-width: 960px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-black/60 dark:text-white/60">{project.subject}</p>
            <h3 className="text-xl font-bold">{project.name}</h3>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
            {project.status}
          </span>
        </div>
        <p className="text-sm leading-6 text-black/70 dark:text-white/70">{project.description}</p>
        <div className="mt-auto pt-2">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-dark_accent transition-colors hover:text-dark_accent/70 dark:text-accent dark:hover:text-accent/70"
            >
              View source <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
          ) : (
            <span className="text-sm text-black/50 dark:text-white/50">Course project</span>
          )}
        </div>
      </div>
    </article>
  );
}
