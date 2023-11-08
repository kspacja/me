"use client";

import { useState } from "react";
import useInView from "common/useInView";

export default function YouTube({
  title,
  subtitle,
  src,
}: {
  title: string;
  subtitle?: string;
  src: string;
}) {
  const [iframeSrc, setSrc] = useState<undefined | string>();

  const { containerRef, visible } = useInView();

  if (visible && !iframeSrc) {
    console.log("visible");
    setSrc(src);
  }

  return (
    <>
      <br />
      <h4>{title}</h4>
      {subtitle && <h5>{subtitle}</h5>}
      <div ref={containerRef}>
        <iframe
          width="560"
          height="215"
          style={{ maxWidth: "100%" }}
          src={iframeSrc}
          frameBorder="0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <br />
      <br />
    </>
  );
}
