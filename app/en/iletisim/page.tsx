import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { DeferredIframe } from "@/components/deferred-iframe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Aydin psychologist contact details. Reach Psychologist Gulcin Bulut via WhatsApp, phone or email.",
  openGraph: {
    title: "Aydin Psychologist | Contact",
    description:
      "Aydin psychologist contact details. Reach Psychologist Gulcin Bulut via WhatsApp, phone or email."
  },
  twitter: {
    title: "Aydin Psychologist | Contact",
    description:
      "Aydin psychologist contact details. Reach Psychologist Gulcin Bulut via WhatsApp, phone or email."
  }
};

export default function IletisimPageEn() {
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
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl">Get in touch</h1>
          <p className="text-lg text-foreground/80">
            For appointments and counseling details in Aydin, you can reach out.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Phone className="h-4 w-4" /> Phone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>{contact.phone}</p>
              <Button asChild size="sm">
                <a href={contact.phoneHref}>Call</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Send a quick message.</p>
              <Button asChild size="sm" variant="outline">
                <a
                  href="https://wa.me/905340240934?text=Hello%2C%20I%20would%20like%20to%20get%20information%20about%20an%20appointment."
                  target="_blank"
                  rel="noreferrer"
                >
                  Message on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Mail className="h-4 w-4" /> Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-xs break-all">{contact.email}</p>
              <Button asChild size="sm" variant="outline">
                <a href={contact.emailHref}>Send email</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <MapPin className="h-4 w-4" /> Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>{contact.address}</p>
              <Button asChild size="sm" variant="ghost">
                <a href={contact.mapUrl} target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
              </Button>
              {contact.googleBusinessUrl ? (
                <Button asChild size="sm" variant="outline">
                  <a
                    href={contact.googleBusinessUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Google Business Profile
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>
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
    </div>
  );
}
