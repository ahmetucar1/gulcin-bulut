import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContact } from "@/lib/content";

export default function IletisimPage() {
  const contact = getContact();
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    contact.address
  )}&output=embed`;

  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            İletişim
          </p>
          <h1 className="text-4xl md:text-5xl">İletişime geçin</h1>
          <p className="text-lg text-foreground/80">
            Randevu, danışmanlık süreci ve detaylar için ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Phone className="h-4 w-4" /> Telefon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>{contact.phone}</p>
              <Button asChild size="sm">
                <a href={contact.phoneHref}>Ara</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Mail className="h-4 w-4" /> E-posta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>{contact.email}</p>
              <Button asChild size="sm" variant="outline">
                <a href={contact.emailHref}>E-posta gönder</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <MapPin className="h-4 w-4" /> Adres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>{contact.address}</p>
              <Button asChild size="sm" variant="ghost">
                <a href={contact.mapUrl} target="_blank" rel="noreferrer">
                  Haritada aç
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/70 bg-white/70 shadow-soft">
          <iframe
            src={mapEmbedUrl}
            title="Harita"
            className="h-[320px] w-full md:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="rounded-3xl border border-border/70 bg-white/70 p-8 text-sm text-foreground/70">
          Danışmanlık süreci, kişiye özel olarak planlanır. Uygun seans saatleri
          için telefon veya e-posta yoluyla iletişim kurabilirsiniz.
        </div>
      </div>
    </div>
  );
}
