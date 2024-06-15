import { ImageResponse } from "@vercel/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt =
  "How to reuse groups of fields / fieldsets of a complex form in React with TypeScript and react-hook-form.";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const font = fetch(
    "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1O4a0EwItq6fNIg.woff2"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {alt}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Outfit",
          data: await font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
