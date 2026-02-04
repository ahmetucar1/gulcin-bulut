export default function KvkkPage() {
  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
          KVKK
        </p>
        <h1 className="text-3xl md:text-4xl">KVKK Aydınlatma Metni</h1>
        <div className="rounded-3xl border border-border/70 bg-white/70 p-8 text-sm text-foreground/80 space-y-4">
          <p>
            Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
            kişisel verilerin işlenmesine ilişkin aydınlatma amacı taşır.
          </p>
          <p>
            Danışmanlık sürecinde paylaşılan kişisel veriler; gizlilik ve etik
            ilkeler doğrultusunda, yalnızca danışmanlık hizmetinin yürütülmesi
            için işlenir ve üçüncü kişilerle paylaşılmaz.
          </p>
          <p>
            Kişisel verilerinizle ilgili taleplerinizi iletişim sayfası üzerinden
            iletebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
