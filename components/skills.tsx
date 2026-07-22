import { ReactElement } from "react";
import { ImHtmlFive2 } from "react-icons/im";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandTypescript } from "react-icons/tb";
import { TbBrandNextjs } from "react-icons/tb";
import { IoLogoNodejs } from "react-icons/io";
import { TbBrandPrisma } from "react-icons/tb";
import { TbBrandMongodb } from "react-icons/tb";
import { IoLogoPython } from "react-icons/io";

interface SkillsProps {
    containerStyle?: string;
    iconStyle?: string;
}

export default function Skills ({containerStyle, iconStyle}: SkillsProps): JSX.Element {

    const skills: Array<{icon: ReactElement, name: string}> = [
        {icon: <ImHtmlFive2 size="1.25rem"/>, name: "HTML"},
        {icon: <IoLogoJavascript size="1.25rem"/>, name: "JavaScript"},
        {icon: <TbBrandTypescript size="1.25rem"/>, name: "TypeScript"},
        {icon: <IoLogoPython size="1.25rem"/>, name: "Python"},
        {icon: <IoLogoNodejs size="1.25rem"/>, name: "Node.js"},
        {icon: <TbBrandNextjs size="1.25rem"/>, name: "Next.js"},
        {icon: <TbBrandPrisma size="1.25rem"/>, name: "Prisma"},
        {icon: <TbBrandMongodb size="1.25rem"/>, name: "MongoDB"}
    ]

    return (
        <div className={containerStyle}>
            {skills.map((item) => {
                return (
                <div key={item.name} className="hover:dark:text-accent hover:text-dark_accent hover:text-xl flex place-items-center gap-3 transition-all">
                    <div className={iconStyle} aria-hidden="true">
                        {item.icon}
                    </div>
                    {item.name}
                </div>
                )
            })}
        </div>
    );
}
