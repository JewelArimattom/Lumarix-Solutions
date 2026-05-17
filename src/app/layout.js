import "./globals.css";
import "./build.css";

export const metadata = {
  title: "Lumarix Solutions | AI Architect & Premium Web Developer",
  description:
    "Premium freelance web developer and AI systems architect. Specializing in high-performance Next.js web applications, custom AI workflows, automated business systems, and conversion-optimized websites.",
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
  authors: [{ name: "Lumarix Solutions", url: "https://lumarixsolutions.com" }],
  creator: "Lumarix Solutions",
  publisher: "Lumarix Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Lumarix Solutions | AI Architecture & Premium Web Development",
    description:
      "Transforming businesses with custom AI workflows, high-speed Next.js web apps, and cinematic, conversion-focused digital experiences.",
    url: "https://lumarixsolutions.com/",
    siteName: "Lumarix Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lumarix Solutions - AI Architect & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumarix Solutions | AI Architect & Web Developer",
    description: "Premium Next.js web apps and custom AI business automations.",
    creator: "@lumarixsolutions",
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
      <body>{children}</body>
    </html>
  );
}
