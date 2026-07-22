import { aboutInterface, educationInterface, projectsInterface } from "@/interfaces/interfaces"
import interpreterImage from "@/assets/Interpreter.png";
import robotImage from "@/assets/Robot.jpg";
import sandwichImage from "@/assets/SandWich.png";
import toBeImage from "@/assets/TOBE.png";

export const projects: projectsInterface[] = [
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
    href: "https://github.com/oangsa/brainrot-interpreter"
  },
  {
    name: "Sandwich Bot",
    subject: "NONE",
    image: sandwichImage,
    description: "A TypeScript Discord bot with music playback and extensible community features.",
    status: "In progress",
    href: "https://github.com/oangsa/DiscordTS"
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
  description: "I am a computer engineering student interested in software systems, web development, and embedded computing.",
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

export const educations: educationInterface = {
  title: "My education",
  description: "My academic background from primary school through computer engineering.",
  infos: [
    {
      institution: "Assumption College Nakhonratchasima",
      degree: "Elementary School",
      duration: "2011 - 2017"
    },
    {
      institution: "Ratchasima Witthayalai School",
      degree: "Junior High School",
      duration: "2018 - 2020"
    },
    {
      institution: "Ratchasima Witthayalai School",
      degree: "High School",
      duration: "2021 - 2023"
    },
    {
      institution: "King Mongkut's University of Technology Thonburi",
      degree: "B.Eng. Computer Engineering (International Program)",
      duration: "2024 - Present"
    },
  ]
}
