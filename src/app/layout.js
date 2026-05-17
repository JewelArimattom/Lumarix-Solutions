import "./globals.css";
import "./build.css";

export const metadata = {
  title: "Lumarix Solutions | Freelance Web Developer in Kerala",
  description:
    "Premium websites, landing pages, e-commerce stores, SEO pages, and web apps. Freelance web developer in Kerala, India.",
  keywords:
    "freelance web developer Kerala, website developer Kottayam, web design Kerala, SEO website design India",
  authors: [{ name: "Lumarix Solutions" }],
  openGraph: {
    title: "Lumarix Solutions | Premium Freelance Web Development",
    description:
      "Modern, fast, SEO-ready websites and web apps built to help businesses win more clients.",
    url: "https://lumarixsolutions.com/",
    siteName: "Lumarix Solutions",
    locale: "en_IN",
    type: "website",
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
