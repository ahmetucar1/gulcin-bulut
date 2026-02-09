import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Protection Notice",
  description:
    "Information notice under the Turkish Data Protection Law (KVKK).",
  openGraph: {
    title: "Aydin Psychologist | Data Protection Notice",
    description: "Information notice under the Turkish Data Protection Law (KVKK)."
  },
  twitter: {
    title: "Aydin Psychologist | Data Protection Notice",
    description: "Information notice under the Turkish Data Protection Law (KVKK)."
  }
};

export default function KvkkPageEn() {
  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
          KVKK
        </p>
        <h1 className="text-3xl md:text-4xl">Data Protection Notice</h1>
        <div className="rounded-3xl border border-border/70 bg-white/70 p-8 text-sm text-foreground/80 space-y-4">
          <p>
            This notice is provided under the Turkish Personal Data Protection Law
            (KVKK) regarding the processing of personal data.
          </p>
          <p>
            Personal data shared during counseling is processed solely for the
            delivery of counseling services, in line with confidentiality and
            ethical principles, and is not shared with third parties.
          </p>
          <p>
            You can submit your requests regarding your personal data via the
            contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
