import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Randevu",
  description:
    "Aydın psikolog randevu sayfası. Online randevu planlayın, uygun gün ve saatleri görüntüleyin.",
  openGraph: {
    title: "Aydın Psikolog | Randevu",
    description:
      "Aydın psikolog randevu sayfası. Online randevu planlayın, uygun gün ve saatleri görüntüleyin."
  },
  twitter: {
    title: "Aydın Psikolog | Randevu",
    description:
      "Aydın psikolog randevu sayfası. Online randevu planlayın, uygun gün ve saatleri görüntüleyin."
  }
};

export default function RandevuPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL;
  const isEmbeddable =
    bookingUrl?.includes("calendar.google.com/calendar/appointments") ||
    bookingUrl?.includes("calendar.google.com/calendar/u/");

  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Randevu
          </p>
          <h1 className="text-4xl md:text-5xl">Online randevu planla</h1>
          <p className="text-lg text-foreground/80">
            Uygun gün ve saatleri görüntüleyip randevunuzu oluşturabilirsiniz.
          </p>
        </div>

        {bookingUrl && isEmbeddable ? (
          <div className="space-y-4">
            <div className="rounded-3xl border border-border/70 bg-white/70 p-3 shadow-soft">
              <iframe
                src={bookingUrl}
                title="Randevu Takvimi"
                className="h-[70vh] min-h-[520px] w-full rounded-2xl"
                loading="lazy"
              />
            </div>
            <Button asChild variant="outline">
              <a href={bookingUrl} target="_blank" rel="noreferrer">
                Yeni sekmede aç
              </a>
            </Button>
          </div>
        ) : bookingUrl ? (
          <div className="rounded-3xl border border-border/70 bg-white/70 p-10 text-center">
            <p className="text-lg font-medium">
              Bu bağlantı iframe içinde görüntülenemiyor.
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              Google Calendar “Appointment Schedules” sayfasının tam
              “calendar.google.com/calendar/appointments” bağlantısı
              eklenirse sayfa içinden gösterilebilir. Şimdilik yeni sekmede
              açabilirsiniz.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <a href={bookingUrl} target="_blank" rel="noreferrer">
                  Randevu sayfasını aç
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/iletisim">İletişim</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/70 bg-white/60 p-10 text-center">
            <p className="text-lg font-medium">Randevu sayfası yakında aktif olacak.</p>
            <p className="mt-2 text-sm text-foreground/70">
              Şimdilik iletişim sayfasından ulaşabilirsiniz.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/iletisim">İletişim</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
