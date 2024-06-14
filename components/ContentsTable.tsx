"use client";

import { useEffect, useRef } from "react";

export default function ContentsTable({
  children,
}: {
  children: React.ReactNode;
}) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // make it sticky regard to the viewport
    const el = elRef.current;
    const isMobile = window.innerWidth < 950;

    if (!el || isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.position = entry.isIntersecting ? "fixed" : "static";
        // keep the same width as the parent minus the padding

        el.style.width = `${el.parentElement!.clientWidth}px`;
      },
      { threshold: 0 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elRef} className="contents">
      {children}
    </div>
  );
}
