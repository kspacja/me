import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statystyki: Najlepsi polscy piosenkopisarze",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
