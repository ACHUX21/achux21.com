import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type NavProps = {
  items: NavItem[];
  activeSection: string;
  brand: string;
};

export function Nav({ items, activeSection, brand }: NavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activeSection]);

  return (
    <header className="site-header">
      <a className="site-header__brand" href="#hero">
        {brand}
      </a>
      <button
        aria-controls="primary-navigation"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="site-header__toggle"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span />
        <span />
      </button>
      <nav
        className={`site-header__nav${open ? " is-open" : ""}`}
        id="primary-navigation"
      >
        {items.map((item) => (
          <a
            aria-current={activeSection === item.id ? "page" : undefined}
            className={activeSection === item.id ? "is-active" : ""}
            href={`#${item.id}`}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
