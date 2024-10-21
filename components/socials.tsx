import Link from 'next/link';
import { ReactElement } from 'react';
import { FaGithub, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa'


export default function Socials ({containerStyle, iconStyle}: any): JSX.Element {

    const socials: Array<{icon: ReactElement, path: string}> = [
        {icon: <FaGithub/>, path: "https://github.com/oangsa"},
        {icon: <FaYoutube/>, path: "https://youtu.be/dQw4w9WgXcQ?si=JkbSb2gD1icLy8vG"},
        {icon: <FaTwitter/>, path: "https://youtu.be/dQw4w9WgXcQ?si=JkbSb2gD1icLy8vG"},
        {icon: <FaFacebook/>, path: "https://www.facebook.com/suthang.sukrueangkun"},
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