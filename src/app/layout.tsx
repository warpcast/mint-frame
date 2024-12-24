import "./globals.css";

import type { Metadata } from "next";

import { Providers } from "@/providers/Providers";

const frame = {
  version: "next",
  imageUrl: `https://wc-featured-mint.vercel.app/api/og`,
  button: {
    title: "Collect",
    action: {
      type: "launch_frame",
      name: "Mints",
      url: "https://mint.warpcast.com/",
      iconImageUrl: "https://mint.warpcast.com/app.png",
      splashImageUrl: "https://mint.warpcast.com/splash.png",
      splashBackgroundColor: "#ffffff",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://mint.warpcast.com/"),
    title: "Mints",
    openGraph: {
      title: "Warpcast",
      description: "Mints",
      images: "https://wc-featured-mint.vercel.app/api/og",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

// eslint-disable-next-line import/no-default-export
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* eslint-disable-next-line @next/next/google-font-display */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=block"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className="antialiased scrollbar-vert Text/Faint">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
