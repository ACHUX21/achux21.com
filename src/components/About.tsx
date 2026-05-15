import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "@/components/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

export function About() {
  const { about } = portfolio;
  const ref = useReveal();

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader
          num="// 03"
          title="ABOUT"
          desc="What I actually do, in case the rest of the page is too cinematic to parse."
        />
        <div className="about-grid reveal" ref={ref}>
          <div className="about-bio">
            {about.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
          <div className="panel panel-pad panel-corners profile-card">
            <div className="profile-card-header">
              <span>~/.profile</span>
              <span style={{ marginLeft: "auto", color: "var(--accent)" }}>READ-ONLY</span>
            </div>
            {Object.entries(about.profile).map(([k, v]) => (
              <div key={k} className="profile-row">
                <span className="profile-key">{k.toLowerCase()}</span>
                <span className="profile-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
