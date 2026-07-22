import Photo from "@/components/photo";
import ProjectsGrid from "@/components/projectsGrid";
import Skills from "@/components/skills";
import Socials from "@/components/socials";
import Stats from "@/components/stats";

export default function Home(): JSX.Element {
  return (
    <main className="site-main home-page">
      <section className="home-hero shell" aria-labelledby="intro-heading">
        <div className="hero-copy">
          <p className="hero-role">Computer Engineering Student · Full-Stack Developer</p>
          <h1 id="intro-heading">Hello, I’m <span>Suthang Sukrueangkun.</span></h1>
          <p className="hero-lede">
              I build full-stack software and data-backed web applications while studying computer engineering at KMUTT.
          </p>
          <a className="primary-cta" href="mailto:sukruangkul.aongsa@gmail.com">Email me</a>
          <Socials />
        </div>
        <Photo />
      </section>

      <Stats />

      <section className="skills-section shell" aria-labelledby="skills-heading">
        <div className="section-heading compact-heading">
          <h2 id="skills-heading">Core toolkit</h2>
          <p>Technologies I use to ship full-stack applications.</p>
        </div>
        <Skills />
      </section>

      <section className="projects-section shell" aria-labelledby="projects-heading">
        <div className="section-heading">
          <h2 id="projects-heading">Selected projects</h2>
          <p>Production-minded coursework and independent builds spanning web systems, databases, robotics, and language tooling.</p>
        </div>
        <ProjectsGrid />
      </section>
    </main>
  );
}
