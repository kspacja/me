import styles from "./Columns.module.css";

export function LeftColumn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`${styles.leftColumn}${className ? ` ${className}` : ""}`}>
      {children}
    </section>
  );
}

export function RightColumn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`${styles.rightColumn}${className ? ` ${className}` : ""}`}>
      {children}
    </section>
  );
}
