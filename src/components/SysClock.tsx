import { useEffect, useState } from "react";

export function SysClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const utc = now.toISOString().substring(11, 19);
  return (
    <div className="sys-clock" aria-hidden="true">
      <span className="sys-clock-dot"></span>
      <span>
        UTC <b>{utc}</b> · sys.uptime <b>3y 240d</b>
      </span>
    </div>
  );
}
