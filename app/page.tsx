import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Music2 } from "lucide-react";

import { TransitionMessage } from "@/components/transition-message";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeferredIframe } from "@/components/deferred-iframe";
import { InstagramEmbed } from "@/components/instagram-embed";
import { SpotifyEmbed } from "@/components/spotify-embed";
import { getAboutExcerpt, getContact, getPodcast, getSocial } from "@/lib/content";

export const revalidate = 120;

const areas = [
  "Kaygı ve Endişe",
  "Ani Yoğun Endişe Hali",
  "İlişki Problemleri",
  "Stres Yönetimi",
  "Zorlayıcı Yaşam Deneyimleri",
  "Mutsuzluk ve İsteksizlik",
  "Cinsel Yaşamla İlgili Zorlanmalar",
  "Ayrılık Kayıp Yas",
  "İletişim Sorunları"
];

const faqs = [
  {
    question: "Seanslar ne kadar sürer?",
    answer:
      "Seanslar genellikle 50 dakika sürer. Süre, danışan ihtiyacına göre planlanır."
  },
  {
    question: "Online seans için nelere ihtiyaç var?",
    answer:
      "Stabil internet bağlantısı, sessiz bir ortam ve kamera/mikrofonu çalışan bir cihaz yeterlidir."
  },
  {
    question: "Gizlilik nasıl korunuyor?",
    answer:
      "Tüm görüşmeler etik kurallar çerçevesinde gizli tutulur. Üçüncü kişilerle paylaşım yapılmaz."
  },
  {
    question: "Seans sıklığı nasıl belirlenir?",
    answer:
      "İlk görüşme sonrası birlikte ihtiyaçları değerlendirir ve sıklığı ortak planlarız."
  }
];

const transitionMessages = [
  "Derin bir nefes al.",
  "Fark et ve yavaşla.",
  "Zihninde nazikçe dolaş.",
  "İçine bak.",
  "Güvende olduğun bir alan.",
  "Buradasın.",
  "Devam et."
];

