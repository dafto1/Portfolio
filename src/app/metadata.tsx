
import type { Metadata } from "next";

export const websiteMetadata: Metadata = {
  metadataBase: new URL("https://shreyasnikam.vercel.app"),

  title: {
    default: "Shreyas Nikam | Software Developer & AI Engineer",
    template: "%s | Shreyas Nikam",
  },

  description:
    "Shreyas Nikam is a Computer Science Engineer and Software Developer from Pune, India. Explore projects in full-stack development, AI agents, TypeScript, React, Next.js, Python and cloud technologies.",

  applicationName: "Shreyas Nikam Portfolio",

  keywords: [
    "Shreyas Nikam",
    "Shreyas Nikam Portfolio",
    "Shreyas Nikam Developer",
    "Software Developer",
    "Full Stack Developer",
    "AI Engineer",
    "Computer Science Engineer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "Python",
    "AI Agents",
    "Cloud Computing",
    "Pune Developer",
    "India",
  ],

  authors: [
    {
      name: "Shreyas Nikam",
      url: "https://www.linkedin.com/in/shreyas-nikam-b9685b289/",
    },
  ],

  creator: "Shreyas Nikam",
  publisher: "Shreyas Nikam",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shreyasnikam.vercel.app",
    siteName: "Shreyas Nikam Portfolio",
    title: "Shreyas Nikam | Software Developer & AI Engineer",
    description:
      "Explore the portfolio, projects and technical work of Shreyas Nikam — Software Developer interested in AI, full-stack development and cloud technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shreyas Nikam - Software Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@daftodev",
    creator: "@daftodev",
    title: "Shreyas Nikam | Software Developer & AI Engineer",
    description:
      "Software Developer building full-stack applications, AI agents and developer tools.",
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
