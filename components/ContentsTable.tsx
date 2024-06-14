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

        const parent = el.parentElement!;

        el.style.width = `${parent.clientWidth}px`;
      },
      { threshold: 0 }
    );

    const handleScroll = () => {
      const parent = el.parentElement!;
      const parentBottom = parent.getBoundingClientRect().bottom;

      if (parentBottom < 0) {
        el.style.top = `0px`;
      } else {
        el.style.top = `${parentBottom}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    observer.observe(el);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={elRef} className="contents">
      {children}
    </div>
  );
}
