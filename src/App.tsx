import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio, type Project } from "@/content/portfolio";
import { Nav } from "@/components/Nav";
import { ProjectModal } from "@/components/ProjectModal";
import { SectionHeader } from "@/components/SectionHeader";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLowPowerMode } from "@/hooks/useLowPowerMode";

gsap.registerPlugin(ScrollTrigger);

const SceneBackground = lazy(() => import("@/components/SceneBackground"));

/* ── Fade-up section wrapper ── */
function Section({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="section-card scroll-mt-nav"
    >
      {children}
    </motion.section>
  );
}

/* ── Page visibility hook ── */
function usePageVisibility() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onV = () => setVisible(!document.hidden);
    onV();
    document.addEventListener("visibilitychange", onV);
    return () => document.removeEventListener("visibilitychange", onV);
  }, []);
  return visible;
}

/* ── Stagger children animation variants ── */
const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

export default function App() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTrigger, setModalTrigger] = useState<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lowPowerMode = useLowPowerMode();
  const pageVisible = usePageVisibility();

  const featuredProjects = useMemo(
    () => portfolio.projects.filter((p) => p.featured),
    [],
  );
  const hasPosts = portfolio.linkedinPosts.length > 0;
  const hasResume = Boolean(portfolio.resumeUrl);

  const sectionItems = useMemo(() => {
    const items = [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ];
    if (hasPosts) items.splice(5, 0, { id: "posts", label: "Posts" });
    return items;
  }, [hasPosts]);

  const activeSection = useActiveSection(sectionItems.map((i) => i.id));

  /* ── Status line cycling ── */
  useEffect(() => {
    if (portfolio.statusLines.length < 2) return;
    const interval = window.setInterval(() => {
      setStatusIndex((c) => (c + 1) % portfolio.statusLines.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, []);

  /* ── Scroll progress ── */
  useEffect(() => {
    const handleScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(window.scrollY / max);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* ── GSAP hero parallax ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-parallax", {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Derive state ── */
  const animateScene = pageVisible && !lowPowerMode;
  const statusLine = portfolio.statusLines[statusIndex] ?? portfolio.statusLines[0];
  const primaryProject = featuredProjects[0] ?? portfolio.projects[0];

  return (
    <div className={`relative isolate${lowPowerMode ? " opacity-90" : ""}`}>
      {/* Skip link */}
      <a
        className="absolute top-4 left-4 z-100 py-3 px-4 rounded-full bg-[oklch(0.05_0.02_280/0.96)] border border-border-strong -translate-y-[180%] focus-visible:translate-y-0 transition-transform duration-160 no-underline text-text-primary"
        href="#about"
      >
        Skip to content
      </a>

      {/* Nav */}
      <Nav activeSection={activeSection} brand={portfolio.name} items={sectionItems} />

      {/* ── Background scene ── */}
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {!lowPowerMode ? (
          <Suspense
            fallback={
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 18% 28%, oklch(0.7 0.08 300 / 0.12), transparent 26%), radial-gradient(circle at 82% 40%, oklch(0.55 0.12 280 / 0.1), transparent 24%), radial-gradient(circle at 46% 84%, oklch(0.75 0.1 320 / 0.08), transparent 30%), linear-gradient(180deg, oklch(0.06 0.02 280 / 0.94), oklch(0.03 0.01 280))",
                }}
              />
            }
          >
            <SceneBackground
              animate={animateScene}
              reducedMotion={lowPowerMode}
            />
          </Suspense>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 18% 28%, oklch(0.7 0.08 300 / 0.12), transparent 26%), radial-gradient(circle at 82% 40%, oklch(0.55 0.12 280 / 0.1), transparent 24%), linear-gradient(180deg, oklch(0.06 0.02 280 / 0.94), oklch(0.03 0.01 280))",
            }}
          />
        )}
        <div className="scene-overlay overlay-grid" />
        {!lowPowerMode && <div className="scene-overlay overlay-scanlines" />}
        {!lowPowerMode && <div className="scene-overlay overlay-noise" />}
        <div className="scene-overlay overlay-vignette" />
      </div>

      {/* ── Main content ── */}
      <main>
        {/* ── HERO ── */}
        <section
          id="hero"
          className="relative min-h-[100dvh] pt-28 pb-16 px-[clamp(1rem,4vw,2.5rem)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hero-parallax relative z-[2]"
          >
            <div className="panel w-[min(48rem,100%)] mt-[9vh] p-[clamp(1.4rem,4vw,2.6rem)]">
              <p className="eyebrow mb-4">Cybersecurity • Software • Offensive Practice</p>
              <h1 className="m-0 text-[clamp(2.8rem,8vw,6rem)] leading-[0.92] max-w-[10ch] font-medium tracking-tight">
                {portfolio.name}
              </h1>
              <p className="text-dim max-w-[42rem] text-[clamp(1.02rem,1.9vw,1.22rem)] mt-4">
                {portfolio.tagline}
              </p>
              <p className="text-dim max-w-[38rem] mt-3">{portfolio.heroSummary}</p>

              <div
                aria-live="polite"
                className="inline-flex items-center gap-2.5 py-3.5 px-4 rounded-full border border-[oklch(0.5_0.06_300/0.18)] bg-[oklch(0.1_0.03_280/0.78)] text-accent mt-5"
              >
                <span className="text-accent-soft">status://</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={statusIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {statusLine}
                  </motion.span>
                </AnimatePresence>
              </div>

              <p className="text-accent text-base tracking-[0.12em] uppercase mt-4">
                {portfolio.role}
              </p>

              <div className="flex flex-wrap gap-3.5 mt-8">
                <a className="btn btn-primary" href="#projects">
                  Explore Projects
                </a>
                {hasResume && (
                  <a
                    className="btn btn-ghost"
                    href={portfolio.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resume
                  </a>
                )}
                <a className="btn btn-secondary" href="#contact">
                  Contact
                </a>
              </div>
            </div>
          </motion.div>

          {/* Hero meta */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="absolute right-[clamp(1rem,4vw,2.5rem)] bottom-16 max-sm:relative max-sm:right-auto max-sm:bottom-auto max-sm:mt-4 max-sm:w-full panel w-[min(20rem,calc(100vw-2rem))] p-4 z-[2]"
            aria-label="Portfolio summary"
          >
            <div>
              <span className="block text-text-secondary uppercase tracking-[0.18em] text-xs">
                Location
              </span>
              <strong className="mt-1 block text-text-primary">{portfolio.location}</strong>
            </div>
            <div className="mt-3 pt-3 border-t border-[oklch(0.45_0.05_280/0.08)]">
              <span className="block text-text-secondary uppercase tracking-[0.18em] text-xs">
                Current focus
              </span>
              <strong className="mt-1 block text-text-primary">
                {primaryProject?.domain ?? "Security Engineering"}
              </strong>
            </div>
            <div className="mt-3 pt-3 border-t border-[oklch(0.45_0.05_280/0.08)]">
              <span className="block text-text-secondary uppercase tracking-[0.18em] text-xs">
                Featured outcome
              </span>
              <strong className="mt-1 block text-text-primary">
                {primaryProject?.outcome ?? "Building repeatable workflows"}
              </strong>
            </div>
          </motion.aside>
        </section>

        {/* ── Content sections ── */}
        <div className="relative z-[2] px-[clamp(1rem,4vw,2.5rem)] pb-20">
          {/* ABOUT */}
          <Section id="about">
            <SectionHeader
              description="A quick introduction to the engineering, offensive-security, and AI-security threads that shape the work on this site."
              eyebrow="/about"
              title="Security work grounded in systems thinking"
            />
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-4">
              <div className="panel p-5">
                {portfolio.bio.map((p, i) => (
                  <motion.p
                    key={p}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="text-dim before:content-['>_'] before:mr-3 before:text-accent-soft"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <div className="panel p-5">
                <p className="text-accent uppercase tracking-[0.2em] text-sm mt-0">Profile</p>
                <h3 className="mb-4">{portfolio.role}</h3>
                <dl className="m-0 space-y-4">
                  {[
                    ["Email", portfolio.email, `mailto:${portfolio.email}`],
                    ["Location", portfolio.location, null],
                    ["GitHub", "github.com/ACHUX21", portfolio.github],
                    ["LinkedIn", "linkedin.com/in/achux21", portfolio.linkedin],
                    ["Phone", portfolio.phone, `tel:${portfolio.phone}`],
                    ["Blog", "blog.achux21.com", portfolio.blog],
                  ].map(([label, value, href]) => (
                    <div key={label}>
                      <dt className="text-text-secondary uppercase tracking-[0.18em] text-xs">
                        {label}
                      </dt>
                      <dd className="ml-0 mt-1 text-text-primary">
                        {href ? (
                          <a href={href} rel="noreferrer" target="_blank">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Section>

          {/* EXPERIENCE */}
          <Section id="experience">
            <SectionHeader
              description="Selected experience, current AI-security focus, education, and credentials drawn directly from the current CV."
              eyebrow="/experience"
              title="Experience and credentials"
            />
            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] gap-4">
              <div className="space-y-4">
                {portfolio.experiences.map((entry, i) => (
                  <motion.article
                    key={`${entry.organization}-${entry.period}`}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="panel p-5"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="eyebrow mb-1">{entry.period}</p>
                        <h3 className="mt-0">{entry.title}</h3>
                      </div>
                      <span className="text-accent text-sm">{entry.location}</span>
                    </div>
                    <p className="text-accent mt-1">{entry.organization}</p>
                    <p className="text-dim">{entry.summary}</p>
                    <ul className="mt-4 pl-4 text-dim leading-relaxed space-y-1">
                      {entry.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
                <motion.article
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                  className="panel p-5"
                >
                  <p className="eyebrow mb-3">Current focus</p>
                  <h3 className="mt-0">Current security research directions</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {portfolio.currentFocus.map((f) => (
                      <span className="tag" key={f}>
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </div>

              <div className="space-y-4">
                <article className="panel p-5">
                  <p className="eyebrow mb-3">Education</p>
                  <div className="space-y-4">
                    {portfolio.education.map((item) => (
                      <div
                        key={`${item.institution}-${item.period}`}
                        className="pb-4 border-b border-border last:border-b-0 last:pb-0"
                      >
                        <h3 className="mt-0 mb-1">{item.institution}</h3>
                        <p className="text-dim my-1">{item.degree}</p>
                        <span className="text-accent text-sm">
                          {item.period} • {item.location}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="panel p-5">
                  <p className="eyebrow mb-3">Credentials</p>
                  <div className="space-y-4">
                    {portfolio.certifications.slice(0, 4).map((item) => (
                      <div
                        key={`${item.title}-${item.date}`}
                        className="pb-4 border-b border-border last:border-b-0 last:pb-0"
                      >
                        <h3 className="mt-0 mb-1">{item.title}</h3>
                        <p className="text-dim my-1">{item.note}</p>
                        <span className="text-accent text-sm">{item.issuer}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="panel p-5">
                  <p className="eyebrow mb-3">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.languages.map((l) => (
                      <span className="tag" key={l}>
                        {l}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </Section>

          {/* PROJECTS */}
          <Section id="projects">
            <SectionHeader
              description="Selected systems, web, and security projects with direct links and detail views for deeper context."
              eyebrow="/projects"
              title="Selected builds and security tooling"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.projects.map((project, i) => {
                const primaryLink = project.links[0];
                return (
                  <motion.article
                    key={project.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="panel p-5 flex flex-col"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <p className="eyebrow !mb-0">{project.status}</p>
                      <span className="text-accent text-[0.82rem] tracking-[0.12em] uppercase">
                        {project.domain}
                      </span>
                    </div>
                    <h3 className="mt-0">{project.title}</h3>
                    <p className="text-dim">{project.summary}</p>
                    <p className="text-accent-soft text-sm mt-1">{project.outcome}</p>
                    <div className="flex flex-wrap gap-2 my-4">
                      {project.stack.map((s) => (
                        <span className="tag" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-auto">
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          setModalTrigger(e.currentTarget);
                          setSelectedProject(project);
                        }}
                        type="button"
                      >
                        Open Detail View
                      </button>
                      {primaryLink && (
                        <a
                          className="btn btn-ghost"
                          href={primaryLink.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {primaryLink.label}
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </Section>

          {/* SKILLS */}
          <Section id="skills">
            <SectionHeader
              description="Current technical strengths across offensive workflows, engineering fundamentals, and infrastructure understanding."
              eyebrow="/skills"
              title="Current skill map"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.skills.map((group, i) => (
                <motion.article
                  key={group.category}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                  className="panel p-5"
                >
                  <h3 className="mt-0 text-accent">{group.category}</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {group.items.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </Section>

          {/* POSTS */}
          {hasPosts && (
            <Section id="posts">
              <SectionHeader
                description="Selected public posts covering competition wins, meetup work, and moments from the broader learning journey."
                eyebrow="/posts"
                title="Selected posts and public moments"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolio.linkedinPosts.map((post, i) => (
                  <motion.a
                    key={post.url}
                    href={post.url}
                    rel="noreferrer"
                    target="_blank"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="panel overflow-hidden !p-0 no-underline group"
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      alt={post.title}
                      src={post.image}
                      className="w-full aspect-[1.18] object-cover block saturate-[0.9] brightness-[0.84] group-hover:brightness-100 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className="m-0 mb-2 text-base">{post.title}</h3>
                      <span className="text-accent text-sm">{post.label}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </Section>
          )}

          {/* CONTACT */}
          <Section id="contact">
            <SectionHeader
              description="Direct contact paths for collaboration, internships, research conversations, or security-focused engineering roles."
              eyebrow="/contact"
              title="Get in touch"
            />
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-4">
              <div className="panel p-5 flex flex-col gap-3">
                <a href={`mailto:${portfolio.email}`} className="block text-text-primary text-lg">
                  {portfolio.email}
                </a>
                <a href={`tel:${portfolio.phone}`} className="block text-text-primary">
                  {portfolio.phone}
                </a>
                <p className="text-dim">{portfolio.location}</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {portfolio.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      rel="noreferrer"
                      target="_blank"
                      className="text-accent-soft hover:text-accent transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="panel p-5">
                <p className="text-dim">{portfolio.contactNote}</p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <a className="btn btn-secondary" href={`mailto:${portfolio.email}`}>
                    Send Email
                  </a>
                  {hasResume && (
                    <a
                      className="btn btn-ghost"
                      href={portfolio.resumeUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Resume
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-[2] pb-12 px-4 text-center text-text-secondary text-sm">
        <p>Built for achux21.com with React 19, TypeScript, Three.js, and a low-power fallback.</p>
      </footer>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal
            onClose={() => setSelectedProject(null)}
            project={selectedProject}
            returnFocusTarget={modalTrigger}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
