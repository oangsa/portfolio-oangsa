import { ReactElement } from "react";
import { ImHtmlFive2 } from "react-icons/im";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandTypescript } from "react-icons/tb";
import { TbBrandNextjs } from "react-icons/tb";
import { IoLogoNodejs } from "react-icons/io";
import { TbBrandPrisma } from "react-icons/tb";
import { TbBrandMongodb } from "react-icons/tb";
import { IoLogoPython } from "react-icons/io";

export default function Skills ({containerStyle, iconStyle}: any): JSX.Element {

    const socials: Array<{icon: ReactElement, name: string}> = [
        {icon: <ImHtmlFive2 size={'lg'}/>, name: "HTML"},
        {icon: <IoLogoJavascript size={'lg'}/>, name: "JavaScript"},
        {icon: <TbBrandTypescript size={'lg'}/>, name: "TypeScript"},
        {icon: <IoLogoPython size={'lg'}/>, name: "Python"},
        {icon: <IoLogoNodejs size={'lg'}/>, name: "NodeJS"},
        {icon: <TbBrandPrisma size={'lg'}/>, name: "Next.JS"},
        {icon: <TbBrandNextjs size={'lg'}/>, name: "Prisma"},
        {icon: <TbBrandMongodb size={'lg'}/>, name: "MongoDB"}
    ]

    return (
        <div className={containerStyle}>
            {socials.map((item, index) => {
                return (
                <div key={index} className="hover:dark:text-accent hover:text-dark_accent hover:text-xl flex place-items-center gap-3 transition-all">
                    <div key={index} className={iconStyle}>
                        {item.icon}
                    </div>
                    {item.name}
                </div>
                )
            })}
        </div>
    );
}