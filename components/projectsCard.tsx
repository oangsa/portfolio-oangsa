import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { projectsInterface } from "@/interfaces/interfaces";

interface ProjectsCardProps {
  project: projectsInterface;
}

export default function ProjectsCard({ project }: ProjectsCardProps): JSX.Element {
  const statusClass = project.status === "In progress"
    ? "project-status is-progress"
    : "project-status is-complete";

  const caseStudyHref = project.slug && project.caseStudy
    ? `/projects/${project.slug}`
    : undefined;
  const primaryHref = project.links?.[0]?.href;
  const visibleTools = project.tools?.slice(0, 5);
  const remainingToolCount = Math.max(
    0,
    (project.tools?.length ?? 0) - (visibleTools?.length ?? 0),
  );
  const projectPreview = project.image ? (
    <Image
      src={project.image}
      alt={`${project.name} project preview`}
      fill
      quality={75}
      placeholder="blur"
      sizes="(min-width: 92rem) 45rem, (min-width: 40rem) calc(50vw - 2.5rem), calc(100vw - 2rem)"
      className="project-image"
    />
  ) : (
    <div className="project-placeholder">
      <span>Case study</span>
      <strong>{project.subject}</strong>
    </div>
  );

  return (
    <article className="project-card">
      {caseStudyHref ? (
        <Link className="project-media" href={caseStudyHref} aria-label={`Read the ${project.name} case study`}>
          {projectPreview}
        </Link>
      ) : primaryHref ? (
        <a className="project-media" href={primaryHref} target="_blank" rel="noopener noreferrer" aria-label={`View source for ${project.name}`}>
          {projectPreview}
        </a>
      ) : (
        <div className="project-media">{projectPreview}</div>
      )}
      <div className="project-body">
        <div className="project-heading">
          <div>
            <p className="project-subject">{project.subject}</p>
            <h3>{project.name}</h3>
          </div>
          <span className={statusClass}>{project.status}</span>
        </div>
        <p className="project-description">{project.description}</p>
        {visibleTools?.length ? (
          <p className="project-tools">
            <span>Built with</span>
            {visibleTools.join(", ")}{remainingToolCount ? `, +${remainingToolCount} more` : ""}
          </p>
        ) : null}
        <div className="project-action">
          {caseStudyHref ? (
            <Link href={caseStudyHref} className="text-link">
              Read case study <FaArrowRight aria-hidden="true" />
            </Link>
          ) : null}
          {project.links ? (
            project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {link.label} <FaArrowUpRightFromSquare aria-hidden="true" />
              </a>
            ))
          ) : (
            <span className="project-note">Course project</span>
          )}
        </div>
      </div>
    </article>
  );
}
