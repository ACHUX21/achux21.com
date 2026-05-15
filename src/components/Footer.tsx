export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <b>achux21.com</b> · v.07.2026 · built in vite + react · deployed via GHA
        </div>
        <div>
          [{" "}
          <span style={{ color: "var(--accent)" }}>●</span>{" "}]
          all systems nominal
        </div>
      </div>
    </footer>
  );
}
