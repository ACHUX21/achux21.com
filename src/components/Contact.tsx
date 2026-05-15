import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "@/components/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

export function Contact() {
  const { contact } = portfolio;
  const ref = useReveal();

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader num="// 08" title="CONTACT" />
        <div className="contact-grid reveal" ref={ref}>
          <div className="contact-block">
            <div className="contact-eyebrow">/ get in touch</div>
            <h3 className="contact-title">
              Open to talk
              <br />
              security / research / roles.
            </h3>
            <p className="contact-desc">
              I read every email. If you're hiring for security, appsec, or
              offensive work — I'd love to hear about it. CTF challenges, paper
              drafts, and "is this exploitable?" questions also welcome.
            </p>
            <div className="contact-cta-row">
              <a className="btn primary" href={`mailto:${portfolio.identity.email}`}>
                {portfolio.identity.email}
                <svg viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6h8M6 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
              <a className="btn" href={portfolio.about.profile.Github ? "https://github.com/ACHUX21" : "#"}>
                github
              </a>
              <a className="btn" href="https://www.linkedin.com/in/achux21">
                linkedin
              </a>
            </div>
          </div>
          <div className="contact-block">
            <div className="contact-eyebrow">/ channels</div>
            <div className="contact-meta">
              {Object.entries(contact.meta).map(([k, v]) => (
                <div key={k} className="contact-meta-row">
                  <span className="contact-meta-key">{k}</span>
                  <span className="contact-meta-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
