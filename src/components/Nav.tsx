import { useEffect, useRef, useState } from "react";

type Props = {
  active: string;
};

const items = ["home", "trophies", "about", "experience", "projects", "skills", "terminal", "contact"];

export function Nav({ active }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    const el = navRef.current.querySelector(`[data-link="${active}"]`) as HTMLElement | null;
    if (el) {
      setIndicator({ left: el.offsetLeft + 14, width: el.offsetWidth - 28 });
    }
  }, [active]);

  useEffect(() => {
    setMobileOpen(false);
  }, [active]);

  const go = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    }
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-dot"></span>
          <span>achux21</span>
          <span className="brand-meta">// portfolio</span>
        </div>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <div className={`nav-mobile${mobileOpen ? " open" : ""}`}>
          {items.map((it) => (
            <a
              key={it}
              data-link={it}
              className={"nav-link " + (active === it ? "active" : "")}
              onClick={(e) => {
                e.preventDefault();
                go(it);
              }}
              href={"#" + it}
            >
              {it}
            </a>
          ))}
        </div>

        <div className="nav-links" ref={navRef}>
          {items.map((it) => (
            <a
              key={it}
              data-link={it}
              className={"nav-link " + (active === it ? "active" : "")}
              onClick={(e) => {
                e.preventDefault();
                go(it);
              }}
              href={"#" + it}
            >
              {it}
            </a>
          ))}
          <div
            className="nav-indicator"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>
      </div>
    </nav>
  );
}
