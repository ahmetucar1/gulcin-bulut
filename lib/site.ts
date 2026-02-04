export const siteConfig = {
  name: "Psikolog Gülçin Bulut",
  description:
    "Modern, minimal ve güven veren bir danışmanlık deneyimi. Online ve yüz yüze psikolojik danışmanlık.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
};

export const navigation = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkında", href: "/hakkinda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "İçerikler", href: "/icerikler" },
  { label: "İletişim", href: "/iletisim" }
];
