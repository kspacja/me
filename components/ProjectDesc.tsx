import styles from "./ProjectDesc.module.css";

export default function ProjectDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.projectDesc}>{children}</p>;
}
