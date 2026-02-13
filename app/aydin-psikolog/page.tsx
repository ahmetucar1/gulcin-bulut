import type { Metadata } from "next";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AYDIN PSİKOLOG",
  description:
    "Aydın psikolog arayışında Psikolog Gülçin Bulut ile online ve yüz yüze danışmanlık. Aydın’da psikolog desteği, güvenli süreç ve randevu için detaylı bilgi.",
  alternates: {
    canonical: "/aydin-psikolog",
    languages: {
      tr: "/aydin-psikolog",
      en: "/en"
    }
  },
  openGraph: {
    title: "AYDIN PSİKOLOG",
    description:
      "Aydın psikolog arayışında Psikolog Gülçin Bulut ile online ve yüz yüze danışmanlık. Aydın’da psikolog desteği, güvenli süreç ve randevu için detaylı bilgi."
  },
  twitter: {
    title: "AYDIN PSİKOLOG",
    description:
      "Aydın psikolog arayışında Psikolog Gülçin Bulut ile online ve yüz yüze danışmanlık. Aydın’da psikolog desteği, güvenli süreç ve randevu için detaylı bilgi."
  }
};

const supportAreas = [
  "Kaygı, endişe ve yoğun stres",
  "İlişki ve iletişim sorunları",
  "Duygudurum dalgalanmaları",
  "Kayıp, yas ve ayrılık süreçleri",
  "Özgüven ve özşefkat çalışmaları",
  "Yaşam geçişleri ve belirsizlik",
  "Sınav, iş ve performans baskısı",
  "Aile içi dinamikler ve çatışma"
];

const faqs = [
  {
    question: "Aydın psikolog randevusu için nasıl ilerleyebilirim?",
    answer:
      "Randevu talebinizi randevu sayfasından oluşturabilirsiniz. İlk görüşmede ihtiyaçlarınız netleştirilir ve uygun seans planı birlikte belirlenir."
  },
  {
    question: "Seanslar yüz yüze mi, online mı?",
    answer:
      "Aydın merkezde yüz yüze seansların yanında online seans seçeneği de sunulmaktadır. Yoğun tempo ve ulaşım koşullarına göre birlikte karar verilir."
  },
  {
    question: "Seans süresi ve sıklığı nedir?",
    answer:
      "Seanslar genellikle 50 dakika sürer. Sıklık, ihtiyacınıza göre haftalık ya da iki haftada bir planlanabilir."
  },
  {
    question: "Gizlilik nasıl sağlanıyor?",
    answer:
      "Tüm görüşmeler etik kurallar ve mesleki gizlilik ilkeleri çerçevesinde yürütülür. Bilgiler üçüncü kişilerle paylaşılmaz."
  }
];

