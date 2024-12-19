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
      name: "Featured Mint",
      url: "https://wc-featured-mint.vercel.app/",
      iconImageUrl: `https://wc-featured-mint.vercel.app/splash.png`,
      splashImageUrl: `https://wc-featured-mint.vercel.app/splash.png`,
      splashBackgroundColor: "#ffffff",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://wc-featured-mint.vercel.app/"),
    title: "Featured Mint",
    openGraph: {
      title: "Warpcast",
      description: "Featured Mint",
      images: `https://wc-featured-mint.vercel.app/api/og`,
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
      </head>
      <body className="antialiased scrollbar-vert Text/Faint">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
