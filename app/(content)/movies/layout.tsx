import { Metadata } from "next";
import PassThrough from "components/PassThrough";

export const metadata: Metadata = {
  title: {
    default: "movies stuff",
    template: "%s | movies stuff | Krzysztof Ciach",
  },
};

export default PassThrough;
