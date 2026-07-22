import type { Metadata } from "next";

export const siteConfig = {
  url: "https://me.oangsa.com",
  domain: "me.oangsa.com",
  name: "Suthang Sukrueangkun",
  alternateName: "Oangsa",
  homeTitle: "Suthang Sukrueangkun (Oangsa) | Full-Stack Developer",
  homeDescription: "Portfolio of Suthang Sukrueangkun (Oangsa), a full-stack developer and computer engineering student building .NET, React, Next.js, and database-backed applications.",
  profileTitle: "Profile & Experience",
  profileDescription: "Experience, education, and teaching activities of Suthang Sukrueangkun (Oangsa), a full-stack developer and computer engineering student at KMUTT.",
  socialProfiles: [
    "https://github.com/oangsa",
    "https://www.facebook.com/suthang.sukrueangkun",
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

const personEntity = {
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: absoluteUrl("/profile"),
  description: siteConfig.profileDescription,
  jobTitle: "Full-Stack Developer",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "King Mongkut's University of Technology Thonburi",
  },
  knowsAbout: [
    "TypeScript",
    "JavaScript",
    "C#",
    ".NET",
    "React",
    "Next.js",
    "PostgreSQL",
    "SQL Server",
    "MongoDB",
    "Docker",
  ],
  sameAs: [...siteConfig.socialProfiles],
} as const;

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: absoluteUrl(),
      name: siteConfig.name,
      alternateName: [siteConfig.alternateName, siteConfig.domain],
      inLanguage: "en",
      about: { "@id": personEntity["@id"] },
    },
    personEntity,
  ],
} as const;

export const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absoluteUrl("/profile")}#profile-page`,
  url: absoluteUrl("/profile"),
  name: `${siteConfig.profileTitle} | ${siteConfig.name}`,
  description: siteConfig.profileDescription,
  mainEntity: personEntity,
} as const;

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Full-Stack Developer portfolio`,
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.homeDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: absoluteUrl("/profile") }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.homeTitle,
    description: siteConfig.homeDescription,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.homeTitle,
    description: siteConfig.homeDescription,
    images: [socialImage.url],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const profileMetadata: Metadata = {
  title: siteConfig.profileTitle,
  description: siteConfig.profileDescription,
  alternates: { canonical: "/profile" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/profile",
    siteName: siteConfig.name,
    title: `${siteConfig.profileTitle} | ${siteConfig.name}`,
    description: siteConfig.profileDescription,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.profileTitle} | ${siteConfig.name}`,
    description: siteConfig.profileDescription,
    images: [socialImage.url],
  },
};
