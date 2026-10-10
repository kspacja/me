import Link from "next/link";

export default function HomeLink() {
  return (
    <Link href="/">
      <h2 className="mb-0">Krzysztof Ciach&apos;s</h2>
      <h4 className="super-accent">personal website</h4>
    </Link>
  );
}
