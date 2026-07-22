import ProjectsCard from "@/components/projectsCard";
import { projects } from "@/utils/data";

export default function ProjectsGrid(): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectsCard key={project.name} project={project} />
      ))}
    </div>
  );
}
