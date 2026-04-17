import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { portfolio, type Project } from "./content/portfolio";
import { Nav } from "./components/Nav";
import { ProjectModal } from "./components/ProjectModal";
import { SectionHeader } from "./components/SectionHeader";
import { useActiveSection } from "./hooks/useActiveSection";
import { useLowPowerMode } from "./hooks/useLowPowerMode";

const SceneBackground = lazy(() => import("./components/SceneBackground"));

type SectionItem = {
  id: string;
  label: string;
};

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <section className={`content-section ${className}`.trim()} id={id}>
      {children}
    </section>
  );
}

function usePageVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibilityChange = () => setVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return visible;
}

export default function App() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTrigger, setModalTrigger] = useState<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lowPowerMode = useLowPowerMode();
  const pageVisible = usePageVisibility();

  const featuredProjects = useMemo(
    () => portfolio.projects.filter((project) => project.featured),
    [],
  );

  const hasPosts = portfolio.linkedinPosts.length > 0;
  const hasResume = Boolean(portfolio.resumeUrl);

  const sectionItems = useMemo<SectionItem[]>(() => {
    const items: SectionItem[] = [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ];

    if (hasPosts) {
      items.splice(5, 0, { id: "posts", label: "Posts" });
    }

    return items;
  }, [hasPosts]);

  const activeSection = useActiveSection(sectionItems.map((item) => item.id));

  useEffect(() => {
    if (portfolio.statusLines.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % portfolio.statusLines.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setScrollProgress(window.scrollY / maxScroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const animateScene = pageVisible && !lowPowerMode;
  const statusLine = portfolio.statusLines[statusIndex] ?? portfolio.statusLines[0];
  const primaryProject = featuredProjects[0] ?? portfolio.projects[0];

  return (
    <div className={`site-shell${lowPowerMode ? " site-shell--low-power" : ""}`}>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Nav activeSection={activeSection} brand={portfolio.name} items={sectionItems} />
      <div className="site-background" aria-hidden="true">
        {!lowPowerMode ? (
          <Suspense fallback={<div className="scene-fallback" />}>
            <SceneBackground
              animate={animateScene}
              reducedMotion={lowPowerMode}
              scrollProgress={scrollProgress}
            />
          </Suspense>
        ) : (
          <div className="scene-fallback" />
        )}
        <div className="overlay overlay--grid" />
        {!lowPowerMode ? <div className="overlay overlay--scanlines" /> : null}
        {!lowPowerMode ? <div className="overlay overlay--noise" /> : null}
        <div className="overlay overlay--vignette" />
      </div>

      <main>
        <section className="hero" id="hero">
          <div className="hero__content shell-panel">
            <p className="hero__eyebrow">Cybersecurity • Software • Offensive Practice</p>
            <h1>{portfolio.name}</h1>
            <p className="hero__tagline">{portfolio.tagline}</p>
            <p className="hero__lead">{portfolio.heroSummary}</p>
            <div aria-live="polite" className="hero__status">
              <span className="hero__prompt">status://</span>
              <span>{statusLine}</span>
            </div>
            <p className="hero__copy">{portfolio.role}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#projects">
                Explore Projects
              </a>
              {hasResume ? (
                <a className="button button--ghost" href={portfolio.resumeUrl} target="_blank" rel="noreferrer">
                  Resume
                </a>
              ) : null}
              <a className="button button--secondary" href="#contact">
                Contact
              </a>
            </div>
          </div>

          <aside className="hero__meta shell-panel" aria-label="Portfolio summary">
            <div>
              <span>Location</span>
              <strong>{portfolio.location}</strong>
            </div>
            <div>
              <span>Current focus</span>
              <strong>{primaryProject?.domain ?? "Security Engineering"}</strong>
            </div>
            <div>
              <span>Featured outcome</span>
              <strong>{primaryProject?.outcome ?? "Building repeatable workflows"}</strong>
            </div>
          </aside>
        </section>

        <div className="content-layout">
          <Section id="about">
            <SectionHeader
              description="A quick introduction to the engineering, offensive-security, and AI-security threads that shape the work on this site."
              eyebrow="/about"
              title="Security work grounded in systems thinking"
            />
            <div className="about-grid">
              <div className="shell-panel prose-panel">
                {portfolio.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="shell-panel identity-panel">
                <p className="identity-panel__label">Profile</p>
                <h3>{portfolio.role}</h3>
                <dl>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>{portfolio.location}</dd>
                  </div>
                  <div>
                    <dt>GitHub</dt>
                    <dd>
                      <a href={portfolio.github} rel="noreferrer" target="_blank">
                        github.com/ACHUX21
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>LinkedIn</dt>
                    <dd>
                      <a href={portfolio.linkedin} rel="noreferrer" target="_blank">
                        linkedin.com/in/achux21
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      <a href={`tel:${portfolio.phone}`}>{portfolio.phone}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Blog</dt>
                    <dd>
                      <a href={portfolio.blog} rel="noreferrer" target="_blank">
                        blog.achux21.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Section>

          <Section id="experience">
            <SectionHeader
              description="Selected experience, current AI-security focus, education, and credentials drawn directly from the current CV."
              eyebrow="/experience"
              title="Experience and credentials"
            />
            <div className="experience-grid">
              <div className="experience-stack">
                {portfolio.experiences.map((entry) => (
                  <article className="shell-panel experience-card" key={`${entry.organization}-${entry.period}`}>
                    <div className="experience-card__header">
                      <div>
                        <p className="section-eyebrow">{entry.period}</p>
                        <h3>{entry.title}</h3>
                      </div>
                      <span className="experience-card__location">{entry.location}</span>
                    </div>
                    <p className="experience-card__org">{entry.organization}</p>
                    <p>{entry.summary}</p>
                    <ul className="experience-card__list">
                      {entry.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
                <article className="shell-panel experience-card">
                  <p className="section-eyebrow">Current focus</p>
                  <h3>Current security research directions</h3>
                  <div className="tag-row">
                    {portfolio.currentFocus.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
              <div className="experience-sidebar">
                <article className="shell-panel info-card">
                  <p className="section-eyebrow">Education</p>
                  <div className="info-card__stack">
                    {portfolio.education.map((item) => (
                      <div key={`${item.institution}-${item.period}`}>
                        <h3>{item.institution}</h3>
                        <p>{item.degree}</p>
                        <span>{item.period} • {item.location}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="shell-panel info-card">
                  <p className="section-eyebrow">Credentials</p>
                  <div className="info-card__stack">
                    {portfolio.certifications.slice(0, 4).map((item) => (
                      <div key={`${item.title}-${item.date}`}>
                        <h3>{item.title}</h3>
                        <p>{item.note}</p>
                        <span>{item.issuer}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="shell-panel info-card">
                  <p className="section-eyebrow">Languages</p>
                  <div className="tag-row">
                    {portfolio.languages.map((language) => (
                      <span className="tag" key={language}>
                        {language}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </Section>

          <Section id="projects">
            <SectionHeader
              description="Selected systems, web, and security projects with direct links and detail views for deeper context."
              eyebrow="/projects"
              title="Selected builds and security tooling"
            />
            <div className="project-grid">
              {portfolio.projects.map((project) => {
                const primaryLink = project.links[0];

                return (
                  <article className="project-card shell-panel" key={project.id}>
                    <div className="project-card__header">
                      <p className="project-card__status">{project.status}</p>
                      <span className="project-card__domain">{project.domain}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <p className="project-card__outcome">{project.outcome}</p>
                    <div className="tag-row">
                      {project.stack.map((item) => (
                        <span className="tag" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="project-card__actions">
                      <button
                        className="button button--secondary"
                        onClick={(event) => {
                          setModalTrigger(event.currentTarget);
                          setSelectedProject(project);
                        }}
                        type="button"
                      >
                        Open Detail View
                      </button>
                      {primaryLink ? (
                        <a
                          className="button button--ghost"
                          href={primaryLink.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {primaryLink.label}
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </Section>

          <Section id="skills">
            <SectionHeader
              description="Current technical strengths across offensive workflows, engineering fundamentals, and infrastructure understanding."
              eyebrow="/skills"
              title="Current skill map"
            />
            <div className="skill-grid">
              {portfolio.skills.map((group) => (
                <article className="shell-panel skill-card" key={group.category}>
                  <h3>{group.category}</h3>
                  <div className="tag-row">
                    {group.items.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          {hasPosts ? (
            <Section id="posts">
              <SectionHeader
                description="Selected public posts covering competition wins, meetup work, and moments from the broader learning journey."
                eyebrow="/posts"
                title="Selected posts and public moments"
              />
              <div className="post-grid">
                {portfolio.linkedinPosts.map((post) => (
                  <a
                    className="shell-panel post-card"
                    href={post.url}
                    key={post.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img alt={post.title} src={post.image} />
                    <div className="post-card__body">
                      <h3>{post.title}</h3>
                      <span>{post.label}</span>
                    </div>
                  </a>
                ))}
              </div>
            </Section>
          ) : null}

          <Section id="contact">
            <SectionHeader
              description="Direct contact paths for collaboration, internships, research conversations, or security-focused engineering roles."
              eyebrow="/contact"
              title="Get in touch"
            />
            <div className="contact-grid">
              <div className="shell-panel contact-panel">
                <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
                <a href={`tel:${portfolio.phone}`}>{portfolio.phone}</a>
                <p>{portfolio.location}</p>
                <div className="contact-panel__socials">
                  {portfolio.socials.map((social) => (
                    <a href={social.url} key={social.label} rel="noreferrer" target="_blank">
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="shell-panel prose-panel">
                <p>{portfolio.contactNote}</p>
                <div className="contact-cta-row">
                  <a className="button button--secondary" href={`mailto:${portfolio.email}`}>
                    Send Email
                  </a>
                  {hasResume ? (
                    <a className="button button--ghost" href={portfolio.resumeUrl} rel="noreferrer" target="_blank">
                      Resume
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer className="site-footer">
        <p>Built for achux21.com with React, TypeScript, and a low-power fallback.</p>
      </footer>

      <ProjectModal
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        returnFocusTarget={modalTrigger}
      />
    </div>
  );
}
