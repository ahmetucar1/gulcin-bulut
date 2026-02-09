export const siteConfig = {
  name: "Psikolog Gülçin Bulut",
  description:
    "Aydın psikolog arayışında Psikolog Gülçin Bulut ile online ve yüz yüze psikolojik danışmanlık. Modern, minimal ve güven veren bir danışmanlık deneyimi.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://psikologgulcin.com")
    .trim()
    .replace(/\/+$/, "")
};

export const navigation = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkında", href: "/hakkinda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "İçerikler", href: "/icerikler" },
  { label: "İletişim", href: "/iletisim" }
];

export const navigationEn = [
  { label: "Home", href: "/en" },
  { label: "About", href: "/en/hakkinda" },
  { label: "Services", href: "/en/hizmetler" },
  { label: "Content", href: "/en/icerikler" },
  { label: "Contact", href: "/en/iletisim" }
];
