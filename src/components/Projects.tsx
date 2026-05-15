import { useRef } from "react";
import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "@/components/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

function ProjectCard({ p }: { p: (typeof portfolio.projects)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    ref.current.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  };

  const isLive = p.status === "active" || p.status === "shipped";

  return (
    <div className="project" ref={ref} onMouseMove={onMove}>
      <div className="project-head">
        <span className="project-num">// {p.num}</span>
        <span className={"project-status" + (isLive ? " live" : "")}>
          <span className="project-status-dot"></span>
          {p.status}
        </span>
      </div>
      <h3 className="project-title">{p.title}</h3>
      <div className="project-tagline">{p.tagline}</div>
      <p className="project-desc">{p.desc}</p>
      <div className="project-foot">
        <div className="project-stack">
          {p.stack.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
        <span className="project-cta">view ⟶</span>
      </div>
      <div className="project-peek">
        <h5>QUICK PEEK</h5>
        <ul>
          {p.peek.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Projects() {
  const { projects } = portfolio;
  const ref = useReveal();

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          num="// 05"
          title="PROJECTS"
          desc="Built, broken, shipped. Hover for the in-detail card."
        />
        <div className="projects-grid reveal-stagger reveal" ref={ref}>
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
