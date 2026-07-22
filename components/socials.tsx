import { ReactElement } from 'react';
import { FaEnvelope, FaFacebook, FaGithub } from 'react-icons/fa'
import { socialLinks } from '@/utils/site';


interface SocialsProps {
    containerStyle?: string;
    iconStyle?: string;
}

const icons: Record<(typeof socialLinks)[number]["label"], ReactElement> = {
    GitHub: <FaGithub />,
    Facebook: <FaFacebook />,
    Email: <FaEnvelope />,
};

export default function Socials ({containerStyle, iconStyle}: SocialsProps): JSX.Element {

    return (
        <div className={containerStyle}>
            {socialLinks.map((item) => {
                const isExternal = item.href.startsWith("http");

                return <a
                    key={item.label}
                    href={item.href}
                    className={iconStyle}
                    aria-label={item.label}
                    title={item.label}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                >
                    {icons[item.label]}
                </a>
            })}
        </div>
    );
}
