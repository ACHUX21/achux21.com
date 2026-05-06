import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/content/portfolio";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
  returnFocusTarget: HTMLElement | null;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function ProjectModal({ project, onClose, returnFocusTarget }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    first?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusableElements.length) return;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      returnFocusTarget?.focus();
    };
  }, [onClose, returnFocusTarget]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className="fixed inset-0 z-60 grid place-items-center bg-[rgba(6,4,10,0.82)] p-4 backdrop-blur-[10px]"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClose}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        aria-labelledby="project-modal-title"
        aria-modal="true"
        className="panel max-h-[min(84vh,860px)] w-full max-w-2xl overflow-auto rounded-[28px] p-6"
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[0.74rem] uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
              {project.status}
            </p>
            <h3 className="mt-0 text-xl font-medium" id="project-modal-title">
              {project.title}
            </h3>
            <p className="text-[var(--color-accent)]">{project.summary}</p>
          </div>
          <button
            aria-label="Close project details"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-[rgba(14,8,22,0.84)] text-[var(--color-text)] transition hover:border-[var(--color-line-strong)]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <div>
            <span className="block text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-text-dim)]">
              Domain
            </span>
            <strong className="mt-1 block text-[var(--color-text)]">{project.domain}</strong>
          </div>
          <div>
            <span className="block text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-text-dim)]">
              Outcome
            </span>
            <strong className="mt-1 block text-[var(--color-text)]">{project.outcome}</strong>
          </div>
        </div>

        <p className="text-[var(--color-text-dim)] leading-relaxed">{project.description}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 mt-0 font-medium">Highlights</h4>
            <ul className="m-0 space-y-1 pl-4 text-[var(--color-text-dim)] leading-relaxed">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 mt-0 font-medium">Stack</h4>
            <div className="flex flex-wrap gap-2.5">
              {project.stack.map((item) => (
                <span
                  className="inline-block rounded-full border border-[rgba(181,145,255,0.12)] bg-[rgba(20,11,31,0.88)] px-3 py-1.5 text-[0.82rem] text-[var(--color-accent-soft)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-soft)]"
              href={link.url}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
