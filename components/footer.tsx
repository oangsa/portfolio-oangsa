import NextLink from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="site-footer shell">
      <NextLink href="/" className="wordmark footer-wordmark">
        Suthang<span aria-hidden="true">.</span>
      </NextLink>
      <p className="footer-tagline">Software, systems, and a growing body of work.</p>
      <div className="footer-links">
        <a href="mailto:sukruangkul.aongsa@gmail.com">Email</a>
        <a href="https://github.com/oangsa" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
