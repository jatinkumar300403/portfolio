import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// TODO: replace with the real domain once registered
const siteUrl = "https://jatinkumar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jatin Kumar — AI Engineer",
    template: "%s · Jatin Kumar",
  },
  description:
    "AI/ML engineer and researcher. Published at ICCS 2025 (Springer LNCS). M.Sc. Computer Science at Leibniz Universität Hannover; B.Tech CS from VIT Vellore.",
  keywords: [
    "Jatin Kumar",
    "AI Engineer",
    "Machine Learning",
    "Continual Learning",
    "RAG",
    "Portfolio",
  ],
  openGraph: {
    title: "Jatin Kumar — AI Engineer",
    description:
      "Watch the training run: from raw data in Vellore to deployment in Hannover. ML research, shipped products, and systems built end to end.",
    url: siteUrl,
    siteName: "Jatin Kumar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jatin Kumar — AI Engineer",
    description:
      "Watch the training run: from raw data in Vellore to deployment in Hannover.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0F1521",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jatin Kumar",
  email: "mailto:jatin.johnny007@gmail.com",
  url: siteUrl,
  jobTitle: "AI / Machine Learning Engineer",
  alumniOf: "Vellore Institute of Technology",
  sameAs: [
    "https://github.com/jatinkumar300403",
    "https://www.linkedin.com/in/jatinkumar2005/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
