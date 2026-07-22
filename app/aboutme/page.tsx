import { about, educations } from "@/utils/data";

export default function AboutPage(): JSX.Element {
  return (
    <main className="container mx-auto py-12 xl:py-16">
      <section aria-labelledby="about-heading" className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-dark_accent dark:text-accent">About me</p>
        <h1 id="about-heading" className="text-4xl font-bold xl:text-5xl">{about.title}</h1>
        <p className="mt-6 max-w-2xl leading-7 text-black/70 dark:text-white/70">{about.description}</p>

        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2 dark:border-white/10 dark:bg-white/10">
          {about.infos.map((item) => (
            <div key={item.fieldName} className="bg-[#f0f0f5] p-5 dark:bg-[#232329]">
              <dt className="text-sm text-black/55 dark:text-white/55">{item.fieldName}</dt>
              <dd className="mt-1 break-words font-medium">{item.fieldValue}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="education-heading" className="mt-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-dark_accent dark:text-accent">Education</p>
        <h2 id="education-heading" className="text-4xl font-bold">{educations.title}</h2>
        <p className="mt-4 max-w-2xl leading-7 text-black/70 dark:text-white/70">{educations.description}</p>

        <ol className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {educations.infos.map((item) => (
            <li key={`${item.institution}-${item.duration}`} className="rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
              <p className="font-bold text-dark_accent dark:text-accent">{item.duration}</p>
              <h3 className="mt-4 text-xl font-semibold">{item.degree}</h3>
              <p className="mt-3 text-sm leading-6 text-black/65 dark:text-white/65">{item.institution}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
