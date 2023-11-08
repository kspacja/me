"use client";

import useInView from "common/useInView";
import { Bar } from "./styles";

export default function BarLine({ level }: { level: number }) {
  const { containerRef, visible } = useInView();

  return <Bar ref={containerRef} visible={visible.toString()} level={level} />;
}
