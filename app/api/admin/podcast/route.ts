import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

type PodcastCard = {
  embedUrl: string;
  openUrl: string;
  title: string;
  author: string;
  thumbnailUrl: string | null;
};

function extractIframeSrc(input: string) {
  const match = input.match(/src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function normalizeSpotifyEmbed(input: string) {
  const raw = extractIframeSrc(input) ?? input;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("spotify.com")) {
      if (!url.pathname.includes("/embed/")) {
        url.pathname = url.pathname.replace(
          /^\/(episode|show|track|playlist)\//,
          "/embed/$1/"
        );
      }
      return url.toString();
    }
    return url.toString();
  } catch {
    return trimmed;
  }
}

function toOpenUrl(embedUrl: string) {
  try {
    const url = new URL(embedUrl);
    url.pathname = url.pathname.replace("/embed/", "/");
    url.search = "";
    return url.toString();
  } catch {
    return embedUrl.replace("/embed/", "/");
  }
}

async function fetchSpotifyOEmbed(openUrl: string) {
  try {
    const res = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(openUrl)}`
    );
    if (!res.ok) return null;
    return (await res.json()) as {
      title?: string;
      author_name?: string;
      thumbnail_url?: string;
    };
  } catch {
    return null;
  }
}

async function uploadThumbnailToStorage(url: string) {
  if (!adminBucket) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = Buffer.from(await res.arrayBuffer());
    const hash = createHash("sha1").update(url).digest("hex");
    const ext = contentType.includes("png")
      ? "png"
      : contentType.includes("webp")
      ? "webp"
      : "jpg";
    const filePath = `podcast/spotify-${hash}.${ext}`;
    const file = adminBucket.file(filePath);
    await file.save(buffer, {
      contentType,
      resumable: false,
      metadata: {
        cacheControl: "public, max-age=31536000, immutable"
      }
    });
    const [signedUrl] = await file.getSignedUrl({
      action: "read",
      expires: "03-01-2500"
    });
    return signedUrl;
  } catch {
    return null;
  }
}

async function buildPodcastCards(embeds: string[]): Promise<PodcastCard[]> {
  const cards = await Promise.all(
    embeds.map(async (embedUrl) => {
      const openUrl = toOpenUrl(embedUrl);
      const meta = await fetchSpotifyOEmbed(openUrl);
      const title = meta?.title ?? "Spotify Bölümü";
      const author = meta?.author_name ?? "";
      const thumbnailUrl = meta?.thumbnail_url ?? null;
      const storedThumbnail = thumbnailUrl
        ? await uploadThumbnailToStorage(thumbnailUrl)
        : null;

      return {
        embedUrl,
        openUrl,
        title,
        author,
        thumbnailUrl: storedThumbnail ?? thumbnailUrl
      };
    })
  );

  return cards;
}

export async function POST(req: Request) {
  const authResult = await verifyAdminRequest(req);
  if (!authResult.ok) {
    return NextResponse.json(
      { error: authResult.reason ?? "Yetkisiz." },
      { status: 401 }
    );
  }

  const { embeds } = (await req.json()) as { embeds?: string[] };
  const safeEmbeds = (embeds ?? [])
    .map((item) => normalizeSpotifyEmbed(item))
    .filter(Boolean) as string[];
  const cards = await buildPodcastCards(safeEmbeds);

  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";

  if (!adminEnabled) {
    const filePath = path.join(process.cwd(), "content", "podcast.json");
    const existing = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : {};
    const nextData = {
      title: existing?.title ?? "Psikoloji Sohbetleri",
      embeds: safeEmbeds,
      cards
    };
    fs.writeFileSync(filePath, JSON.stringify(nextData, null, 2));
    return NextResponse.json(nextData);
  }

  if (!adminDb) {
    return NextResponse.json(
      { error: "Firebase yapılandırması eksik." },
      { status: 500 }
    );
  }

  try {
    const docRef = adminDb.collection("settings").doc("podcast");
    const existing = await docRef.get();
    const existingData = existing.exists ? existing.data() : {};
    const nextData = {
      title: existingData?.title ?? "Psikoloji Sohbetleri",
      embeds: safeEmbeds,
      cards
    };
    await docRef.set(nextData, { merge: true });
    revalidateTag("podcast");
    return NextResponse.json(nextData);
  } catch (error) {
    return NextResponse.json(
      { error: "Firebase kaydı başarısız." },
      { status: 500 }
    );
  }
}
