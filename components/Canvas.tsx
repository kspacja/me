import styles from "./Canvas.module.css";

export function Canvas({ children }: { children: React.ReactNode }) {
  return <div className={styles.canvas}>{children}</div>;
}

export function CanvasWrapper({ children }: { children: React.ReactNode }) {
  return <div className={styles.canvasWrapper}>{children}</div>;
}
