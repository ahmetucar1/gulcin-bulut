import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aydin psychologist services by Psychologist Gulcin Bulut: online and in-person counseling. Process, privacy, and requirements.",
  openGraph: {
    title: "Aydin Psychologist | Services",
    description:
      "Aydin psychologist services by Psychologist Gulcin Bulut: online and in-person counseling. Process, privacy, and requirements."
  },
  twitter: {
    title: "Aydin Psychologist | Services",
    description:
      "Aydin psychologist services by Psychologist Gulcin Bulut: online and in-person counseling. Process, privacy, and requirements."
  }
};

export default function HizmetlerPageEn() {
  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative space-y-12">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl">Counseling processes</h1>
          <p className="text-lg text-foreground/80">
            Online and in‑person counseling options are planned based on your
            needs.
          </p>
          <p className="text-sm text-foreground/70">
            Aydin‑based counseling service focused on anxiety, stress, and
            relationships with an ethical and safe process. Online sessions make
            support accessible across Aydin.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Online Counseling</CardTitle>
              <CardDescription>Flexible hours, secure connection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/75">
              <p>
                Sessions are held on secure online platforms that protect
                confidentiality.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Stable internet connection and a quiet space</li>
                <li>Device with working camera and microphone</li>
                <li>Brief pre‑session information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In‑Person Counseling</CardTitle>
              <CardDescription>Office sessions in Aydin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/75">
              <p>
                One‑on‑one office sessions progress with trust and a supportive
                relationship.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Calm, secure and comfortable counseling space</li>
                <li>Regular session plan and follow‑up</li>
                <li>Central location and easy access</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-white/60">
            <CardHeader>
              <CardTitle>Process</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/75">
              In the first session, needs are assessed and counseling goals are
              set. Session frequency is planned together.
            </CardContent>
          </Card>
          <Card className="bg-white/60">
            <CardHeader>
              <CardTitle>Confidentiality</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/75">
              All sessions are confidential under ethical rules. No recordings
              are taken and nothing is shared with third parties.
            </CardContent>
          </Card>
          <Card className="bg-white/60">
            <CardHeader>
              <CardTitle>Location & Technical</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/75">
              In‑person sessions take place in Aydin. Online session details are
              shared after booking.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
