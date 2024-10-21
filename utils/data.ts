import { aboutInterface, educationInterface, projectsInterface } from "@/interfaces/interfaces"

export const projects: Array<projectsInterface> = [
  {
    name: "Treasure Hunt Robot",
    subject: "CPE101",
    image: "https://i.ibb.co/TMbzZT1/Robot.jpg",
    description: "The robot powered by micro::bit board, with built-in camera, the robot can explore inside the cave without ease!",
    status: "success"
  },
  {
    name: "Brainrot-Interpreter",
    subject: "NONE",
    image: "https://i.ibb.co/RN7nqp9/Interpreter.png",
    description: "Brainrot-Interpreter is a interpreter for brainrot words written in TypeScript. The project mainly aim for study about how computer language work, abstract syntax, and lexer!",
    status: "in-progess"
  },
  {
    name: "Sandwich Bot",
    subject: "NONE",
    image: "https://i.ibb.co/JQF4tst/SandWich.png",
    description: "Sandwich bot is a bot for discord have multiple functions such as Play Music and more!. The bot was written in JavaScript.",
    status: "in-progess"
  },
  {
    name: "TO BE NUMBER ONE WEBSITE",
    subject: "NONE",
    image: "https://i.ibb.co/FVMjfP0/TOBE.png",
    description: "The website is for the TO BE NUMBER ONE club in my old school. The web was built in Next.JS with a power of NextUI and TailwindCSS, and also written in TypeScript. ",
    status: "success"
  },
]

export const about: aboutInterface = {
  title: 'About me',
  description: "My Story",
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
  description: "This is my educations",
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
      institution: "King Mongkut&apos;s University of Technology Thonburi",
      degree: "B.Eng. Computer Engineering (International Program)",
      duration: "2024 - ???"
    },
  ]
}