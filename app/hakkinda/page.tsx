import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { getAboutMarkdown } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hakkında",
  description:
    "Aydın psikolog arayışı için Psikolog Gülçin Bulut’un eğitim, deneyim ve danışmanlık yaklaşımı. Aydın’da etik ilkelere dayalı psikolojik danışmanlık.",
  openGraph: {
    title: "Aydın Psikolog | Hakkında",
    description:
      "Aydın psikolog arayışı için Psikolog Gülçin Bulut’un eğitim, deneyim ve danışmanlık yaklaşımı. Aydın’da etik ilkelere dayalı psikolojik danışmanlık."
  },
  twitter: {
    title: "Aydın Psikolog | Hakkında",
    description:
      "Aydın psikolog arayışı için Psikolog Gülçin Bulut’un eğitim, deneyim ve danışmanlık yaklaşımı. Aydın’da etik ilkelere dayalı psikolojik danışmanlık."
  }
};

export default function HakkindaPage() {
  const markdown = getAboutMarkdown();

  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(var(--accent-3)/0.25),transparent_55%),radial-gradient(circle_at_bottom_left,rgb(var(--accent-2)/0.35),transparent_60%)]" />
      <div className="container relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Hakkında
          </p>
          <h1 className="text-4xl md:text-5xl">Gülçin Bulut</h1>
          <p className="text-lg text-foreground/80">
            Danışmanlık sürecinde bilimsel yaklaşımlar, etik ilkeler ve güvenli
            bir ilişki temel alınır.
          </p>
          <Button asChild variant="outline">
            <Link href="/randevu">Randevu Al</Link>
          </Button>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-accent-2/35 blur-2xl" />
            <div className="relative w-full overflow-hidden rounded-[28px] bg-white/40 shadow-soft">
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-70"
                style={{
                  backgroundImage:
                    "url(/images/14b9ea10-af2e-4dc8-8ff8-a72f887270d2.jpg)"
                }}
              />
              <div className="relative z-10 aspect-[4/5] w-full p-4">
                <Image
                  src="/images/14b9ea10-af2e-4dc8-8ff8-a72f887270d2.jpg"
                  alt="Gülçin Bulut"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[32px] border border-border/70 bg-white/70 p-8 shadow-soft">
          <div className="richtext">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
