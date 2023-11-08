"use client";

import { useEffect, useRef, useState } from "react";
import { Bar } from "./styles";

export default function BarLine({ level }: { level: number }) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (container) {
              observer.unobserve(container);
            }
          }
        });
      },
      { threshold: 1 }
    );

    if (container) {
      setTimeout(() => {
        observer.observe(container);
      }, 200);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return <Bar ref={containerRef} visible={visible.toString()} level={level} />;
}
