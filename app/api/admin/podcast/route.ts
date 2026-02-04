import fs from "fs";
import path from "path";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

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

  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";

  if (!adminEnabled) {
    const filePath = path.join(process.cwd(), "content", "podcast.json");
    const existing = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : {};
    const nextData = {
      title: existing?.title ?? "Psikoloji Sohbetleri",
      embeds: safeEmbeds
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
      embeds: safeEmbeds
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
