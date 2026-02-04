export default function GizlilikPage() {
  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
          Gizlilik
        </p>
        <h1 className="text-3xl md:text-4xl">Gizlilik Politikası</h1>
        <div className="rounded-3xl border border-border/70 bg-white/70 p-8 text-sm text-foreground/80 space-y-4">
          <p>
            Bu web sitesi üzerinden paylaşılan bilgiler, danışmanlık sürecinin
            planlanması ve iletişimin yürütülmesi amacıyla kullanılır.
          </p>
          <p>
            Görüşmeler sırasında paylaşılan içerikler gizli tutulur; yasal
            zorunluluklar dışında üçüncü kişilerle paylaşılmaz.
          </p>
          <p>
            Siteye erişim sırasında teknik çerezler kullanılabilir. Çerez
            tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
