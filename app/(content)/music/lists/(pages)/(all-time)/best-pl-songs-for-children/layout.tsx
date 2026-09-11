import PassThrough from "components/PassThrough";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Najlepsze polskie piosenki dla dzieci",
  description:
    "Lista moich ulubionych polskich piosenek dla dzieci.",
  keywords: [
    "polska",
    "piosenki dla dzieci",
    "piosenkopisarze",
    "piosenkarki",
    "songwriters",
    "polska piosenka",
    "piosenki",
  ],
  openGraph: {
    siteName: "Krzysztof Ciach - Resume page",
    type: "website",
    title: "Najlepsze polskie piosenki dla dzieci",
  },
  alternates: {
    canonical: "/music/lists/best-pl-songs-for-children",
  },
};

export default PassThrough;
