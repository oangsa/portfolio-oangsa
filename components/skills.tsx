import type { IconType } from "react-icons";
import {
  SiDocker,
  SiDotnet,
  SiGit,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const skills: Array<{ name: string; icon: IconType }> = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "C#", icon: SiSharp },
  { name: "Python", icon: SiPython },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: ".NET", icon: SiDotnet },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "SQL Server", icon: SiMicrosoftsqlserver },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
  { name: "Tailwind CSS", icon: SiTailwindcss },
];

export default function Skills(): JSX.Element {
  return (
    <ul className="skills-grid" aria-label="Core technologies">
      {skills.map(({ name, icon: Icon }) => (
        <li key={name}>
          <Icon aria-hidden="true" />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}
