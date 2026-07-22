import type { resumeSectionInterface } from "@/interfaces/interfaces";
import { about, activities, educations, experiences } from "@/utils/data";

function ResumeSection({ section, id }: { section: resumeSectionInterface; id: string }): JSX.Element {
  return (
    <section aria-labelledby={`${id}-heading`} className="resume-section">
      <div className="section-heading resume-heading">
        <h2 id={`${id}-heading`}>{section.title}</h2>
      </div>

      <ol className="resume-list">
        {section.entries.map((entry) => (
          <li className="resume-entry" key={`${entry.organization}-${entry.duration}`}>
            <p className="resume-date">{entry.duration}</p>
            <div className="resume-content">
              <p className="resume-organization">{entry.organization}</p>
              <h3>{entry.title}</h3>
              {entry.context ? <p className="resume-context">{entry.context}</p> : null}
              {entry.highlights?.length ? (
                <ul className="resume-highlights">
                  {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ProfilePage(): JSX.Element {
  return (
    <main className="site-main about-page shell">
      <section aria-labelledby="profile-heading" className="about-intro">
        <div className="about-copy">
          <p className="hero-role">About</p>
          <h1 id="profile-heading">{about.title}</h1>
          <p>{about.description}</p>
          <a className="primary-cta" href="mailto:sukruangkul.aongsa@gmail.com">Start a conversation</a>
        </div>

        <dl className="profile-facts">
          {about.infos.map((item) => (
            <div key={item.fieldName}>
              <dt>{item.fieldName}</dt>
              <dd>{item.fieldValue}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ResumeSection section={experiences} id="experience" />
      <ResumeSection section={educations} id="education" />
      <ResumeSection section={activities} id="activities" />
    </main>
  );
}
