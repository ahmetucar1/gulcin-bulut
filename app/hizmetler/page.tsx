import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Hizmetler | Aydın Psikolog",
  description:
    "Aydın’da online ve yüz yüze psikolojik danışmanlık. Süreç, gizlilik ve teknik gereksinimler hakkında detaylar.",
  openGraph: {
    title: "Hizmetler | Aydın Psikolog",
    description:
      "Aydın’da online ve yüz yüze psikolojik danışmanlık. Süreç, gizlilik ve teknik gereksinimler hakkında detaylar."
  },
  twitter: {
    title: "Hizmetler | Aydın Psikolog",
    description:
      "Aydın’da online ve yüz yüze psikolojik danışmanlık. Süreç, gizlilik ve teknik gereksinimler hakkında detaylar."
  }
};

export default function HizmetlerPage() {
  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative space-y-12">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Hizmetler
          </p>
          <h1 className="text-4xl md:text-5xl">Danışmanlık süreçleri</h1>
          <p className="text-lg text-foreground/80">
            Online ve yüz yüze danışmanlık seçenekleri ile ihtiyacınıza uygun bir
            plan oluşturulur.
          </p>
          <p className="text-sm text-foreground/70">
            Aydın merkezli danışmanlık hizmeti; kaygı, stres ve ilişki
            temalarında güvenli ve etik bir süreç hedefler. Online seanslar ile
            Aydın genelinde erişilebilirlik sağlanır.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Online Danışmanlık</CardTitle>
              <CardDescription>Esnek saatler, güvenli bağlantı.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/75">
              <p>
                Görüşmeler, gizliliği sağlanan çevrim içi platformlar üzerinden
                gerçekleştirilir.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Stabil internet bağlantısı ve sessiz bir alan</li>
                <li>Kamera ve mikrofonu çalışan cihaz</li>
                <li>Görüşme öncesi kısa hazırlık bilgilendirmesi</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yüz Yüze Danışmanlık</CardTitle>
              <CardDescription>Aydın/Efeler’de ofis görüşmeleri.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/75">
              <p>
                Ofis ortamında birebir görüşmeler; güven ve ilişki temelinde
                ilerler.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Sakin, güvenli ve konforlu danışmanlık alanı</li>
                <li>Düzenli seans planı ve takip</li>
                <li>Merkezi konum ve kolay ulaşım</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-white/60">
            <CardHeader>
              <CardTitle>Süreç</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/75">
              İlk görüşmede ihtiyaçlar değerlendirilir ve danışmanlık hedefleri
              belirlenir. Seans sıklığı birlikte planlanır.
            </CardContent>
          </Card>
          <Card className="bg-white/60">
            <CardHeader>
              <CardTitle>Gizlilik</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/75">
              Tüm görüşmeler etik kurallar çerçevesinde gizli tutulur. Kayıt
              alınmaz, üçüncü kişilerle paylaşılmaz.
            </CardContent>
          </Card>
          <Card className="bg-white/60">
            <CardHeader>
              <CardTitle>Konum ve Teknik</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/75">
              Yüz yüze seanslar Aydın/Efeler’de gerçekleştirilir. Online seanslar
              için bağlantı bilgileri randevu sonrası iletilir.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
