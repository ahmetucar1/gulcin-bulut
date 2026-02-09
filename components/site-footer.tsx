"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/site";

type ContactInfo = {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: string;
  mapUrl: string;
  googleBusinessUrl?: string;
};

export function SiteFooter({ contact }: { contact: ContactInfo }) {
  const instagramUrl = "https://www.instagram.com/psikologgulcinbulut/";
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  const basePath = isEnglish ? "/en" : "";
  const labels = isEnglish
    ? {
        summary:
          "Online and in-person psychological counseling. A safe, compassionate and ethical process.",
        contact: "Contact",
        whatsapp: "Message on WhatsApp",
        gmb: "Google Business Profile",
        links: "Links",
        kvkk: "Data Protection Notice (KVKK)",
        privacy: "Privacy Policy",
        ethics: "Counseling is conducted in line with ethical principles."
      }
    : {
        summary:
          "Online ve yüz yüze psikolojik danışmanlık. Güvenli, şefkatli ve etik bir süreç için yanınızdayım.",
        contact: "İletişim",
        whatsapp: "WhatsApp üzerinden yaz",
        gmb: "Google İşletme Profili",
        links: "Bağlantılar",
        kvkk: "KVKK Aydınlatma Metni",
        privacy: "Gizlilik Politikası",
        ethics: "Danışmanlık süreci etik ilkelere uygun yürütülür."
      };

  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/70 blur-[110px]" />
          <div className="absolute top-10 right-1/3 h-56 w-56 rounded-full bg-sky-200/60 blur-[95px]" />
          <div className="absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-orange-200/60 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.08))]" />
        </div>
        <div className="relative border-t border-white/60 bg-white/10 backdrop-blur-[28px] shadow-[0_-30px_90px_-55px_rgba(0,0,0,0.45)]">
          <div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#fef6e1]">
              <Image
                src="/images/brand/logo-512-2.png"
                alt={`${siteConfig.name} logo`}
                fill
                sizes="56px"
                className="object-cover scale-[1.35]"
              />
            </div>
            <p className="font-serif text-lg">{siteConfig.name}</p>
          </div>
          <p className="text-sm text-foreground/70">{labels.summary}</p>
        </div>
        <div className="space-y-3 text-sm text-foreground/80">
          <p className="font-medium">{labels.contact}</p>
          <a href={contact.phoneHref} className="block hover:text-foreground">
            {contact.phone}
          </a>
          <a
            href="https://wa.me/905340240934?text=Merhaba%2C%20randevu%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
            className="block hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            {labels.whatsapp}
          </a>
          {contact.googleBusinessUrl ? (
            <a
              href={contact.googleBusinessUrl}
              className="block hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              {labels.gmb}
            </a>
          ) : null}
          <a href={contact.emailHref} className="block hover:text-foreground">
            {contact.email}
          </a>
          <span className="block text-foreground/60">{contact.address}</span>
        </div>
        <div className="space-y-3 text-sm text-foreground/80">
          <p className="font-medium">{labels.links}</p>
          <Link href={`${basePath}/kvkk`} className="block hover:text-foreground">
            {labels.kvkk}
          </Link>
          <Link href={`${basePath}/gizlilik`} className="block hover:text-foreground">
            {labels.privacy}
          </Link>
          <a
            href={instagramUrl}
            className="block hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="container flex flex-col gap-2 py-6 text-xs text-foreground/60 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span>{labels.ethics}</span>
        </div>
      </div>
    </footer>
  );
}
