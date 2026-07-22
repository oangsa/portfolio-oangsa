import {
  aboutInterface,
  projectsInterface,
  resumeSectionInterface,
} from "@/interfaces/interfaces"
import interpreterImage from "@/assets/Interpreter.png";
import robotImage from "@/assets/Robot.jpg";
import sandwichImage from "@/assets/SandWich.png";
import toBeImage from "@/assets/TOBE.png";

export const projects: projectsInterface[] = [
  {
    name: "Maintenance Tracking System",
    subject: "CPE241 · Database Systems",
    description: "A full-stack maintenance platform for employees to submit repair requests and managers to review, assign, and track work through role-specific workflows.",
    status: "Completed",
    tools: ["TypeScript", "React 19", "React Router 7", "Bun", "ElysiaJS", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "shadcn/ui", "Zod", "JWT", "OpenAPI"],
    links: [
      { label: "Web source", href: "https://github.com/oangsa/maintenance-tracking-system" },
      { label: "API source", href: "https://github.com/oangsa/maintenance-tracking-system-api" },
    ],
  },
  {
    name: "Web-Based Inventory Management System",
    subject: "CPE101 · Engineering Exploration",
    description: "A full-stack inventory application for managing product records, monitoring low stock, and sending daily notifications when quantities fall below configured thresholds.",
    status: "Completed",
    tools: ["TypeScript", "Next.js", "Prisma ORM", "MongoDB"],
    links: [
      { label: "View source", href: "https://github.com/oangsa/project-inventory-management" },
    ],
  },
  {
    name: "Treasure Hunt Robot",
    subject: "CPE101",
    image: robotImage,
    description: "A micro:bit-powered exploration robot with an onboard camera for navigating hard-to-reach spaces.",
    status: "Completed"
  },
  {
    name: "Brainrot-Interpreter",
    subject: "NONE",
    image: interpreterImage,
    description: "A TypeScript interpreter built to explore language design, abstract syntax trees, parsing, and lexing.",
    status: "In progress",
    links: [
      { label: "View source", href: "https://github.com/oangsa/brainrot-interpreter" },
    ],
  },
  {
    name: "Sandwich Bot",
    subject: "NONE",
    image: sandwichImage,
    description: "A TypeScript Discord bot with music playback and extensible community features.",
    status: "In progress",
    links: [
      { label: "View source", href: "https://github.com/oangsa/DiscordTS" },
    ],
  },
  {
    name: "TO BE NUMBER ONE WEBSITE",
    subject: "NONE",
    image: toBeImage,
    description: "A TypeScript and Next.js website created for the TO BE NUMBER ONE club at my former school.",
    status: "Completed"
  },
]

export const about: aboutInterface = {
  title: 'About me',
  description: "I am a computer engineering student and full-stack developer with experience modernizing enterprise software, building data-backed web applications, and teaching programming.",
  infos: [
    {
      fieldName: "Name",
      fieldValue: "Suthang Sukrueangkun"
    },
    {
      fieldName: "Phone",
      fieldValue: "(+66) 834329134"
    },
    {
      fieldName: "Nationality",
      fieldValue: "Thai"
    },
    {
      fieldName: "Languages",
      fieldValue: "Thai, English"
    },
    {
      fieldName: "Email",
      fieldValue: "sukruangkul.aongsa@gmail.com"
    }
  ]
}

export const experiences: resumeSectionInterface = {
  title: "Experience",
  description: "Full-stack internships focused on enterprise systems, maintainable application logic, and reliable delivery across the stack.",
  entries: [
    {
      title: "Full-Stack Developer Intern",
      organization: "Genesys Infocad Co., Ltd.",
      duration: "June 2026 — July 2026",
      highlights: [
        "Modernized legacy ERP modules into maintainable web applications using C#, .NET, Razor Pages, Entity Framework Core, and SQL Server.",
        "Recreated legacy workflows, form behavior, validation, and business rules as reliable end-to-end web features.",
        "Verified database interactions, migrations, and UI flows while resolving integration and Docker runtime issues to maintain operational parity.",
      ],
    },
    {
      title: "Full-Stack Developer Intern",
      organization: "Axons",
      duration: "June 2025 — July 2025",
      highlights: [
        "Developed enterprise application features using React, React Router, Redux, Ant Design, C#, .NET, and Entity Framework.",
        "Delivered CRUD and master-data workflows across frontend, backend, and database layers from functional requirements.",
        "Collaborated with developers and stakeholders to refine requirements, review implementations, and resolve product defects.",
      ],
    },
  ],
}

export const educations: resumeSectionInterface = {
  title: "Education",
  description: "Current academic work in computer engineering, supported by hands-on software and systems projects.",
  entries: [
    {
      title: "B.Eng. Computer Engineering (International Program)",
      organization: "King Mongkut's University of Technology Thonburi",
      duration: "August 2024 — Present",
      highlights: ["GPA: 3.30/4.0"],
    },
  ],
}

export const activities: resumeSectionInterface = {
  title: "Teaching & activities",
  description: "Academic-team work centered on teaching programming, preparing curricula, and supporting hands-on learning.",
  entries: [
    {
      title: "Head of Python Curriculum, Academic Team",
      organization: "Pre-Freshy 2026",
      duration: "6—10 July 2026",
      highlights: [
        "Led the Python curriculum, coordinated instructors, and taught programming fundamentals through hands-on exercises.",
      ],
    },
    {
      title: "Academic Team Member, Python",
      organization: "ModCom 2025",
      duration: "21—27 July 2025",
      highlights: [
        "Taught introductory Python and guided participants through hands-on exercises.",
      ],
    },
    {
      title: "Academic Team Member, Web Development",
      organization: "ComCamp 36",
      duration: "7—11 April 2025",
      highlights: [
        "Created web-development materials and taught foundational concepts to camp participants.",
      ],
    },
  ],
}
