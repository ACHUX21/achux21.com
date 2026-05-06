import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = { id: string; label: string };

type NavProps = {
  items: NavItem[];
  activeSection: string;
  brand: string;
};

const mobileMenuVariants = {
  closed: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

const itemVariants = {
  closed: { opacity: 0, x: -10 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.2 },
  }),
};

export function Nav({ items, activeSection, brand }: NavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activeSection]);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-[rgba(181,145,255,0.08)] bg-gradient-to-b from-[rgba(8,5,12,0.94)] to-[rgba(8,5,12,0.45)] px-[clamp(1rem,3vw,2.5rem)] py-4 backdrop-blur-[16px]">
      <a
        className="max-w-[min(62vw,24rem)] overflow-hidden text-ellipsis text-[0.82rem] uppercase tracking-[0.24em] text-[var(--color-accent-soft)] no-underline"
        href="#hero"
      >
        {brand}
      </a>

      {/* Mobile toggle */}
      <button
        aria-controls="primary-navigation"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="hidden h-12 w-12 items-center justify-center rounded-full border border-[var(--color-line)] bg-[rgba(7,10,16,0.82)] text-[var(--color-text)] max-md:inline-flex"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span className="block h-px w-4 bg-current my-[0.28rem]" />
        <span className="block h-px w-4 bg-current my-[0.28rem]" />
      </button>

      {/* Desktop nav */}
      <nav className="flex items-center gap-4 max-md:hidden">
        {items.map((item) => (
          <a
            aria-current={activeSection === item.id ? "page" : undefined}
            className={`text-[0.72rem] uppercase tracking-[0.14em] no-underline transition-colors duration-150 ${
              activeSection === item.id
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-text-dim)] hover:text-[var(--color-accent)]"
            }`}
            href={`#${item.id}`}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.nav
            animate="open"
            className="absolute right-4 left-4 flex-col gap-0 rounded-[20px] border border-[var(--color-line)] bg-[rgba(3,10,12,0.96)] p-2.5 md:hidden"
            exit="closed"
            id="primary-navigation"
            initial="closed"
            style={{ top: "calc(100% + 0.5rem)" }}
            variants={mobileMenuVariants}
          >
            {items.map((item, i) => (
              <motion.a
                className={`block px-2.5 py-3 text-[0.72rem] uppercase tracking-[0.14em] no-underline transition-colors ${
                  activeSection === item.id
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-dim)]"
                }`}
                custom={i}
                href={`#${item.id}`}
                key={item.id}
                variants={itemVariants}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
