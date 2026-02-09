import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Appointment",
  description:
    "Aydin psychologist appointment page. Book online and view available days and times with Psychologist Gulcin Bulut.",
  openGraph: {
    title: "Aydin Psychologist | Appointment",
    description:
      "Aydin psychologist appointment page. Book online and view available days and times with Psychologist Gulcin Bulut."
  },
  twitter: {
    title: "Aydin Psychologist | Appointment",
    description:
      "Aydin psychologist appointment page. Book online and view available days and times with Psychologist Gulcin Bulut."
  }
};

export default function RandevuPageEn() {
  const bookingUrl = process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL;
  const hasBookingUrl = Boolean(bookingUrl);

  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Appointment
          </p>
          <h1 className="text-4xl md:text-5xl">Book an appointment</h1>
          <p className="text-lg text-foreground/80">
            View available days and times and schedule your session.
          </p>
        </div>

        {hasBookingUrl ? (
          <div className="space-y-4">
            <div className="rounded-3xl border border-border/70 bg-white/70 p-3 shadow-soft">
              <iframe
                src={bookingUrl}
                title="Appointment Calendar"
                className="h-[600px] w-full rounded-2xl"
                loading="lazy"
              />
            </div>
            <Button asChild variant="outline">
              <a href={bookingUrl} target="_blank" rel="noreferrer">
                Open in a new tab
              </a>
            </Button>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/70 bg-white/60 p-10 text-center">
            <p className="text-lg font-medium">Appointment page will be available soon.</p>
            <p className="mt-2 text-sm text-foreground/70">
              For now, you can reach out via the contact page.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/en/iletisim">Contact</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
