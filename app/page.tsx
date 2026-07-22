import Photo from "@/components/photo";
import ProjectsGrid from "@/components/projectsGrid";
import Skills from "@/components/skills";
import Socials from "@/components/socials";

export default function Home(): JSX.Element {

  return (
    <main className="h-full">
      <section className="container mx-auto h-full" aria-labelledby="intro-heading">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Computer Engineering Student</span>
            <h1 id="intro-heading" className="h1 mb-6 primary">Hello, I&apos;m<br />
              <span className="text-dark_accent dark:text-accent">Suthang Sukrueangkun</span>
            </h1>
            <p className="max-w-[540px] mb-9 leading-7 text-black/70 dark:text-white/70">
              I build software, web applications, and embedded-system projects while studying computer engineering.
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <div className="mb-8 xl:mb-0">
                <Socials containerStyle="flex gap-6 justify-items-center" iconStyle="w-9 h-9 rounded-full flex justify-center items-center hover:text-xl dark:hover:text-accent hover:text-dark_accent hover:transition-all duration-500" />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo/>
          </div>
        </div>
      </section>
      <section className="container mx-auto h-full" aria-labelledby="skills-heading">
        <div className="flex flex-col pt-16 pb-12 xl:flex-row items-center justify-between xl:pt-16 xl:pb-20">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <h2 id="skills-heading" className="h1 underline">Skills</h2>
            <div className="flex flex-col xl:flex-row items-center gap-2">
              <div className="mb-8 xl:mb-0 pt-12 xl:pt-3">
                <Skills containerStyle="grid grid-cols-2 xl:grid-cols-6 xl:pt-8 pt-3 flex gap-12 justify-items-center" iconStyle="w-9 h-9 rounded-full flex justify-center items-center hover:transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto h-full pb-16" aria-labelledby="projects-heading">
        <div className="flex flex-col pt-16 pb-12 xl:flex-row items-center justify-between xl:pt-16 xl:pb-20">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <h2 id="projects-heading" className="h1 underline">Projects</h2>
          </div>
        </div>
        <ProjectsGrid />
      </section>
    </main>

  );
}
