import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Aydin Psychologist",
  description:
    "Looking for an Aydin psychologist? Psychologist Gulcin Bulut offers online and in-person counseling in Aydin.",
  alternates: {
    canonical: "/en",
    languages: {
      tr: "/aydin-psikolog",
      en: "/en"
    }
  },
  openGraph: {
    title: "Aydin Psychologist | Psychologist Gulcin Bulut",
    description:
      "Looking for an Aydin psychologist? Psychologist Gulcin Bulut offers online and in-person counseling in Aydin."
  },
  twitter: {
    title: "Aydin Psychologist | Psychologist Gulcin Bulut",
    description:
      "Looking for an Aydin psychologist? Psychologist Gulcin Bulut offers online and in-person counseling in Aydin."
  }
};

const areas = [
  "Anxiety and Worry",
  "Sudden Intense Anxiety",
  "Relationship Difficulties",
  "Stress Management",
  "Challenging Life Experiences",
  "Low Mood and Lack of Motivation",
  "Difficulties in Sexual Life",
  "Separation, Loss and Grief",
  "Communication Problems"
];

const faqs = [
  {
    question: "How long is a session?",
    answer: "Sessions typically last 50 minutes. The duration can be planned based on your needs."
  },
  {
    question: "What do I need for an online session?",
    answer: "A stable internet connection, a quiet space, and a device with camera/microphone are sufficient."
  },
  {
    question: "How is confidentiality protected?",
    answer: "All sessions are kept confidential under ethical rules. No information is shared with third parties."
  },
  {
    question: "How often are sessions scheduled?",
    answer: "After the first meeting, we assess needs together and plan the frequency accordingly."
  }
];

const transitionMessages = [
  "Take a deep breath.",
  "Notice and slow down.",
  "Gently observe your mind.",
  "Look inward.",
  "A safe space.",
  "You are here.",
  "Keep going."
];

export default async function HomePageEn() {
  const excerpt = getAboutExcerpt(260, "en");
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
              Psychologist Gulcin Bulut
            </p>
            <h1 className="py-2 text-4xl font-semibold md:text-5xl lg:text-6xl">
              A safe, calm, and supportive counseling space.
            </h1>
            <p className="py-2 text-lg text-foreground/80 md:text-xl">
              In Aydin, we work together through relationships, stress, and life
              transitions with online and in-person sessions.
            </p>
            <div className="flex flex-wrap gap-4 py-2">
              <Button asChild size="lg">
                <Link href="/en/randevu">Book Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/en/iletisim">Contact</Link>
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
                  alt="Psychologist Gulcin Bulut"
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
              Session Formats
            </p>
            <h2 className="text-3xl md:text-4xl">How We Work</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="lg:min-h-[480px]">
              <CardHeader>
                <CardTitle>Online Counseling</CardTitle>
                <CardDescription>
                  Secure connection from wherever you are.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/75">
                  Flexible hours for busy schedules, privacy, and a comfortable
                  environment.
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
                      alt="Online counseling"
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
                <CardTitle>In‑Person Counseling</CardTitle>
                <CardDescription>Calm and secure office setting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/75">
                  One‑on‑one sessions, regular follow‑up, and trust‑based
                  communication.
                </p>
                <div className="relative overflow-hidden rounded-2xl bg-white/40 p-3 shadow-soft">
                  <div
                    className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-70"
                    style={{ backgroundImage: "url(/images/ofis.JPG)" }}
                  />
                  <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/ofis.JPG"
                      alt="Office counseling"
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
                Areas of Focus
              </p>
              <h2 className="text-3xl md:text-4xl">Themes I focus on</h2>
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
          <div className="mt-8 rounded-2xl border border-border/70 bg-white/70 p-6 text-sm text-foreground/75">
            <p>
              If you are looking for an Aydin psychologist, I conduct the
              counseling process within a safe and ethical framework. I offer
              support in anxiety, stress, and relationship themes with in‑person
              sessions in Aydin and online sessions.
            </p>
            <p className="mt-4">
              Office sessions take place in central Aydin; online sessions make
              support accessible across Aydin. A session plan is created together
              according to your needs.
            </p>
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
                  alt="Gulcin Bulut"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="space-y-5 pt-8">
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
              About
            </p>
            <h2 className="text-3xl md:text-4xl">A brief overview</h2>
            <p className="text-foreground/80">{excerpt}</p>
            <Button asChild variant="outline">
              <Link href="/en/hakkinda">Read more</Link>
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
              Content
            </p>
            <h2 className="text-3xl md:text-4xl">Social Media & Podcast</h2>
          </div>
          <div className="grid gap-8">
            <Card className="bg-gradient-to-br from-white via-white to-accent/10">
              <CardHeader>
                <CardTitle>{podcast.title}</CardTitle>
                <CardDescription>Podcast episode updates.</CardDescription>
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
                    New episodes will be available here soon.
                  </p>
                )}
                <Button asChild variant="ghost">
                  <Link href="/en/icerikler">See episodes</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white via-white to-accent-2/40">
              <CardHeader>
                <CardTitle>{social.platform}</CardTitle>
                <CardDescription>Notes and short practices.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  {social.cards.map((card) => (
                    <InstagramEmbed key={card.url} url={card.url} />
                  ))}
                </div>
                <Button asChild variant="ghost">
                  <Link href="/en/icerikler">See content</Link>
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
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 text-foreground/70">
              You can find answers to common questions about the process here.
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
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl">Let’s get started</h2>
              <p className="mt-3 text-foreground/70">
                Reach out via social media or WhatsApp for updates and quick
                communication.
              </p>
            </div>

            <div className="space-y-3 text-sm text-foreground/80">
              <a
                href="https://wa.me/905340240934?text=Hello%2C%20I%20would%20like%20to%20get%20information%20about%20an%20appointment."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/80 px-4 py-3 transition hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                Message on WhatsApp
              </a>
              {contact.googleBusinessUrl ? (
                <a
                  href={contact.googleBusinessUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/80 px-4 py-3 transition hover:text-foreground"
                >
                  <MapPin className="h-4 w-4 text-amber-500" />
                  View Google Business Profile
                </a>
              ) : null}
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
                Open in Maps
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
              title="Map"
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
