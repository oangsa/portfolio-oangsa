import Link from 'next/link';
import { Attributes, HTMLAttributes, ReactElement, ReactHTMLElement } from 'react';
import { FaGithub, FaYoutube, FaTwitter } from 'react-icons/fa'


export default function Socials ({containerStyle, iconStyle}: any): JSX.Element {

    const socials: Array<{icon: ReactElement, path: string}> = [
        {icon: <FaGithub/>, path: "https://github.com/oangsa"},
        {icon: <FaYoutube/>, path: "https://youtu.be/dQw4w9WgXcQ?si=JkbSb2gD1icLy8vG"},
        {icon: <FaTwitter/>, path: "https://youtu.be/dQw4w9WgXcQ?si=JkbSb2gD1icLy8vG"}
    ]

    return (
        <div className={containerStyle}>
            {socials.map((item, index) => {
                return <Link key={index} href={item.path} className={iconStyle}>
                    {item.icon}
                </Link>
            })}
        </div>
    );
}