import ProjectsCard from "@/components/projectsCard";
import { projects } from "@/utils/data";

export default function ProjectsGrid(): JSX.Element {
  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectsCard key={project.name} project={project} />
      ))}
    </div>
  );
}
