export default function H({
  level,
  children,
  id = typeof children === "string"
    ? children
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[!#%$&*]/g, "")
        .toLowerCase()
    : undefined,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
}) {
  const HComp = `h${level}` as const;
  return (
    <a href={`#${id}`} className="hash-link">
      <HComp id={id}>{children}</HComp>
    </a>
  );
}
