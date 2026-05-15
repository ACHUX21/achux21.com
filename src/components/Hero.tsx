import { useEffect, useMemo, useRef, useState, forwardRef } from "react";
import { portfolio } from "@/content/portfolio";

/* ── ASCII art name ── */
const ASCII_NAME = String.raw`
 █████   ██████ ██   ██ ██████   █████  ███████
██   ██ ██      ██   ██ ██   ██ ██   ██ ██     
███████ ██      ███████ ██████  ███████ █████  
██   ██ ██      ██   ██ ██   ██ ██   ██ ██     
██   ██  ██████ ██   ██ ██   ██ ██   ██ ██     
`.trim();

const SCRAMBLE = "01アイウエカキクサスト#%@&!?ヲンXVMRZ/\\|";

/* ── SCAN variant ── */
function HeroScan({ name, isSans }: { name: string; isSans: boolean }) {
  return (
    <h1 className={"hero-name " + (isSans ? "is-sans" : "")}>
      <span className="v-scan">{name}</span>
    </h1>
  );
}

/* ── MASK variant ── */
function HeroMask({ name, isSans }: { name: string; isSans: boolean }) {
  const chars = useMemo(() => name.split(""), [name]);
  return (
    <h1 className={"hero-name v-mask " + (isSans ? "is-sans" : "")}>
      {chars.map((ch, i) => (
        <span key={i} className="letter">
          <span style={{ animationDelay: `${i * 0.04}s` }}>
            {ch === " " ? "\u00a0" : ch}
          </span>
        </span>
      ))}
    </h1>
  );
}

/* ── GLITCH variant ── */
function HeroGlitch({ name, isSans }: { name: string; isSans: boolean }) {
  const [display, setDisplay] = useState(name);
  const lockRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let stopped = false;
    const total = 40;

    const tick = () => {
      if (stopped) return;
      const revealed = Math.floor((frame / total) * name.length);
      const out = name
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        })
        .join("");
      setDisplay(out);
      frame++;
      if (frame > total + 4) {
        setDisplay(name);
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();

    const interval = setInterval(() => {
      let pulses = 0;
      const pulse = () => {
        if (pulses >= 4) {
          setDisplay(name);
          return;
        }
        const out = name
          .split("")
          .map((ch) => {
            if (ch === " ") return " ";
            if (Math.random() < 0.18) return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
            return ch;
          })
          .join("");
        setDisplay(out);
        pulses++;
        setTimeout(pulse, 70);
      };
      pulse();
    }, 5200);

    return () => {
      stopped = true;
      clearInterval(interval);
    };
  }, [name]);

  return (
    <h1 className={"hero-name " + (isSans ? "is-sans" : "")}>
      <span className="v-glitch" data-text={display}>
        <span className="glitch-layer">{display}</span>
      </span>
    </h1>
  );
}

/* ── ASCII variant ── */
function HeroAscii() {
  return (
    <div className="v-ascii">
      <pre>{ASCII_NAME}</pre>
      <div className="ascii-name">ACHRAF OUAZZANI CHAHIDI</div>
    </div>
  );
}

/* ── STENCIL variant ── */
function HeroStencil() {
  return (
    <h1 className="hero-name" style={{ fontSize: "clamp(48px, 11vw, 156px)" }}>
      <div className="v-stencil">
        <div className="v-stencil-row">
          <span className="v-stencil-fill">ACHRAF</span>
          <span className="v-stencil-meta">/ 01</span>
        </div>
        <div className="v-stencil-row">
          <span className="v-stencil-outline">OUAZZANI</span>
        </div>
        <div className="v-stencil-row">
          <span className="v-stencil-fill">CHAHIDI</span>
          <span className="v-stencil-meta">∎ AI · SEC</span>
        </div>
      </div>
    </h1>
  );
}

/* ── BOOT variant ── */
function HeroBoot() {
  const lines: ({ type: "cmd"; text: string } | { type: "out"; k: string; v: string })[] = [
    { type: "cmd", text: "cat ~/.identity" },
    { type: "out", k: "name", v: "Achraf Ouazzani Chahidi" },
    { type: "out", k: "alias", v: "achux21" },
    { type: "out", k: "role", v: "AI Security · offensive research" },
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    setShown(0);
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= lines.length) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 280);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="v-boot">
      {lines.slice(0, shown).map((ln, i) =>
        ln.type === "cmd" ? (
          <div key={i} className="v-boot-cmd">
            <span className="prompt">~/portfolio ❯</span>
            {ln.text}
          </div>
        ) : (
          <div key={i} className="v-boot-out">
            <span className="k">{ln.k.padEnd(7, " ")}</span>
            <span className="dim">: </span>
            <span className="v">{ln.v}</span>
          </div>
        ),
      )}
      {shown >= lines.length && (
        <div className="v-boot-name">
          <span className="l1">ACHRAF OUAZZANI</span>
          <span className="l2">
            CHAHIDI<span className="hero-cursor" style={{ marginLeft: 18, verticalAlign: 4, width: "0.5em", height: "0.8em" }}></span>
          </span>
        </div>
      )}
    </div>
  );
}

