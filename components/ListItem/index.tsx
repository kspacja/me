import styles from "./styles.module.css";

export default function ListItem({
  Component = "li",
  title,
  subtitle,
  text,
  children,
  className,
}: {
  Component?: React.ElementType;
  title: string;
  subtitle?: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Component className={className}>
      <div className={`${styles.container} list-item`}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {text && <div className={styles.text}>{text}</div>}
        {children}
      </div>
    </Component>
  );
}
