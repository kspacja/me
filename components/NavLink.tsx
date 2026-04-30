import Link from "next/link";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {" → "}
      <Link href={href}>go</Link>
    </div>
  );
}
