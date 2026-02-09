"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from "firebase/auth";

import { getFirebaseAuth } from "@/lib/firebase-client";

type SocialData = {
  platform: string;
  profileUrl: string;
  cards: { title: string; url: string; description: string }[];
};

type PodcastData = {
  title: string;
  embeds?: string[];
};

type BlogPost = {
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  image: string;
  date: string;
};

const parseList = (value?: string) =>
  value
    ? value
        .split(/[,\n;]/g)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

export function AdminPanel({
  initialSocial,
  initialPodcast,
  initialPosts
}: {
  initialSocial: SocialData;
  initialPodcast: PodcastData;
  initialPosts: BlogPost[];
}) {
  const [authReady, setAuthReady] = useState(false);
  const [authUser, setAuthUser] = useState<{
    uid: string;
    email?: string | null;
  } | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const [instagramUrls, setInstagramUrls] = useState(
    (initialSocial.cards ?? []).map((card) => card.url)
  );
  const [podcastEmbeds, setPodcastEmbeds] = useState(
    initialPodcast.embeds ?? []
  );
  const [blogPosts, setBlogPosts] = useState(initialPosts);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editingImagePreview, setEditingImagePreview] = useState<string | null>(null);
  const [lastSavedSlug, setLastSavedSlug] = useState<string | null>(null);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogTitleEn, setBlogTitleEn] = useState("");
  const [blogContentEn, setBlogContentEn] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  const adminEmails = useMemo(
    () =>
      parseList(process.env.NEXT_PUBLIC_ADMIN_EMAIL).map((email) =>
        email.toLowerCase()
      ),
    []
  );
  const adminUids = useMemo(
    () => parseList(process.env.NEXT_PUBLIC_ADMIN_UID),
    []
  );

  const auth = useMemo(() => getFirebaseAuth(), []);

  const mapAuthError = (error: unknown) => {
    const code = (error as { code?: string })?.code ?? "";
    switch (code) {
      case "auth/unauthorized-domain":
        return "Bu domain Firebase tarafından yetkilendirilmemiş. Firebase Console > Authentication > Settings > Authorized domains bölümüne Vercel domainini ekleyin.";
      case "auth/popup-blocked":
        return "Tarayıcı giriş penceresini engelledi. Yönlendirme ile giriş denenecek.";
      case "auth/operation-not-supported-in-this-environment":
        return "Bu ortamda popup giriş desteklenmiyor. Yönlendirme ile giriş denenecek.";
      case "auth/popup-closed-by-user":
        return "Giriş penceresi kapatıldı. Tekrar deneyin.";
      case "auth/network-request-failed":
        return "Ağ hatası oluştu. İnternet bağlantısını kontrol edin.";
      case "auth/invalid-api-key":
        return "Firebase API anahtarı eksik veya hatalı görünüyor.";
      default:
        return code ? `Giriş yapılamadı (${code}).` : "Giriş yapılamadı. Lütfen tekrar deneyin.";
    }
  };

  const isAllowedUser = useCallback(
    (user: { uid: string; email?: string | null }) => {
    if (adminUids.length && adminUids.includes(user.uid)) return true;
    if (adminEmails.length) {
      const email = user.email?.toLowerCase() ?? "";
      return adminEmails.includes(email);
    }
    return false;
  },
    [adminEmails, adminUids]
  );

  useEffect(() => {
    if (!auth) {
      setAuthReady(true);
      setAuthError("Firebase istemci ayarları bulunamadı.");
      return;
    }

    getRedirectResult(auth).catch((error) => {
      if (error) {
        setAuthError(mapAuthError(error));
      }
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthUser(null);
        setAuthToken(null);
        setAuthReady(true);
        return;
      }

      const nextUser = { uid: user.uid, email: user.email };
      if (!isAllowedUser(nextUser)) {
        setAuthError("Bu hesaba erişim izni yok.");
        setAuthUser(null);
        setAuthToken(null);
        await signOut(auth);
        setAuthReady(true);
        return;
      }

      const token = await user.getIdToken();
      setAuthUser(nextUser);
      setAuthToken(token);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, [auth, adminEmails, adminUids, isAllowedUser]);

  const normalizeList = (values: string[], count = 3) => {
    const list = [...values];
    while (list.length < count) list.push("");
    return list.slice(0, count);
  };

  const handleSaveInstagram = async () => {
    setStatus(null);
    const urls = normalizeList(instagramUrls, 3).filter(Boolean);
    if (!authToken) {
      setStatus("Oturum doğrulanamadı. Lütfen tekrar giriş yapın.");
      return;
    }
    const jsonHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    };
    const res = await fetch("/api/admin/social", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ urls })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      if (Array.isArray(data?.cards)) {
        setInstagramUrls(data.cards.map((card: { url: string }) => card.url));
      }
      setStatus("Instagram içerikleri güncellendi.");
    } else {
      setStatus("Instagram içerikleri güncellenemedi.");
    }
  };

  const handleSavePodcast = async () => {
    setStatus(null);
    const embeds = normalizeList(podcastEmbeds, 3).filter(Boolean);
    if (!authToken) {
      setStatus("Oturum doğrulanamadı. Lütfen tekrar giriş yapın.");
      return;
    }
    const jsonHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    };
    const res = await fetch("/api/admin/podcast", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ embeds })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      if (Array.isArray(data?.embeds)) {
        setPodcastEmbeds(data.embeds);
      }
      setStatus("Podcast bölümleri güncellendi.");
    } else {
      setStatus("Podcast bölümleri güncellenemedi.");
    }
  };

  const handleSaveBlog = async () => {
    setStatus(null);
    if (!blogTitle || !blogContent) {
      setStatus("Lütfen başlık ve yazı ekleyin.");
      return;
    }

    if (!editingSlug && !blogImage) {
      setStatus("Yeni yazı için görsel zorunludur.");
      return;
    }

    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("content", blogContent);
    formData.append("titleEn", blogTitleEn);
    formData.append("contentEn", blogContentEn);
    if (blogImage) formData.append("image", blogImage);

    const endpoint = editingSlug ? `/api/admin/blog/${editingSlug}` : "/api/admin/blog";
    const method = editingSlug ? "PATCH" : "POST";
    const res = await fetch(endpoint, {
      method,
      ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
      body: formData
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      if (Array.isArray(data.posts)) {
        setBlogPosts(data.posts);
      } else if (data.post) {
        setBlogPosts((prev) => [data.post, ...prev]);
      }
      setBlogTitle("");
      setBlogContent("");
      setBlogTitleEn("");
      setBlogContentEn("");
      setBlogImage(null);
      setEditingSlug(null);
      setEditingImagePreview(null);
      setLastSavedSlug(data.post?.slug ?? null);
      setStatus(editingSlug ? "Blog yazısı güncellendi." : "Blog yazısı eklendi.");
    } else {
      const reason = data?.error
        ? ` (${data.error})`
        : "";
      setStatus(
        editingSlug
          ? `Blog yazısı güncellenemedi${reason}.`
          : `Blog yazısı eklenemedi${reason}.`
      );
    }
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingSlug(post.slug);
    setBlogTitle(post.title);
    setBlogContent(post.content);
    setBlogTitleEn(post.titleEn ?? "");
    setBlogContentEn(post.contentEn ?? "");
    setBlogImage(null);
    setEditingImagePreview(post.image);
  };

  const handleDeleteBlog = async (slug: string) => {
    setStatus(null);
    const confirmDelete = window.confirm("Bu blog yazısı silinsin mi?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/blog/${slug}`, {
      method: "DELETE",
      ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {})
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      if (Array.isArray(data.posts)) {
        setBlogPosts(data.posts);
      }
      if (editingSlug === slug) {
        setEditingSlug(null);
        setBlogTitle("");
        setBlogContent("");
        setBlogImage(null);
        setEditingImagePreview(null);
      }
      setStatus("Blog yazısı silindi.");
    } else {
      const reason = data?.error
        ? ` (${data.error})`
        : "";
      setStatus(`Blog yazısı silinemedi${reason}.`);
    }
  };

  if (!authReady) {
    return (
      <div className="rounded-3xl border border-border/70 bg-white/70 p-8 text-sm text-foreground/70 shadow-soft">
        Yükleniyor…
      </div>
    );
  }

  if (!adminEmails.length && !adminUids.length) {
    return (
      <div className="rounded-3xl border border-border/70 bg-white/70 p-8 text-sm text-foreground/70 shadow-soft">
        Yönetim paneli için izinli e-posta veya UID tanımlı değil.{" "}
        <span className="font-medium">
          .env.local içine NEXT_PUBLIC_ADMIN_EMAIL veya NEXT_PUBLIC_ADMIN_UID
          ekleyin.
        </span>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="rounded-3xl border border-border/70 bg-white/70 p-8 shadow-soft">
        <h2 className="text-2xl font-semibold">Yönetim Girişi</h2>
        <p className="mt-3 text-sm text-foreground/70">
          Bu alan yalnızca Gülçin için açık.
        </p>
        {authError ? (
          <p className="mt-3 text-sm text-red-600">{authError}</p>
        ) : null}
        <button
          onClick={async () => {
            if (!auth) return;
            setAuthError(null);
            try {
              const provider = new GoogleAuthProvider();
              await signInWithPopup(auth, provider);
            } catch (error) {
              const code = (error as { code?: string })?.code ?? "";
              const message = mapAuthError(error);
              setAuthError(message);
              if (
                code === "auth/popup-blocked" ||
                code === "auth/operation-not-supported-in-this-environment"
              ) {
                try {
                  const provider = new GoogleAuthProvider();
                  await signInWithRedirect(auth, provider);
                } catch (redirectError) {
                  setAuthError(mapAuthError(redirectError));
                }
              }
            }
          }}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
        >
          Google ile giriş yap
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/70 bg-white/70 p-6 shadow-soft">
        <div>
          <p className="text-sm text-foreground/60">Giriş yapan kullanıcı</p>
          <p className="text-lg font-semibold">{authUser.email ?? authUser.uid}</p>
        </div>
        <button
          onClick={async () => {
            if (!auth) return;
            await signOut(auth);
            setAuthUser(null);
            setAuthToken(null);
          }}
          className="inline-flex items-center justify-center rounded-full border border-border/70 px-5 py-2 text-sm font-medium"
        >
          Çıkış yap
        </button>
      </div>
      <div className="rounded-3xl border border-border/70 bg-white/70 p-8 shadow-soft">
        <h2 className="text-2xl font-semibold">Instagram içerikleri</h2>
        <p className="mt-2 text-sm text-foreground/70">
          3 gönderi linki girin. Örn: https://www.instagram.com/p/.../
        </p>
        <div className="mt-6 grid gap-3">
          {normalizeList(instagramUrls, 3).map((value, index) => (
            <input
              key={`ig-${index}`}
              value={value}
              onChange={(event) => {
                const next = [...instagramUrls];
                next[index] = event.target.value;
                setInstagramUrls(next);
              }}
              placeholder={`Gönderi ${index + 1} URL`}
              className="w-full rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm"
            />
          ))}
        </div>
        <button
          onClick={handleSaveInstagram}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
        >
          Instagram Kaydet
        </button>
      </div>

      <div className="rounded-3xl border border-border/70 bg-white/70 p-8 shadow-soft">
        <h2 className="text-2xl font-semibold">Podcast bölümleri</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Spotify embed linklerini girin (open.spotify.com/embed/episode/...).
        </p>
        <div className="mt-6 grid gap-3">
          {normalizeList(podcastEmbeds, 3).map((value, index) => (
            <input
              key={`pod-${index}`}
              value={value}
              onChange={(event) => {
                const next = [...podcastEmbeds];
                next[index] = event.target.value;
                setPodcastEmbeds(next);
              }}
              placeholder={`Bölüm ${index + 1} embed URL`}
              className="w-full rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm"
            />
          ))}
        </div>
        <button
          onClick={handleSavePodcast}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
        >
          Podcast Kaydet
        </button>
      </div>

      <div className="rounded-3xl border border-border/70 bg-white/70 p-8 shadow-soft">
        <h2 className="text-2xl font-semibold">
          {editingSlug ? "Blog yazısını düzenle" : "Yeni blog yazısı"}
        </h2>
        {editingSlug ? (
          <p className="mt-2 text-sm text-foreground/70">
            Düzenleme modundasınız. URL aynı kalır, içerik güncellenir.
          </p>
        ) : null}
        <p className="mt-2 text-sm text-foreground/70">
          İngilizce alanlar boş bırakılırsa otomatik çeviri denenir.
        </p>
        <div className="mt-6 grid gap-4">
          <input
            value={blogTitle}
            onChange={(event) => setBlogTitle(event.target.value)}
            placeholder="Başlık"
            className="w-full rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm"
          />
          <input
            value={blogTitleEn}
            onChange={(event) => setBlogTitleEn(event.target.value)}
            placeholder="Başlık (EN)"
            className="w-full rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm"
          />
          <textarea
            value={blogContent}
            onChange={(event) => setBlogContent(event.target.value)}
            placeholder="Yazı"
            rows={8}
            className="w-full rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm"
          />
          <textarea
            value={blogContentEn}
            onChange={(event) => setBlogContentEn(event.target.value)}
            placeholder="Yazı (EN)"
            rows={8}
            className="w-full rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setBlogImage(event.target.files ? event.target.files[0] : null)
            }
            className="w-full text-sm"
          />
          {editingImagePreview ? (
            <p className="text-xs text-foreground/60">
              Mevcut görsel kullanılacak. Yeni görsel seçerseniz güncellenir.
            </p>
          ) : null}
        </div>
        <button
          onClick={handleSaveBlog}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
        >
          {editingSlug ? "Blog Yazısını Güncelle" : "Blog Yazısı Ekle"}
        </button>
        {lastSavedSlug ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-foreground/70">
              Kaydedilen yazı: <strong>{lastSavedSlug}</strong>
            </span>
            <button
              onClick={() => router.push(`/blog/${lastSavedSlug}`)}
              className="rounded-full border border-border/70 px-4 py-1.5 text-sm"
            >
              Yazıyı Aç
            </button>
          </div>
        ) : null}
        {editingSlug ? (
          <button
            onClick={() => {
              setEditingSlug(null);
              setBlogTitle("");
              setBlogContent("");
              setBlogImage(null);
              setEditingImagePreview(null);
              setLastSavedSlug(null);
            }}
            className="mt-3 inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-2 text-sm font-medium"
          >
            Düzenlemeyi İptal Et
          </button>
        ) : null}
      </div>

      <div className="rounded-3xl border border-border/70 bg-white/70 p-8 shadow-soft">
        <h2 className="text-2xl font-semibold">Mevcut blog yazıları</h2>
        {blogPosts.length ? (
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            {blogPosts.map((post) => (
              <li key={post.slug} className="flex items-center justify-between">
                <span>{post.title}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEditBlog(post)}
                    className="text-foreground/80 underline-offset-4 hover:underline"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(post.slug)}
                    className="text-red-600 underline-offset-4 hover:underline"
                  >
                    Sil
                  </button>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Görüntüle
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-foreground/60">Henüz blog yazısı yok.</p>
        )}
      </div>

      {status ? (
        <div className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-foreground/80">
          {status}
        </div>
      ) : null}
    </div>
  );
}
