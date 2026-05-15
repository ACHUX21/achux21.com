import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useInView } from "@/hooks/useReveal";

const TERMINAL_LINES = [
  { t: "cmd" as const, text: "boot --portfolio achux21" },
  { t: "out" as const, html: '<span class="ok">●</span> initializing shell ...... <span class="ok">[ok]</span>' },
  { t: "out" as const, html: '<span class="ok">●</span> loading identity ......... <span class="ok">[ok]</span>' },
  { t: "out" as const, html: '<span class="ok">●</span> mounting projects/ ....... <span class="ok">[ok]</span>' },
  { t: "spacer" as const },
  { t: "cmd" as const, text: "cat recent-activity.log" },
  { t: "out" as const, html: '<span class="trophy"><span class="b">CTF · MCSCv12 2025</span> <span class="accent">1st place</span> <span class="dim">— team L3ak</span></span>' },
  { t: "out" as const, html: '<span class="trophy"><span class="b">CTF · IDEHv6 2025</span> <span class="accent">1st place</span> <span class="dim">— solo</span></span>' },
  { t: "out" as const, html: '<span class="trophy"><span class="b">CTF · AISEC 2025</span> <span class="accent">1st place</span> <span class="dim">— solo</span></span>' },
  { t: "out" as const, html: '<span class="trophy"><span class="b">CTF · Cyber Odyssey 2024</span> <span class="accent">2nd place</span> <span class="dim">— team</span></span>' },
  { t: "spacer" as const },
  { t: "cmd" as const, text: "git log --since=4w --shortstat" },
  { t: "out" as const, html: '<span class="label">packguard</span>     <span class="b">+1,204</span> <span class="dim">— heuristics v2</span>' },
  { t: "out" as const, html: '<span class="label">smuggling-detect</span> <span class="b">+ 678</span> <span class="dim">— improved coverage</span>' },
  { t: "spacer" as const },
  { t: "cmd" as const, text: "uptime && hire-me --status" },
  { t: "out" as const, html: '<span class="ok">✓</span> uptime <span class="b">3y 240d</span> · last deploy <span class="dim">recent</span>' },
  { t: "out" as const, html: '<span class="ok">✓</span> internships <span class="accent">OPEN · Summer 2026</span> — ping <span class="b">21@achux21.com</span>' },
];

export function Terminal() {
  const [shown, setShown] = useState(0);
  const [ref, inView] = useInView(0.2, 900);

  useEffect(() => {
    if (!inView || shown !== 0) return;
    let cancelled = false;
    let i = 0;
    const next = () => {
      if (cancelled) return;
      i++;
      setShown(i);
      if (i < TERMINAL_LINES.length) {
        const ln = TERMINAL_LINES[i];
        setTimeout(next, ln && ln.t === "cmd" ? 380 : 140);
      }
    };
    next();
    return () => {
      cancelled = true;
    };
  }, [inView, shown]);

  return (
    <section id="terminal" className="section">
      <div className="container">
        <SectionHeader
          num="// 07"
          title="LIVE FEED"
          desc="Auto-running on this page. Pulls from the same data source as my CV."
        />
        <div className="terminal" ref={ref}>
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="terminal-path">
              achux21@<b>portfolio</b>:~/feed
            </div>
            <div className="terminal-stat">● connected · tty/0</div>
          </div>
          <div className="terminal-body">
            {TERMINAL_LINES.slice(0, shown).map((ln, i) => {
              if (ln.t === "spacer") return <div key={i} className="term-spacer"></div>;
              if (ln.t === "cmd") {
                return (
                  <div key={i} className="term-line">
                    <span className="term-prompt">achux21 ❯</span>
                    <span className="term-cmd">{ln.text}</span>
                  </div>
                );
              }
              return (
                <div key={i} className="term-line term-out" dangerouslySetInnerHTML={{ __html: ln.html }} />
              );
            })}
            {shown >= TERMINAL_LINES.length && (
              <div className="term-line">
                <span className="term-prompt">achux21 ❯</span>
                <span className="term-cursor"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
