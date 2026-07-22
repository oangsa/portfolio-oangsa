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
    slug: "codetice",
    name: "Codetice",
    subject: "Independent build · Coding platform",
    description: "A workspace-scoped coding grader with role-aware question management, immutable grading runs, searchable scoreboards, and isolated Docker execution.",
    status: "In progress",
    tools: ["TypeScript", "Next.js 16", "React 19", "Bun", "PostgreSQL 17", "Drizzle ORM", "Docker", "Tailwind CSS 4", "Monaco Editor", "Zod"],
    links: [
      { label: "View source", href: "https://github.com/oangsa/codetice" },
    ],
    caseStudy: {
      role: "Owner and primary contributor",
      sourceUpdated: "14 July 2026",
      lastModified: "2026-07-22",
      problem: "Coding exercises need more than an editor and a submit button. Educators need scoped question ownership, role-aware administration, reproducible grading, and scoreboards that do not leak data across workspaces.",
      outcome: "Codetice turns those concerns into one workspace-scoped flow: staff publish and manage questions, students write and submit code, a background worker grades each run in Docker, and the application persists auditable results and rankings.",
      architecture: [
        {
          label: "Feature-owned UI",
          detail: "Thin App Router files delegate workspace data loading and rendering to domain modules.",
        },
        {
          label: "HTTP boundaries",
          detail: "Route handlers authenticate and validate requests before calling workspace server modules.",
        },
        {
          label: "Leased Docker grading",
          detail: "A separate worker leases PostgreSQL jobs, runs hardened Docker containers, and persists results transactionally.",
        },
      ],
    },
  },
  {
    slug: "maintenance-tracking-system",
    name: "Maintenance Tracking System",
    subject: "CPE241 · Database Systems",
    description: "A full-stack maintenance platform for employees to submit repair requests and managers to review, assign, and track work through role-specific workflows.",
    status: "Completed",
    tools: ["TypeScript", "React 19", "React Router 7", "Bun", "ElysiaJS", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "shadcn/ui", "Zod", "JWT", "OpenAPI"],
    links: [
      { label: "Web source", href: "https://github.com/oangsa/maintenance-tracking-system" },
      { label: "API source", href: "https://github.com/oangsa/maintenance-tracking-system-api" },
    ],
    caseStudy: {
      role: "Team course project · 4 contributors",
      sourceUpdated: "9 June 2026",
      lastModified: "2026-07-22",
      problem: "Maintenance work crosses employees, managers, parts, products, departments, work orders, and status histories. The system needed to keep those records connected while giving each role a focused workflow instead of exposing one undifferentiated CRUD interface.",
      outcome: "The project delivers an end-to-end repair workflow across separate web and API repositories: employees create and follow requests, managers review and assign work, master-data screens maintain operational records, and dashboards summarize repair activity for decision-making.",
      architecture: [
        {
          label: "React feature client",
          detail: "React Router pages compose feature modules that reach the API through typed services and resource clients.",
        },
        {
          label: "Layered Elysia API",
          detail: "Validated controllers delegate maintenance workflows to application services backed by repository contracts.",
        },
        {
          label: "Drizzle persistence",
          detail: "Concrete repositories use a shared Drizzle connection to persist PostgreSQL data.",
        },
      ],
      contributors: [
        "Suthang Sukrueangkun",
        "Phirada Lekpaeng",
        "Phenwatsa",
        "Chompuwell",
      ],
    },
  },
  {
    slug: "inventory-management-system",
    name: "Web-Based Inventory Management System",
    subject: "CPE101 · Engineering Exploration",
    description: "A full-stack inventory application for managing product records, monitoring low stock, and sending daily notifications when quantities fall below configured thresholds.",
    status: "Completed",
    tools: ["TypeScript", "Next.js", "Prisma ORM", "MongoDB"],
    links: [
      { label: "View source", href: "https://github.com/oangsa/project-inventory-management" },
    ],
    caseStudy: {
      role: "Full-stack course project",
      sourceUpdated: "31 January 2025",
      lastModified: "2026-07-22",
      problem: "A multi-branch inventory tool has to keep product quantities, sales, refills, users, companies, and branch-level notification settings connected. Staff also need early visibility when stock falls below each branch’s configured threshold.",
      outcome: "The application combines product and organization management with role-aware administration, stock history, reporting cards, CSV export, and a scheduled notification route that checks every branch and posts low-stock summaries to configured Discord webhooks.",
      architecture: [
        {
          label: "Role-gated Next.js",
          detail: "Middleware protects App Router pages and directs administrators to their inventory screens.",
        },
        {
          label: "Company and branch scope",
          detail: "Prisma's MongoDB models attach every product and user to a company and branch.",
        },
        {
          label: "Daily stock alerts",
          detail: "Vercel runs a daily route that finds low stock and posts branch-specific Discord reports.",
        },
      ],
    },
  },
  {
    slug: "hospital-system",
    name: "Hospital Management System",
    subject: "CPE112 · Data Structures",
    description: "A C++ terminal application that applies custom data structures to role-based patient intake, emergency prioritization, medical history, and administrative recovery workflows.",
    status: "Completed",
    tools: ["C++17", "GCC", "Custom data structures", "CSV persistence"],
    links: [
      { label: "View source", href: "https://github.com/oangsa/Hospital-System" },
    ],
    caseStudy: {
      role: "Team course project · 3 contributors",
      sourceUpdated: "8 May 2025",
      lastModified: "2026-07-22",
      problem: "A hospital workflow needs different access paths for administrators, doctors, nurses, and patients, while routine queues, emergency priority, medical history, and reversible administration each demand different data behavior.",
      outcome: "The team built a C++ terminal system that connects those workflows to purpose-built structures: standard and ESI-priority queues for patient flow, trees for history, maps and sets for identity, and a stack-backed undo path for administrative changes.",
      architecture: [
        {
          label: "Role-based terminal",
          detail: "Authenticated patients, nurses, doctors, and admins enter dedicated terminal workflows.",
        },
        {
          label: "Triage pipeline",
          detail: "Patients move from FIFO intake through nurse-assigned ESI triage into a doctor-facing priority queue.",
        },
        {
          label: "CSV-backed state",
          detail: "Local CSV files preserve users, queue state, and timestamped medical histories.",
        },
      ],
      contributors: [
        "Suthang Sukrueangkun",
        "Sorawit Chaithong",
        "Wathit Tritsananawakit",
      ],
    },
  },
  {
    slug: "treasure-hunt-robot",
    name: "Treasure Hunt Robot",
    subject: "CPE101",
    image: robotImage,
    description: "A micro:bit-powered exploration robot with an onboard camera for navigating hard-to-reach spaces.",
    status: "Completed",
    tools: ["micro:bit", "Embedded systems", "Mobile robotics", "Onboard camera"],
    caseStudy: {
      role: "Team course project",
      schemaType: "CreativeWork",
      sourceLabel: "Portfolio artifact",
      sourceUpdated: "21 October 2024",
      lastModified: "2026-07-22",
      imageCaption: "The team assembling the micro:bit-controlled robot and its camera-equipped mobile chassis.",
      problem: "Some spaces are difficult or unsafe to inspect directly. The project explored how a compact mobile robot could carry a camera into those areas and return visual information while remaining simple enough for a student team to assemble and iterate on.",
      outcome: "The team produced a working physical prototype that combines a micro:bit controller, wheeled chassis, onboard camera, and compact component layout in one exploration platform documented during final assembly.",
    },
  },
  {
    slug: "brainrot-interpreter",
    name: "Brainrot-Interpreter",
    subject: "Independent build · Language tooling",
    image: interpreterImage,
    description: "A TypeScript interpreter built to explore language design, abstract syntax trees, parsing, and lexing.",
    status: "In progress",
    links: [
      { label: "Repository", href: "https://github.com/oangsa/brainrot-interpreter/tree/master" },
    ],
    tools: ["TypeScript", "Bun", "Lexer", "Parser", "AST", "REPL"],
    caseStudy: {
      role: "Independent language experiment",
      sourceLabel: "Portfolio capture",
      sourceUpdated: "21 October 2024",
      lastModified: "2026-07-22",
      imageCaption: "Version 0.1 of the terminal REPL evaluating arithmetic and reporting a parser-stage error.",
      problem: "Interpreters can feel abstract when studied only as theory. This experiment turns the compiler pipeline into something observable by accepting expressions in a terminal, producing typed values, and exposing where invalid syntax fails.",
      outcome: "The captured version 0.1 REPL evaluates arithmetic input and returns a typed number result, while invalid comparison syntax produces a named parsing error with the unexpected token instead of failing silently.",
      architecture: [
        {
          label: "Bun entrypoints",
          detail: "File and REPL inputs share the same parser, global environment, and evaluator.",
        },
        {
          label: "Lexer and AST parser",
          detail: "The lexer emits typed tokens, then the parser builds a statement-based AST.",
        },
        {
          label: "Scoped evaluator",
          detail: "AST nodes dispatch to expression and statement evaluators backed by nested environments.",
        },
      ],
    },
  },
  {
    slug: "sandwich-bot",
    name: "Sandwich Bot",
    subject: "Independent build · Discord bot",
    image: sandwichImage,
    description: "A TypeScript Discord bot with music playback, voice tooling, event scheduling, and service-backed Google Calendar synchronization.",
    status: "In progress",
    links: [
      { label: "View source", href: "https://github.com/oangsa/DiscordTS" },
    ],
    tools: ["TypeScript", "Bun", "Discord.js 14", "Kazagumo", "Shoukaku", "Lavalink", "Spotify", "REST APIs"],
    caseStudy: {
      role: "Independent community bot",
      sourceUpdated: "26 February 2026",
      lastModified: "2026-07-22",
      imageCaption: "Sandwich accepting Discord slash commands and adding requested tracks to a shared music queue.",
      problem: "Community tasks such as shared music, voice utilities, event scheduling, and calendar coordination are fragmented across separate tools. A Discord bot can keep those actions in the channel where the group already communicates.",
      outcome: "Sandwich provides typed slash-command modules for music playback and settings, voice recording, event creation and discovery, Google account linking, and calendar synchronization, supported by dynamically loaded events and service clients.",
      architecture: [
        {
          label: "Module loader",
          detail: "Glob-loaded modules register Discord events and dispatch slash commands from shared maps.",
        },
        {
          label: "Music runtime",
          detail: "Kazagumo wraps Shoukaku-backed Lavalink players for search, queues, and voice playback.",
        },
        {
          label: "API services",
          detail: "User, event, Google, and calendar services share one typed HTTP client.",
        },
      ],
    },
  },
  {
    slug: "to-be-number-one-website",
    name: "TO BE NUMBER ONE WEBSITE",
    subject: "School club project",
    image: toBeImage,
    description: "A TypeScript and Next.js website created for the TO BE NUMBER ONE club at my former school.",
    status: "Completed",
    tools: ["TypeScript", "Next.js", "Responsive admin UI"],
    caseStudy: {
      role: "Independent school-club project",
      sourceLabel: "Portfolio capture",
      sourceUpdated: "18 April 2024",
      lastModified: "2026-07-22",
      imageCaption: "Version 4.0.0 of the Thai-language administration interface, showing the student directory and product changelog.",
      problem: "The school’s TO BE NUMBER ONE club needed one interface for recurring administration work rather than scattered records. The visible workflow centers on announcements, student membership, activity applicants, and the settings needed to maintain those records.",
      outcome: "The completed Next.js interface gives administrators a structured Thai-language workspace with a student directory, applicant management, configuration, announcements, edit and delete actions, and a product changelog documenting delivered improvements.",
    },
  },
]

export type CaseStudyProject = projectsInterface & Required<Pick<projectsInterface, "slug" | "caseStudy">>;

export const caseStudyProjects = projects.filter(
  (project): project is CaseStudyProject => Boolean(project.slug && project.caseStudy),
);

export function getProjectBySlug(slug: string): CaseStudyProject | undefined {
  return caseStudyProjects.find((project) => project.slug === slug);
}

export const about: aboutInterface = {
  title: "Profile",
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
  title: "Activities",
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
