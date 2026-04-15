import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statystyki: Najlepsi polscy piosenkopisarze",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/music/lists/best-polish-songwriters-stats",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
