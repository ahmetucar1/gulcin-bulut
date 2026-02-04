"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sayfa hatası:", error);
  }, [error]);

  return (
    <div className="section-padding">
      <div className="container">
        <div className="rounded-3xl border border-border/70 bg-white/80 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Bir hata oluştu
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl">
            Sayfa geçici olarak görüntülenemiyor.
          </h1>
          <p className="mt-4 text-foreground/70">
            Lütfen sayfayı yenileyin veya biraz sonra tekrar deneyin.
          </p>
          <button
            onClick={reset}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
          >
            Yeniden Dene
          </button>
        </div>
      </div>
    </div>
  );
}
