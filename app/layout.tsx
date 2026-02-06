import type { Metadata } from "next";

import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getContact, getSocial } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const siteImage = "/images/og-image-portrait.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Aydın Psikolog | Psikolog Gülçin Bulut",
    template: "Aydın Psikolog | %s"
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicons/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicons/favicon-256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicons/favicon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/favicons/favicon-180.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
    images: [{ url: siteImage, width: 1200, height: 1600, alt: siteConfig.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteImage]
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const contact = getContact();
  const social = await getSocial();

  const personSchema = {
    "@type": "Person",
    name: "Gülçin Bulut",
    jobTitle: "Psikolog",
    url: siteConfig.url,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kurtuluş, 2011. Sk. Bina Numara 5, Kat 5 Daire:29",
      postalCode: "09100",
      addressLocality: "Efeler",
      addressRegion: "Aydın",
      addressCountry: "TR"
    },
    sameAs: [social.profileUrl, contact.googleBusinessUrl].filter(Boolean)
  };

  const serviceSchema = {
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteImage}`,
    description: siteConfig.description,
    telephone: contact.phone,
    priceRange: "$$",
    hasMap: contact.mapUrl,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Aydın" },
      { "@type": "AdministrativeArea", name: "Efeler" }
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kurtuluş, 2011. Sk. Bina Numara 5, Kat 5 Daire:29",
      postalCode: "09100",
      addressLocality: "Efeler",
      addressRegion: "Aydın",
      addressCountry: "TR"
    },
    sameAs: [social.profileUrl, contact.googleBusinessUrl].filter(Boolean),
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.8442,
      longitude: 27.8452
    }
  };

  return (
    <html lang="tr">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [personSchema, serviceSchema]
            })
          }}
        />
      </body>
    </html>
  );
}
