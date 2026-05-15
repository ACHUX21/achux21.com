type Props = {
  num: string;
  title: string;
  desc?: string;
};

export function SectionHeader({ num, title, desc }: Props) {
  return (
    <>
      <div className="section-head">
        <span className="section-num">{num}</span>
        <h2 className="section-title">{title}</h2>
        <span className="section-rule"></span>
      </div>
      {desc && <p className="section-desc">{desc}</p>}
    </>
  );
}
