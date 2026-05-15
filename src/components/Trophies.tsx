import { portfolio } from "@/content/portfolio";
import { useInView, useCountUp } from "@/hooks/useReveal";

function Trophy({
  rank,
  count,
  suffix,
  label,
  sub,
  started,
}: {
  rank: string;
  count: string;
  suffix: string;
  label: string;
  sub: string;
  started: boolean;
}) {
  const animated = useCountUp(count, 1400, started);
  return (
    <div className="trophy">
      <div className="trophy-rank">
        <span className="trophy-rank-dot"></span>
        {rank}
      </div>
      <div className="trophy-count tabular">
        {animated}
        {suffix && <sup>{suffix}</sup>}
      </div>
      <div className="trophy-label">{label}</div>
      <div className="trophy-sub">{sub}</div>
    </div>
  );
}

export function Trophies() {
  const { trophies } = portfolio;
  const [ref, started] = useInView(0.3, 600);

  return (
    <div
      id="trophies"
      className="container"
      ref={ref}
      style={{ position: "relative", zIndex: 3 }}
    >
      <div className="trophy-row reveal-stagger in">
        {trophies.map((t, i) => (
          <Trophy key={i} {...t} started={started} />
        ))}
      </div>
    </div>
  );
}
