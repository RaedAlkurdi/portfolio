import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useState } from "react";
import { HeroPhoto } from "@/components/portfolio/HeroPhoto";
import { RotatingHeadline } from "@/components/portfolio/RotatingHeadline";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { profile, skills, projects, experience } from "@/content/portfolio";
import reviewImage from "@/assets/purchasing-ai/review-grid.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raed Alkurdi | Portfolio" },
      { name: "description", content: "Machine learning projects, skills and studies by Raed Alkurdi, a Complex Adaptive Systems master's student at Chalmers." },
    ],
  }),
  component: Index,
});

const navigation = [["projects", "Work"], ["about", "About"], ["contact", "Contact"]] as const;
const featured = projects[0];
const otherProjects = projects.slice(1);
const tags = ["All", ...new Set(otherProjects.flatMap((project) => project.tags))];

function Index() {
  const [filter, setFilter] = useState("All");
  const shown = otherProjects.filter((project) => filter === "All" || project.tags.includes(filter));

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="container-page portfolio-header" id="top">
        <a className="wordmark" href="#top" aria-label="Raed Alkurdi, back to top">RA<span>.</span></a>
        <nav aria-label="Main navigation">
          {navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </header>

      <main id="main">
        <section className="container-page hero" aria-labelledby="name">
          <div className="hero-copy">
            <h1 id="name">Raed<br />Alkurdi<span>.</span></h1>
            <RotatingHeadline />
            <p className="hero-description">MSc student in Complex Adaptive Systems at Chalmers. I build and evaluate machine learning systems.</p>
            <a className="btn-ink" href="#projects">Explore my work <ArrowDown size={17} aria-hidden /></a>
          </div>
          <figure className="hero-figure">
            <div className="portrait"><HeroPhoto /></div>
            <figcaption><MapPin size={15} aria-hidden /> Gothenburg, Sweden</figcaption>
          </figure>
        </section>

        <section id="projects" className="container-page portfolio-section">
          <h2>Selected work</h2>
          <Link to="/projects/purchasing-ai" className="featured-project">
            <div className="feature-copy">
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <span className="project-action">Read the case study <ArrowUpRight size={17} aria-hidden /></span>
            </div>
            <div className="feature-media">
              <img src={reviewImage} alt="Purchasing AI review grid with supplier confirmation findings" loading="lazy" />
            </div>
          </Link>

          <h3 className="project-list-title">More projects</h3>
          <div className="project-filters" role="group" aria-label="Filter projects by topic">
            {tags.map((tag) => (
              <button key={tag} type="button" className="chip" aria-pressed={filter === tag} onClick={() => setFilter(tag)}>{tag}</button>
            ))}
          </div>
          <p className="sr-only" role="status">{shown.length} {shown.length === 1 ? "project" : "projects"} shown</p>
          <div>
            {shown.map((project) => (
              <article key={project.title} className="project-row">
                <h4>{project.title}</h4>
                <div>
                  <p>{project.description}</p>
                  <ul className="project-tags" aria-label="Topics">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                {project.github && <a className="project-action" href={project.github} aria-label={`View ${project.title} on GitHub`}>GitHub <ArrowUpRight size={15} aria-hidden /></a>}
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="container-page portfolio-section">
          <div className="editorial-grid">
            <h2>About me</h2>
            <div className="body-copy"><p>{profile.bio}</p><p>{profile.personal}</p></div>
          </div>
          <div id="skills" className="editorial-grid detail-section">
            <h3>Tools and interests</h3>
            <dl className="detail-list">
              {skills.map((item) => <div key={item.group}><dt>{item.group}</dt><dd>{item.items.join(" · ")}</dd></div>)}
            </dl>
          </div>
          <div id="experience" className="editorial-grid detail-section">
            <h3>Education</h3>
            <ul className="education-list">
              {experience.map((item) => <li key={item.role}><h4>{item.role}</h4><p>{item.org}</p><p>{item.period}</p>{item.text && <p>{item.text}</p>}</li>)}
            </ul>
          </div>
        </section>

        <section id="contact" className="container-page portfolio-section">
          <div className="editorial-grid contact-layout">
            <div>
              <h2>Get in touch</h2>
              <a className="contact-email project-action" href={`mailto:${profile.email}`}>{profile.email} <ArrowRight size={16} aria-hidden /></a>
              {profile.links.map((link) => <a className="project-action" key={link.label} href={link.href}>{link.label} <ArrowUpRight size={16} aria-hidden /></a>)}
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="container-page portfolio-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}
