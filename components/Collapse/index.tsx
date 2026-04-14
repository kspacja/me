"use client";

import { useState, useRef, useEffect, use } from "react";
import "./Collapse.css";

const COLLAPSED_HEIGHT_PX = 64; // ~4em at 16px base

export default function Collapse({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [needsCollapse, setNeedsCollapse] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const overflows = el.scrollHeight > el.clientHeight;
    setNeedsCollapse(overflows);
    setContentHeight(el.scrollHeight);

    if (!overflows) setExpanded(true);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (expanded) {
      setContentHeight(el.scrollHeight);  
    }

  }, [expanded])

  return (
    <div className="collapse">
      <div
        ref={contentRef}
        className={`collapse__content${expanded ? " collapse__content--expanded" : ""}`}
        style={{ maxHeight: expanded ? `${contentHeight}px` : `${COLLAPSED_HEIGHT_PX}px` }}
      >
        {children}
      </div>
      {needsCollapse && !expanded && <div className="collapse__fade" />}
      {needsCollapse && (
        <button
          className="collapse__toggle"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          {expanded ? "Zwiń ↑" : "Czytaj więcej ↓"}
        </button>
      )}
    </div>
  );
}
