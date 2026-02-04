import Image from "next/image";

import { BlogList } from "@/components/blog-list";
import { DeferredIframe } from "@/components/deferred-iframe";
import { InstagramEmbed } from "@/components/instagram-embed";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts, getPodcast, getSocial } from "@/lib/content";

export const revalidate = 120;

export default async function IceriklerPage() {
  const blogPosts = await getBlogPosts();
  const social = await getSocial();
  const podcast = await getPodcast();
  const podcastEmbeds = podcast.embeds ?? [];

  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative space-y-14">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            İçerikler
          </p>
          <h1 className="text-4xl md:text-5xl">Paylaşımlar ve podcast</h1>
          <p className="text-lg text-foreground/80">
            Psikoloji notları, kısa pratikler ve podcast bölümleri.
          </p>
        </div>

        <section className="relative">
          <div className="absolute -inset-4 rounded-[36px] bg-accent-2/40 blur-2xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-white/70 shadow-soft">
            <div className="grid gap-8 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="relative overflow-hidden rounded-2xl bg-white/40 p-3 shadow-soft">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,215,96,0.35),transparent_65%)] blur-2xl" />
                  <Image
                    src="/images/dur-bi-konus.png"
                    alt="Dur Bi Konuşalım podcast kapak görseli"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
                  Podcast
                </p>
                <h2 className="text-3xl md:text-4xl">Dur Bi Konuşalım</h2>
                <p className="text-lg text-foreground/80">Psikolog Gülçin Bulut</p>
                <a
                  href="https://open.spotify.com/show/5Zn7ZXInCvsATtP7Y9XdVI"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
                >
                  Spotify’da dinle
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="py-6">
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
              Blog
            </p>
            <h2 className="py-2 text-3xl md:text-4xl">Blog yazıları</h2>
            <p className="py-2 text-sm text-foreground/70">
              Yazılar yayınlandıkça burada yer alır.
            </p>
          </div>
          <BlogList posts={blogPosts} />
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="py-2 text-2xl md:text-3xl">{podcast.title}</h2>
            <p className="py-2 text-sm text-foreground/70">
              Yeni bölümler ve dinleme bağlantıları.
            </p>
          </div>
          {podcastEmbeds.length ? (
            <div className="grid gap-4 md:grid-cols-3">
              {podcastEmbeds.map((src) => (
                <DeferredIframe
                  key={src}
                  src={src}
                  title="Spotify Podcast"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  wrapperClassName="h-[352px]"
                  iframeClassName="block h-full w-full"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/70 bg-white/60 p-6 text-sm text-foreground/60">
              Podcast bölümleri yakında burada görünecek.
            </div>
          )}
        </section>

        <section className="space-y-6">
          <Card className="bg-gradient-to-br from-white via-white to-accent-2/40">
            <CardHeader>
              <CardTitle>{social.platform}</CardTitle>
              <CardDescription>
                Kısa içerikler ve pratik öneriler.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {social.cards.map((card) => (
                  <InstagramEmbed key={card.url} url={card.url} />
                ))}
              </div>
              {social.profileUrl ? (
                <a
                  href={social.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-border/70 bg-white/80 px-6 py-2 text-sm text-foreground/80 transition hover:text-foreground"
                >
                  Profili görüntüle
                </a>
              ) : null}
            </CardContent>
          </Card>
        </section>

        
      </div>
    </div>
  );
}
