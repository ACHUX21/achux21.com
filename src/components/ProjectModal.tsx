import { useEffect, useRef } from "react";
import type { Project } from "../content/portfolio";

type ProjectModalProps = {
  project: Project | null;
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

export function ProjectModal({
  project,
  onClose,
  returnFocusTarget,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || !dialogRef.current) {
      return undefined;
    }

    const dialog = dialogRef.current;
    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelector),
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusableElements.length) {
        return;
      }

      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      } else if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      returnFocusTarget?.focus();
    };
  }, [onClose, project, returnFocusTarget]);

  if (!project) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        aria-labelledby="project-modal-title"
        aria-modal="true"
        className="project-modal"
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <div className="project-modal__header">
          <div>
            <p className="project-card__status">{project.status}</p>
            <h3 id="project-modal-title">{project.title}</h3>
            <p className="project-modal__summary">{project.summary}</p>
          </div>
          <button
            aria-label="Close project details"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="project-modal__facts">
          <div>
            <span>Domain</span>
            <strong>{project.domain}</strong>
          </div>
          <div>
            <span>Outcome</span>
            <strong>{project.outcome}</strong>
          </div>
        </div>
        <p>{project.description}</p>
        <div className="project-modal__grid">
          <div>
            <h4>Highlights</h4>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Stack</h4>
            <div className="tag-row">
              {project.stack.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="project-modal__links">
          {project.links.map((link) => (
            <a href={link.url} key={link.label} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
