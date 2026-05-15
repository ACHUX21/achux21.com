import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "@/components/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

export function Experience() {
  const { experience, education, certs, langs } = portfolio;
  const ref = useReveal();

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader
          num="// 04"
          title="EXPERIENCE"
          desc="Roles, research, and the occasional teaching gig."
        />
        <div className="exp-wrap reveal" ref={ref}>
          <div className="timeline">
            {experience.map((e, i) => (
              <div key={i} className="tl-item">
                <span className="tl-dot"></span>
                <span className="tl-connector"></span>
                <div className="tl-card">
                  <div className="tl-date">
                    <span>{e.date}</span>
                    {e.status === "current" && (
                      <span className="tl-date-status">CURRENT</span>
                    )}
                  </div>
                  <h3 className="tl-role">{e.role}</h3>
                  <div className="tl-org">{e.org}</div>
                  <p className="tl-desc">{e.desc}</p>
                  <div className="tl-stack">
                    {e.stack.map((s, j) => (
                      <span key={j}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="side-stack">
            <div className="side-card">
              <div className="side-head">EDUCATION</div>
              {education.map((r, i) => (
                <div key={i} className="side-row">
                  <div className="side-row-top">
                    <span className="side-row-title">{r.title}</span>
                    <span className="side-row-meta">{r.meta}</span>
                  </div>
                  <div className="side-row-sub">{r.sub}</div>
                </div>
              ))}
            </div>
            <div className="side-card">
              <div className="side-head">CERTIFICATIONS</div>
              {certs.map((r, i) => (
                <div key={i} className="side-row">
                  <div className="side-row-top">
                    <span className="side-row-title">{r.title}</span>
                    <span className="side-row-meta">{r.meta}</span>
                  </div>
                  <div className="side-row-sub">{r.sub}</div>
                </div>
              ))}
            </div>
            <div className="side-card">
              <div className="side-head">LANGUAGES</div>
              {langs.map((l, i) => (
                <div key={i} className="side-row">
                  <div className="side-row-top">
                    <span className="side-row-title">{l.name}</span>
                    <span className="side-row-meta">{l.level}%</span>
                  </div>
                  <div className="side-bar">
                    <div className="side-bar-fill" style={{ width: l.level + "%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
