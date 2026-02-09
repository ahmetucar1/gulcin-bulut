import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the website and counseling process.",
  openGraph: {
    title: "Aydin Psychologist | Privacy Policy",
    description: "Privacy policy for the website and counseling process."
  },
  twitter: {
    title: "Aydin Psychologist | Privacy Policy",
    description: "Privacy policy for the website and counseling process."
  }
};

export default function GizlilikPageEn() {
  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
          Privacy
        </p>
        <h1 className="text-3xl md:text-4xl">Privacy Policy</h1>
        <div className="rounded-3xl border border-border/70 bg-white/70 p-8 text-sm text-foreground/80 space-y-4">
          <p>
            Information shared through this website is used to plan counseling
            sessions and communicate with you.
          </p>
          <p>
            Content shared during sessions is kept confidential and is not shared
            with third parties except where required by law.
          </p>
          <p>
            Technical cookies may be used to ensure site functionality. You can
            manage your cookie preferences in your browser settings.
          </p>
        </div>
      </div>
    </div>
  );
}
