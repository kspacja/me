import { Metadata } from "next";
import Tracker from "./tracker";

export const metadata: Metadata = {
  title: "Najlepsi polscy piosenkopisarze i pisarki",
  description:
    "Lista moich ulubionych polskich piosenkopisarzy i pisarek,",
  keywords: [
    "polska",
    "piosenkopisarze",
    "piosenkarki",
    "songwriters",
    "polska piosenka",
    "piosenki",
  ],
  openGraph: {
    siteName: "Krzysztof Ciach - Resume page",
    type: "website",
    title: "Najlepsi polscy piosenkopisarze i pisarki",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (<>
    <Tracker />
    {children}
  </>);
};
