import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="rounded-3xl border border-border/70 bg-white/80 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            404
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl">
            Aradığınız sayfa bulunamadı.
          </h1>
          <p className="mt-4 text-foreground/70">
            Ana sayfaya dönerek devam edebilirsiniz.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
