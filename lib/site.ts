export const siteConfig = {
  name: "Psikolog Gülçin Bulut",
  description:
    "Aydın’da online ve yüz yüze psikolojik danışmanlık. Modern, minimal ve güven veren bir danışmanlık deneyimi.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://psikologgulcin.com"
};

export const navigation = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkında", href: "/hakkinda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "İçerikler", href: "/icerikler" },
  { label: "İletişim", href: "/iletisim" }
];
