# Psikolog Gülçin Bulut

Modern ve minimal tasarımlı, Next.js App Router tabanlı web sitesi.

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Ortam Değişkenleri

`.env.local` örneği:

```bash
NEXT_PUBLIC_GOOGLE_BOOKING_URL="https://calendar.google.com/calendar/appointments/schedules/..."
NEXT_PUBLIC_SITE_URL="https://ornek-domain.com"
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
FIREBASE_PROJECT_ID=""
FIREBASE_CLIENT_EMAIL=""
FIREBASE_PRIVATE_KEY=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_ADMIN_ENABLED="true"
NEXT_PUBLIC_ADMIN_EMAIL=""
NEXT_PUBLIC_ADMIN_UID=""
ADMIN_EMAIL=""
ADMIN_UID=""
ADMIN_TOKEN=""
```

- `NEXT_PUBLIC_GOOGLE_BOOKING_URL` boşsa `/randevu` sayfasında bilgilendirme mesajı gösterilir.
- `NEXT_PUBLIC_SITE_URL` SEO (OpenGraph, sitemap, robots, JSON-LD) için kullanılır.
- `NEXT_PUBLIC_FIREBASE_*` değişkenleri yönetim panelinde Google girişini çalıştırır.
- `FIREBASE_*` değişkenleri (Admin SDK) içeriklerin Firebase’e yazılması için gereklidir.
- `FIREBASE_ADMIN_ENABLED` `true` olursa Admin SDK aktifleşir.
- `NEXT_PUBLIC_ADMIN_EMAIL` veya `NEXT_PUBLIC_ADMIN_UID` ile tarayıcı tarafında izin verilir.
- `ADMIN_EMAIL` veya `ADMIN_UID` ile sunucu tarafında izin verilir.
- `ADMIN_TOKEN` tanımlarsanız API isteklerinde `x-admin-token` ile kullanılabilir.

## Vercel Deploy

1. Bu repoyu Vercel’e bağlayın.
2. Environment Variables bölümüne yukarıdaki değişkenleri ekleyin.
3. Deploy edin.

## İçerik Yönetimi

- `content/about.md`: Hakkında içeriği
- `content/contact.json`: İletişim bilgileri
- `content/social.json`: Instagram içerik kartları
- `content/podcast.json`: Podcast içerikleri
- `content/blog.json`: Blog yazıları
- `public/images/`: Görseller

## Yönetim Paneli

`/yonetim` sayfasından blog, Instagram ve podcast içeriklerini güncelleyebilirsiniz.
Bu alan Google girişlidir ve sadece izinli e-posta/UID ile çalışır.

Not: Firebase yapılandırması yapılmazsa içerikler dosya tabanlı çalışır ve
değişiklikler kalıcı olmayabilir. Firebase etkinleştirildiğinde değişiklikler
kalıcıdır.

## Firebase Kurulumu (Özet)

1. Firebase Console’da proje oluşturun.
2. Firestore ve Storage’ı etkinleştirin.
3. Service Account oluşturup `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`,
   `FIREBASE_PRIVATE_KEY` değerlerini `.env.local` içine yazın.
4. Storage bucket adını `FIREBASE_STORAGE_BUCKET` olarak girin.
5. Yönetim paneli için `NEXT_PUBLIC_ADMIN_EMAIL` + `ADMIN_EMAIL` (veya UID) girin.
6. (Opsiyonel) `ADMIN_TOKEN` belirleyin.
# gulcin-bulut
