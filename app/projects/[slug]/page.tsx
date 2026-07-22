import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import JsonLd from "@/components/jsonLd";
import { caseStudyProjects, getProjectBySlug } from "@/utils/data";
import { projectJsonLd, projectMetadata } from "@/utils/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return projectMetadata(project);
}

export default async function ProjectPage({ params }: ProjectPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusClass = project.status === "In progress"
    ? "project-status is-progress"
    : "project-status is-complete";
  const repositoryUrl = project.links?.[0]?.href;

  return (
    <main className="site-main project-page shell">
      <JsonLd data={projectJsonLd(project)} />

      <article className="project-case-study">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link href="/#projects-heading">
            <FaArrowLeft aria-hidden="true" />
            Selected projects
          </Link>
          <span aria-hidden="true">/</span>
          <span>{project.name}</span>
        </nav>

        <header className="project-case-header">
          <div className="project-case-title">
            <p className="project-subject">{project.subject}</p>
            <h1>{project.name}</h1>
            <p className="project-case-lede">{project.description}</p>
            <div className="project-case-links" aria-label={`${project.name} links`}>
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  className="text-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} <FaArrowUpRightFromSquare aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <dl className="project-case-facts">
            <div>
              <dt>Status</dt>
              <dd><span className={statusClass}>{project.status}</span></dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{project.caseStudy.role}</dd>
            </div>
            <div>
              <dt>{project.caseStudy.sourceLabel ?? "Source reviewed"}</dt>
              <dd>{project.caseStudy.sourceUpdated}</dd>
            </div>
          </dl>
        </header>

        {project.image ? (
          <figure className={`project-case-media project-case-media-${project.slug}`}>
            <div className="project-case-media-frame">
              <Image
                src={project.image}
                alt={`${project.name} project documentation`}
                fill
                quality={80}
                placeholder="blur"
                sizes="(min-width: 72rem) 65rem, calc(100vw - 2rem)"
              />
            </div>
            {project.caseStudy.imageCaption ? (
              <figcaption>{project.caseStudy.imageCaption}</figcaption>
            ) : null}
          </figure>
        ) : null}

        <div className="project-document">
          <section className="project-prose-section" aria-labelledby="project-problem-heading">
            <h2 id="project-problem-heading">What it solves</h2>
            <p>{project.caseStudy.problem}</p>
            <p>{project.caseStudy.outcome}</p>
          </section>

          {project.links?.length && project.caseStudy.architecture?.length ? (
            <section className="project-prose-section" aria-labelledby="project-architecture-heading">
              <h2 id="project-architecture-heading">Architecture</h2>
              <dl className="project-detail-list">
                {project.caseStudy.architecture.map((part) => (
                  <div key={part.label}>
                    <dt>{part.label}</dt>
                    <dd>{part.detail}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <section className="project-prose-section" aria-labelledby="project-stack-heading">
            <h2 id="project-stack-heading">Technology</h2>
            <ul className="project-stack" aria-label={`${project.name} technology stack`}>
              {project.tools?.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </section>

          {project.caseStudy.contributors?.length ? (
            <section className="project-prose-section" aria-labelledby="project-team-heading">
              <h2 id="project-team-heading">Team</h2>
              <p>{project.caseStudy.contributors.join(", ")}.</p>
            </section>
          ) : null}

          {repositoryUrl && !project.caseStudy.sourceLabel ? (
            <p className="project-document-close">
              The repository remains the source of truth for implementation details. {" "}
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                Inspect the source <FaArrowUpRightFromSquare aria-hidden="true" />
              </a>
            </p>
          ) : null}
        </div>
      </article>
    </main>
  );
}
