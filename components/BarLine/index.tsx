"use client";

import useInView from "common/useInView";
import styles from "./styles.module.css";

export default function BarLine({ level }: { level: number }) {
  const { containerRef, visible } = useInView();
  const barWidth = visible ? `${((level + 1) / 5) * 100}%` : "0%";

  return (
    <div
      ref={containerRef}
      className={styles.bar}
      style={{ "--bar-width": barWidth } as React.CSSProperties}
    />
  );
}
