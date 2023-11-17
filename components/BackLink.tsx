"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function BackLink({ parentHref }: { parentHref: string }) {
  const segments = useSelectedLayoutSegments();

  const parentSegments = segments.slice(0, -1);

  const backUrl = `${parentHref}/${parentSegments.join("/")}`;

  return <Link href={backUrl}>&lt; back</Link>;
}