export default function AydinPsikologPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <div className="section-padding">
      <div className="container space-y-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Aydın
          </p>
          <h1 className="text-4xl font-semibold md:text-5xl">AYDIN PSİKOLOG</h1>
          <p className="text-lg text-foreground/80 md:text-xl">
            Aydın psikolog arayışında, güvenli ve destekleyici bir süreç için
            Psikolog Gülçin Bulut ile online ve yüz yüze danışmanlık seçenekleri.
            Aydın’da psikolog desteğine ihtiyaç duyduğunuz her dönemde, birlikte
            ilerlemek için buradayız.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/randevu">Randevu Al</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/iletisim">İletişim</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4 text-base leading-relaxed text-foreground/80">
          <h2 className="text-2xl font-semibold text-foreground">
            Aydın’da psikolog arayanlar için kapsamlı destek
          </h2>
          <p>
            Aydın psikolog araması yapan birçok kişi, kaygı, stres, ilişki
            zorlukları ya da yaşam geçişleri gibi konularda güvenli bir alan
            arar. Psikolog Gülçin Bulut, Aydın merkezde yüz yüze seansların
            yanında online görüşme seçenekleriyle de destek sunar. Bu sayfa,
            Aydın’da psikolog desteği arayanlar için süreci şeffaflaştırmak ve
            karar vermeyi kolaylaştırmak amacıyla hazırlanmıştır.
          </p>
          <p>
            Danışmanlık sürecinin ilk adımı, ihtiyaçların anlaşılmasıdır. İlk
            görüşmede sizi yormayan, net ve yapılandırılmış bir değerlendirme
            yapılır. Ardından hedefler belirlenir ve sizin hızınıza uygun bir
            çalışma planı oluşturulur. Aydın psikolog desteği, yalnızca sorunları
            konuşmak değil; aynı zamanda yeni beceriler kazanmak, duyguları daha
            iyi tanımak ve yaşam kalitesini artırmak için bir yolculuktur.
          </p>
          <p>
            Aydın’da psikolog arayanlar için önemli bir konu da erişilebilirliktir.
            Aydın merkezdeki ofis, ulaşımı kolay bir noktadadır. Dilerseniz online
            seanslarla zamandan tasarruf edebilir, iş ya da okul temponuza uygun
            saatlerde görüşme sağlayabilirsiniz. Bu esneklik, Aydın psikolog
            arayışında sürdürülebilir bir destek almayı mümkün kılar.
          </p>
        </section>

        <section className="space-y-4 text-base leading-relaxed text-foreground/80">
          <h2 className="text-2xl font-semibold text-foreground">
            Hangi konularda destek alabilirsiniz?
          </h2>
          <p>
            Her danışanın ihtiyacı farklıdır. Aydın psikolog desteği, yaşamın
            çeşitli alanlarında karşılaşılan zorlukları ele alabilir. Aşağıdaki
            başlıklar, sıklıkla çalışılan konuların bir özetidir:
          </p>
          <ul className="grid gap-2 md:grid-cols-2">
            {supportAreas.map((item) => (
              <li key={item} className="rounded-xl border border-border/60 bg-white/70 px-4 py-2">
                {item}
              </li>
            ))}
          </ul>
          <p>
            Bu başlıklar dışında da destek almak mümkündür. Aydın’da psikolog
            arayışınız varsa, size uygun yaklaşımı birlikte belirleyebiliriz.
          </p>
        </section>

        <section className="space-y-4 text-base leading-relaxed text-foreground/80">
          <h2 className="text-2xl font-semibold text-foreground">
            Seans süreci nasıl ilerler?
          </h2>
          <p>
            Aydın psikolog sürecinde amaç; güven, açıklık ve sürdürülebilir bir
            iş birliği kurmaktır. İlk görüşmede ihtiyaçlar ve hedefler
            netleştirilir. Sonraki seanslarda, belirlenen hedeflere göre
            yapılandırılmış bir yol izlenir. Seanslar genellikle 50 dakika
            sürer ve sıklık sizin ihtiyaçlarınıza göre belirlenir.
          </p>
          <p>
            Online görüşmeler için stabil internet bağlantısı ve sessiz bir
            ortam yeterlidir. Yüz yüze seanslarda ise Aydın merkezdeki ofiste,
            sakin ve güvenli bir danışmanlık ortamı sunulur. Aydın’da psikolog
            desteği almak isteyenler için esnek saatler ve düzenli takip ön planda
            tutulur.
          </p>
          <p>
            Gizlilik ve etik ilkeler, sürecin temelini oluşturur. Paylaşılan
            bilgiler, mesleki gizlilik kapsamında korunur. Bu sayede Aydın
            psikolog arayışınız güvenli bir zeminde karşılık bulur.
          </p>
        </section>

        <section className="space-y-4 text-base leading-relaxed text-foreground/80">
          <h2 className="text-2xl font-semibold text-foreground">
            Aydın psikolog seçerken nelere dikkat edilmeli?
          </h2>
          <p>
            Aydın psikolog araması yaparken, beklentilerinize uygun bir uzmanla
            çalışmak sürecin verimini artırır. Mezuniyet, mesleki eğitimler ve
            etik ilkelere bağlılık önemli bir başlangıçtır; ancak asıl belirleyici
            olan, sizin kendinizi ne kadar rahat ve güvende hissettiğinizdir.
            İlk görüşme, karşılıklı uyumu değerlendirmek için iyi bir fırsattır.
          </p>
          <p>
            Seansların hedefi yalnızca “problem çözmek” değildir; duygu
            düzenleme becerilerini geliştirmek, ilişkilerde sınırları fark etmek
            ve yaşam kalitesini artırmak da danışmanlığın önemli parçalarıdır.
            Aydın’da psikolog desteği alırken, sürecin ritminin size uygun
            olması, gerçekçi hedefler konulması ve düzenli takip sağlanması
            sürdürülebilir ilerleme için kritiktir.
          </p>
          <p>
            Ayrıca, Aydın merkezde ulaşım kolaylığı, seanslara düzenli devam
            etmeyi destekler. Online görüşme seçeneği ise şehir dışı yoğunluğu
            olan danışanlar için iyi bir alternatiftir. Bu esneklik, Aydın
            psikolog arayışında uzun vadeli destek almayı kolaylaştırır.
          </p>
        </section>

        <section className="space-y-4 text-base leading-relaxed text-foreground/80">
          <h2 className="text-2xl font-semibold text-foreground">
            Aydın’da psikolog desteğinin hedefi nedir?
          </h2>
          <p>
            Danışmanlığın temel amacı; kişinin kendi iç dünyasını daha iyi
            tanıması, zorlayıcı duygularla baş etme becerilerini güçlendirmesi ve
            ilişkilerde daha sağlıklı sınırlar kurabilmesidir. Aydın psikolog
            desteği, yalnızca kriz dönemlerinde değil, yaşamın daha dengeli ve
            sürdürülebilir hale gelmesi için de tercih edilebilir.
          </p>
          <p>
            Süreç boyunca hedefler düzenli olarak gözden geçirilir. Danışan, kendi
            kaynaklarını keşfettikçe, karar verme ve problem çözme becerileri de
            güçlenir. Aydın’da psikolog arayanlar için bu yapılandırılmış süreç,
            kısa vadeli rahatlamanın ötesinde kalıcı dönüşümü destekler.
          </p>
          <p>
            Eğer Aydın psikolog arayışınızda güvenli bir alan, net bir yol haritası
            ve profesyonel bir destek istiyorsanız, sürecin her aşamasında birlikte
            karar vererek ilerleyebiliriz.
          </p>
        </section>

        <section className="space-y-4 text-base leading-relaxed text-foreground/80">
          <h2 className="text-2xl font-semibold text-foreground">
            Neden Psikolog Gülçin Bulut?
          </h2>
          <p>
            Psikolog Gülçin Bulut, danışan odaklı, nazik ve yapılandırılmış bir
            yaklaşımı benimser. Aydın’da psikolog arayan danışanlar için süreç;
            güvenli bir ilişkide, gerçekçi hedeflerle ve sürdürülebilir adımlarla
            ilerler. Her danışanın yaşamı ve ihtiyaçları farklıdır; bu nedenle
            seanslar kişiye özel planlanır.
          </p>
          <p>
            Aydın psikolog desteği arayanlar için en önemli noktalardan biri,
            kendini rahat hissedebilmek ve anlaşılmaktır. Seanslarda empati,
            açıklık ve saygı ön plandadır. Sürecin her aşamasında birlikte karar
            verir, birlikte ilerleriz.
          </p>
        </section>

        <section className="space-y-4 text-base leading-relaxed text-foreground/80">
          <h2 className="text-2xl font-semibold text-foreground">
            Aydın merkezde ulaşım ve randevu
          </h2>
          <p>
            Aydın merkezdeki ofis konumu sayesinde ulaşım kolaydır. Aydın’da
            psikolog desteği almak isteyen danışanlar için konforlu bir görüşme
            ortamı sunulur. Randevu talebinizi online olarak hızlıca
            oluşturabilirsiniz. Uygun seans saatlerini birlikte belirleyerek
            süreci başlatmak mümkündür.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/randevu">Randevu Oluştur</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/hakkinda">Hakkında</Link>
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Sık sorulan sorular</h2>
          <Accordion type="single" collapsible className="rounded-2xl border border-border/70 bg-white/70 p-4">
            {faqs.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