export default async function HomePage() {
  const excerpt = getAboutExcerpt();
  const contact = getContact();
  const social = await getSocial();
  const podcast = await getPodcast();
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    contact.address
  )}&output=embed`;
  const podcastEmbeds = podcast.embeds ?? [];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgb(var(--accent-3)/0.25),transparent_55%),radial-gradient(circle_at_bottom_left,rgb(var(--accent-2)/0.35),transparent_60%)]" />
        <div className="container section-padding relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6 pt-6 md:pt-8">
            <p className="py-1 text-sm uppercase tracking-[0.3em] text-foreground/60">
              Psikolog Gülçin Bulut
            </p>
            <h1 className="py-2 text-4xl font-semibold md:text-5xl lg:text-6xl">
              Güvenli, sakin ve destekleyici bir danışmanlık alanı.
            </h1>
            <p className="py-2 text-lg text-foreground/80 md:text-xl">
              Online ve yüz yüze seanslarla; ilişki, stres ve yaşam geçişlerinde
              birlikte ilerliyoruz.
            </p>
            <div className="flex flex-wrap gap-4 py-2">
              <Button asChild size="lg">
                <Link href="/randevu">Randevu Al</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/iletisim">İletişim</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-accent/10 blur-2xl" />
            <div className="relative w-full overflow-hidden rounded-[36px] bg-white/40 shadow-soft">
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-70"
                style={{ backgroundImage: "url(/images/IMG_2588.jpeg)" }}
              />
              <div className="relative z-10 aspect-[4/5] w-full p-4">
                <Image
                  src="/images/IMG_2588.jpeg"
                  alt="Psikolog Gülçin Bulut"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TransitionMessage text={transitionMessages[0]} align="left" />

      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(var(--accent-2)/0.4),transparent_55%)]" />
        <div className="container relative space-y-8">
          <div>
            <p className="pb-2 text-sm uppercase tracking-[0.3em] text-foreground/60">
              Seans Şekilleri
            </p>
            <h2 className="text-3xl md:text-4xl">Çalışma Yöntemleri</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:min-h-[480px]">
            <CardHeader>
              <CardTitle>Online Danışmanlık</CardTitle>
              <CardDescription>
                Güvenli bağlantı ile bulunduğunuz yerden görüşme.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/75">
                Yoğun tempoya uyum sağlayan esnek saatler, gizlilik ve rahat bir
                ortam.
              </p>
              <div className="relative overflow-hidden rounded-2xl bg-white/40 p-3 shadow-soft">
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-70"
                  style={{
                    backgroundImage:
                      "url(/images/0ea0e497-92e8-4a39-be49-7c418bce28e3.jpg)"
                  }}
                />
                <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/0ea0e497-92e8-4a39-be49-7c418bce28e3.jpg"
                    alt="Online danışmanlık görseli"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:min-h-[480px]">
            <CardHeader>
              <CardTitle>Yüz Yüze Danışmanlık</CardTitle>
              <CardDescription>
                Sakin ve güvenli bir ofis ortamı.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/75">
                Birebir görüşmeler, düzenli takip ve güven temelli iletişim.
              </p>
              <div className="relative overflow-hidden rounded-2xl bg-white/40 p-3 shadow-soft">
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-70"
                  style={{ backgroundImage: "url(/images/IMG_2570.jpeg)" }}
                />
                <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/IMG_2570.jpeg"
                    alt="Yüz yüze danışmanlık görseli"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>

      <TransitionMessage text={transitionMessages[1]} align="right" />

      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(var(--accent-2)/0.35),transparent_45%),radial-gradient(circle_at_top_right,rgb(var(--accent-3)/0.25),transparent_55%)]" />
        <div className="container relative">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="pb-2 text-sm uppercase tracking-[0.3em] text-foreground/60">
                Çalışma Alanları
              </p>
              <h2 className="text-3xl md:text-4xl">Odaklandığım temalar</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <div
                key={area}
                className="rounded-2xl border border-border/70 bg-white/80 px-5 py-4 text-sm text-foreground/80"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TransitionMessage text={transitionMessages[2]} align="left" />

      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgb(var(--accent-3)/0.2),transparent_60%)]" />
        <div className="container relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[36px] bg-accent/15 blur-2xl" />
            <div className="relative w-full overflow-hidden rounded-[32px] bg-white/40 shadow-soft">
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-70"
                style={{
                  backgroundImage:
                    "url(/images/a6d4335e-7c46-476d-96c7-f84638d5cd76.jpg)"
                }}
              />
              <div className="relative z-10 aspect-[4/5] w-full p-4">
                <Image
                  src="/images/a6d4335e-7c46-476d-96c7-f84638d5cd76.jpg"
                  alt="Gülçin Bulut"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="space-y-5 pt-8">
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
              Hakkında
            </p>
            <h2 className="text-3xl md:text-4xl">Kısa bir bakış</h2>
            <p className="text-foreground/80">{excerpt}</p>
            <Button asChild variant="outline">
              <Link href="/hakkinda">Devamını oku</Link>
            </Button>
          </div>
        </div>
      </section>

      <TransitionMessage text={transitionMessages[3]} align="right" />

      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(var(--accent-2)/0.35),transparent_55%)]" />
        <div className="container relative space-y-8">
          <div>
            <p className="pb-2 text-sm uppercase tracking-[0.3em] text-foreground/60">
              İçerikler
            </p>
            <h2 className="text-3xl md:text-4xl">Sosyal Medya ve Podcast</h2>
          </div>
          <div className="grid gap-8">
          <Card className="bg-gradient-to-br from-white via-white to-accent/10">
            <CardHeader>
              <CardTitle>{podcast.title}</CardTitle>
              <CardDescription>Podcast bölüm duyuruları.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {podcastEmbeds.length ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {podcastEmbeds.map((embedUrl) => (
                    <SpotifyEmbed key={embedUrl} embedUrl={embedUrl} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-foreground/70">
                  Yeni bölümler yakında burada görünecek.
                </p>
              )}
              <Button asChild variant="ghost">
                <Link href="/icerikler">Bölümleri gör</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white via-white to-accent-2/40">
            <CardHeader>
              <CardTitle>{social.platform}</CardTitle>
              <CardDescription>
                Psikoloji notları ve kısa pratikler.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {social.cards.map((card) => (
                  <InstagramEmbed key={card.url} url={card.url} />
                ))}
              </div>
              <Button asChild variant="ghost">
                <Link href="/icerikler">İçerikleri gör</Link>
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>

      <TransitionMessage text={transitionMessages[4]} align="left" />

      <section className="section-padding">
        <div className="container flex flex-col items-center gap-10">
          <div className="max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
              SSS
            </p>
            <h2 className="text-3xl md:text-4xl">Merak edilenler</h2>
            <p className="mt-4 text-foreground/70">
              Sürece dair sık gelen soruların yanıtlarını burada bulabilirsiniz.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-2xl space-y-4"
          >
            {faqs.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <TransitionMessage text={transitionMessages[5]} align="right" />

      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
        <div className="container relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div>
              <p className="pb-2 text-sm uppercase tracking-[0.3em] text-foreground/60">
                İletişim
              </p>
              <h2 className="text-3xl md:text-4xl">Birlikte başlayalım</h2>
              <p className="mt-3 text-foreground/70">
                Sosyal medya ve WhatsApp üzerinden güncel içeriklere ve hızlı
                iletişime ulaşabilirsiniz.
              </p>
            </div>

            <div className="space-y-3 text-sm text-foreground/80">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/80 px-4 py-3 transition hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/80 px-4 py-3 transition hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-sky-500" />
                {contact.email}
              </a>
              <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 text-amber-500" />
                <span>{contact.address}</span>
              </div>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/80 px-4 py-3 transition hover:text-foreground"
              >
                <MapPin className="h-4 w-4 text-amber-500" />
                Haritada aç
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/psikologgulcinbulut/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-pink-500 shadow-soft transition hover:scale-105"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://open.spotify.com/user/28ifnw51tvp75bht2eyyhz08x"
                target="_blank"
                rel="noreferrer"
                aria-label="Spotify"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-green-500 shadow-soft transition hover:scale-105"
              >
                <Music2 className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/905340240934"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-emerald-500 shadow-soft transition hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/70 bg-white/70 shadow-soft">
            <DeferredIframe
              src={mapEmbedUrl}
              title="Harita"
              wrapperClassName="h-[320px] w-full md:h-[360px]"
              iframeClassName="h-full w-full"
              referrerPolicy="no-referrer-when-downgrade"
              loading="eager"
              rootMargin="700px"
            />
          </div>
        </div>
      </section>

      <TransitionMessage text={transitionMessages[6]} align="left" />
    </>
  );
}