/* ── STATUS line (typewriter) ── */
function HeroStatus({ lines }: { lines: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("type");

  useEffect(() => {
    const full = lines[idx];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      if (text.length < full.length) {
        t = setTimeout(() => setText(full.slice(0, text.length + 1)), 32);
      } else {
        t = setTimeout(() => setPhase("hold"), 2200);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("erase"), 600);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 18);
      } else {
        setIdx((idx + 1) % lines.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx, lines]);

  return (
    <div className="hero-status">
      <span className="hero-status-prompt">[STATUS]</span>
      <span className="hero-status-text">$ {text}</span>
      <span className="hero-cursor"></span>
    </div>
  );
}

/* ── PARTICLES ── */
function HeroParticles() {
  const particles = useMemo(() => {
    const glyphs = ["01", "11", "fd", "a3", "7e", "cc", "$_", "0x", "∎", "◇", "·", "⌬", "⎔", "∆", "⌗"];
    return Array.from({ length: 22 }, () => ({
      ch: glyphs[Math.floor(Math.random() * glyphs.length)],
      left: Math.random() * 100,
      delay: Math.random() * 20,
      dur: 14 + Math.random() * 14,
      size: 9 + Math.random() * 5,
      opacity: 0.4 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left + "%",
            "--delay": p.delay + "s",
            "--dur": p.dur + "s",
            fontSize: p.size + "px",
            opacity: p.opacity,
          } as React.CSSProperties}
        >
          {p.ch}
        </span>
      ))}
    </div>
  );
}

/* ── TELEMETRY ── */
function HeroTelemetry() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, []);
  const lat = (48.8534 + Math.sin(tick * 0.7) * 0.0008).toFixed(4);
  const lon = (2.3488 + Math.cos(tick * 0.5) * 0.0008).toFixed(4);
  const cpu = (28 + ((tick * 7) % 23)).toString().padStart(2, "0");
  const rtt = (10 + ((tick * 3) % 8)).toString().padStart(2, "0");

  return (
    <div className="hero-telemetry" aria-hidden="true">
      <div className="tele-item">
        <span className="tele-key">// node</span>
        <span className="tele-val">
          achux21<span className="dim">@local</span>
        </span>
      </div>
      <div className="tele-item">
        <span className="tele-key">// geo</span>
        <span className="tele-val">
          {lat}°N · {lon}°E
        </span>
      </div>
      <div className="tele-item">
        <span className="tele-key">// cpu</span>
        <span className="tele-val">
          {cpu}<span className="dim">%</span>
        </span>
      </div>
      <div className="tele-item">
        <span className="tele-key">// rtt</span>
        <span className="tele-val">
          {rtt}<span className="dim">ms</span>
        </span>
      </div>
      <div className="tele-item">
        <span className="tele-key">// status</span>
        <span className="tele-val">
          <span className="ok">●</span> NOMINAL
        </span>
      </div>
    </div>
  );
}

