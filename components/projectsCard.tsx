import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { projectsInterface } from "@/interfaces/interfaces";

interface ProjectsCardProps {
  project: projectsInterface;
}

export default function ProjectsCard({ project }: ProjectsCardProps): JSX.Element {
  const statusClass = project.status === "In progress"
    ? "project-status is-progress"
    : "project-status is-complete";

  const primaryHref = project.links?.[0]?.href;
  const projectPreview = project.image ? (
    <Image
      src={project.image}
      alt={`${project.name} project preview`}
      fill
      sizes="(min-width: 960px) 50vw, 100vw"
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
      {primaryHref ? (
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
        {project.tools ? (
          <p className="project-tools"><span>Built with</span>{project.tools.join(", ")}</p>
        ) : null}
        <div className="project-action">
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
