import { ReactElement } from 'react';
import { FaEnvelope, FaFacebook, FaGithub } from 'react-icons/fa'
import { socialLinks } from '@/utils/site';


const icons: Record<(typeof socialLinks)[number]["label"], ReactElement> = {
    GitHub: <FaGithub />,
    Facebook: <FaFacebook />,
    Email: <FaEnvelope />,
};

export default function Socials(): JSX.Element {
    return (
        <div className="social-links" aria-label="Social links">
            {socialLinks.map((item) => {
                const isExternal = item.href.startsWith("http");

                return <a
                    key={item.label}
                    href={item.href}
                    className="social-link"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                >
                    <span aria-hidden="true">{icons[item.label]}</span>
                    {item.label}
                </a>
            })}
        </div>
    );
}
