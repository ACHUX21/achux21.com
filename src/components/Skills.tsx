import { useEffect, useState } from "react";
import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "@/components/SectionHeader";
import { useInView } from "@/hooks/useReveal";

function SkillBar({ level, started, delay }: { level: number; started: boolean; delay: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!started) return;
    const id = setTimeout(() => setW(level), delay);
    return () => clearTimeout(id);
  }, [started, level, delay]);
  return (
    <div className="skill-bar">
      <div className="skill-bar-fill" style={{ width: w + "%" }} />
    </div>
  );
}

function levelLabel(n: number) {
  if (n >= 85) return "EXPERT";
  if (n >= 70) return "ADVANCED";
  if (n >= 50) return "INTERMEDIATE";
  return "EXPLORING";
}

export function Skills() {
  const { skills } = portfolio;
  const [ref, started] = useInView(0.15, 700);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          num="// 06"
          title="SKILLS"
          desc="What I reach for. Bars are vibes-based — not benchmarks."
        />
        <div className="skills-grid reveal-stagger reveal in" ref={ref}>
          {skills.map((cat, i) => (
            <div key={i} className="skill-cat">
              <div className="skill-cat-head">
                <span className="skill-cat-icon">{cat.icon}</span>
                {cat.head}
              </div>
              <div className="skill-cat-title">{cat.title}</div>
              {cat.items.map((s, j) => (
                <div key={j} className="skill-row">
                  <div className="skill-row-top">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-level">{levelLabel(s.level)}</span>
                  </div>
                  <SkillBar level={s.level} started={started} delay={j * 80} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
