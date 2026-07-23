import ProjectsCarousel from "@/components/projectsCarousel";
import ProjectsCard from "@/components/projectsCard";
import { projects } from "@/utils/data";

export default function ProjectsGrid(): JSX.Element {
  return (
    <ProjectsCarousel>
      {projects.map((project) => (
        <ProjectsCard key={project.name} project={project} />
      ))}
    </ProjectsCarousel>
  );
}
