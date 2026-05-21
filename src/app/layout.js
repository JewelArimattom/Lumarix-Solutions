import "./globals.css";
import "./build.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://www.lumarix.dev"),
  title: "Lumarix Solutions | AI Automation & Premium Web Development",
  description:
    "Premium freelance web developer and AI automation architect. I build high-performance Next.js websites, custom AI workflows, and conversion systems that generate more inquiries. Book a call to get a clear plan and quote.",
  keywords: [
    "AI workflow automation",
    "freelance web developer",
    "Next.js web apps",
    "custom AI solutions",
    "premium website design",
    "AI architect",
    "SEO website design",
    "business automation software",
    "custom web applications",
    "Kerala web developer",
    "high-performance web development"
  ].join(", "),
  authors: [{ name: "Lumarix Solutions", url: "https://www.lumarix.dev" }],
  creator: "Lumarix Solutions",
  publisher: "Lumarix Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Lumarix Solutions | AI Automation & Premium Web Development",
    description:
      "High-performance Next.js websites and custom AI workflows that turn visits into inquiries. Book a call to get a clear plan and quote.",
    url: "https://www.lumarix.dev/",
    siteName: "Lumarix Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumarix Solutions - AI Architect & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumarix Solutions | AI Automation & Web Development",
    description: "Next.js websites and custom AI workflows that generate more inquiries. Book a call for a clear plan and quote.",
    creator: "@lumarixsolutions",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