/* ── CHARACTER STAGE ── */
const CharacterStage = forwardRef<HTMLDivElement>(function CharacterStage(_, ref) {
  return (
    <div className="char-stage" ref={ref} aria-hidden="true">
      <div className="char-stage-inner">
        <div className="char-floor-grid"></div>
        <div className="char-floor"></div>
        <div className="char-halo"></div>

        <svg className="tethers" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="tether" d="M 50,22 C 45,18 40,16 36,13" />
          <path className="tether-core" d="M 50,22 C 45,18 40,16 36,13" />
          <circle className="tether-node" cx="50" cy="22" r="0.55" />
          <circle className="tether-node" cx="36" cy="13" r="0.55" />
          <path className="tether" d="M 60,33 C 68,28 75,24 80,21" />
          <path className="tether-core" d="M 60,33 C 68,28 75,24 80,21" />
          <circle className="tether-node" cx="60" cy="33" r="0.55" />
          <circle className="tether-node" cx="80" cy="21" r="0.55" />
          <path className="tether" d="M 36,48 C 32,50 28,53 24,56" />
          <path className="tether-core" d="M 36,48 C 32,50 28,53 24,56" />
          <circle className="tether-node" cx="36" cy="48" r="0.55" />
          <circle className="tether-node" cx="24" cy="56" r="0.55" />
          <path className="tether" d="M 62,55 C 68,60 72,68 74,76" />
          <path className="tether-core" d="M 62,55 C 68,60 72,68 74,76" />
          <circle className="tether-node" cx="62" cy="55" r="0.55" />
          <circle className="tether-node" cx="74" cy="76" r="0.55" />
          <circle className="tether-pulse" r="0.6">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 50,22 C 45,18 40,16 36,13" />
          </circle>
          <circle className="tether-pulse" r="0.6">
            <animateMotion dur="1.8s" begin="0.3s" repeatCount="indefinite" path="M 60,33 C 68,28 75,24 80,21" />
          </circle>
          <circle className="tether-pulse" r="0.6">
            <animateMotion dur="1.7s" begin="0.6s" repeatCount="indefinite" path="M 36,48 C 32,50 28,53 24,56" />
          </circle>
          <circle className="tether-pulse" r="0.6">
            <animateMotion dur="2.0s" begin="0.1s" repeatCount="indefinite" path="M 62,55 C 68,60 72,68 74,76" />
          </circle>
        </svg>

        <img
          className="char-img"
          src="/assets/character-sm.png"
          alt=""
          loading="eager"
          draggable={false}
        />

        <div className="char-scanline"></div>

        <div className="char-reticle">
          <i></i>
          <i></i>
          <span className="char-reticle-label">SUBJECT // 0xACHUX21 · TRACKING</span>
        </div>

        <div className="holo holo-1">
          <div className="holo-head">SYS / TELEMETRY</div>
          <div className="holo-row"><span>cpu</span><b>34%</b></div>
          <div className="holo-row"><span>mem</span><b>7.2G</b></div>
          <div className="holo-bar"><div className="holo-bar-fill" style={{ width: "34%" }}></div></div>
        </div>
        <div className="holo holo-2">
          <div className="holo-head">ID / 0xACHUX21</div>
          <div className="holo-row"><span>role</span><b>RESEARCHER</b></div>
          <div className="holo-row"><span>clearance</span><b>L-04</b></div>
          <div className="holo-row"><span>token</span><b>·····f1eaf9</b></div>
        </div>
        <div className="holo holo-3">
          <div className="holo-head">PAYLOAD</div>
          <div className="holo-mini-code"><span className="k">scan</span> <span className="s">target.wheel</span></div>
          <div className="holo-mini-code"><span className="k">→</span> 0 flagged</div>
          <div className="holo-bar"><div className="holo-bar-fill" style={{ width: "78%" }}></div></div>
        </div>
        <div className="holo holo-4">
          <div className="holo-head">NET / LINK</div>
          <div className="holo-row"><span>peer</span><b>tor:01</b></div>
          <div className="holo-row"><span>rtt</span><b>14ms</b></div>
          <div className="holo-row"><span>↑↓</span><b>secure</b></div>
        </div>
      </div>
    </div>
  );
});

/* ── MAIN HERO ── */
export function Hero() {
  const { identity, projects } = portfolio;
  const stageRef = useRef<HTMLDivElement>(null);

  // Mouse parallax removed — performance

  const primaryProject = projects[0];

  return (
    <section id="home" className="hero">
      <HeroParticles />
      <CharacterStage ref={stageRef} />
      <div className="hero-inner">
        <div className="hero-content">
          <HeroTelemetry />
          <div className="hero-meta">
            <div className="hero-meta-row">
              <svg width="10" height="10" viewBox="0 0 10 10">
                <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" />
              </svg>
              <span>{identity.title}</span>
            </div>
            <div className="hero-meta-row">
              <span>// </span>
              <span>{identity.location}</span>
            </div>
            <div className="hero-meta-row">
              <span>// </span>
              <span>
                active · <b>open to intern · 2026</b>
              </span>
            </div>
            <div className="hero-meta-row" style={{ marginLeft: "auto" }}>
              <span>v.07.2026</span>
            </div>
          </div>

          <div className="hero-name-wrap">
            <HeroScan name={identity.fullName} isSans={false} />
          </div>

          <HeroStatus lines={identity.statusLines} />

          <div className="hero-tags">
            <span className="tag accent">offensive sec</span>
            <span className="tag">supply-chain</span>
            <span className="tag">fuzzing</span>
            <span className="tag">python · c</span>
            <span className="tag">CTF</span>
            <span className="tag">eBPF</span>
          </div>

          <div className="hero-bottom">
            <div className="hero-coords">
              <div>
                LAT <b>38.91°N</b> · LON <b>121.62°E</b>
              </div>
              <div>
                SYS <b>achux21.com</b> · UPTIME <b>03y · 240d</b>
              </div>
            </div>
            <div className="scroll-hint">
              <span>scroll</span>
              <span className="scroll-hint-line"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
