import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

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
  const hasBookingUrl = Boolean(bookingUrl);

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

        {hasBookingUrl ? (
          <div className="space-y-4">
            <div className="rounded-3xl border border-border/70 bg-white/70 p-3 shadow-soft">
              <iframe
                src={bookingUrl}
                title="Randevu Takvimi"
                className="h-[600px] w-full rounded-2xl"
                loading="lazy"
              />
            </div>
            <link
              rel="stylesheet"
              href="https://calendar.google.com/calendar/scheduling-button-script.css"
            />
            <div className="rounded-3xl border border-border/70 bg-white/70 p-10 text-center shadow-soft">
              <p className="text-lg font-medium">
                Eğer iframe açılmazsa aşağıdaki butonu kullanın.
              </p>
              <p className="mt-2 text-sm text-foreground/70">
                Google Calendar üzerinden uygun gün ve saatleri görüntüleyip
                randevu oluşturabilirsiniz.
              </p>
              <div id="gcal-scheduling-button" className="mt-6 flex justify-center" />
            </div>
            <Script
              src="https://calendar.google.com/calendar/scheduling-button-script.js"
              strategy="afterInteractive"
            />
            <Script id="gcal-scheduling-init" strategy="afterInteractive">
              {`
                window.addEventListener('load', function () {
                  var target = document.getElementById('gcal-scheduling-button');
                  if (window.calendar && window.calendar.schedulingButton && target) {
                    window.calendar.schedulingButton.load({
                      url: '${bookingUrl}',
                      color: '#039BE5',
                      label: 'Randevu oluşturun',
                      target: target,
                    });
                  }
                });
              `}
            </Script>
            <Button asChild variant="outline">
              <a href={bookingUrl} target="_blank" rel="noreferrer">
                Yeni sekmede aç
              </a>
            </Button>
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
