import styles from "./styles.module.css";

export default function InlineListItem({
  Component = "li",
  label,
  children,
}: {
  Component?: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Component>
      <span className={styles.label}>{label}:</span> {children}
    </Component>
  );
}
