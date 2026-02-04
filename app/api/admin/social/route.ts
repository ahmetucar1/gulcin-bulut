import fs from "fs";
import path from "path";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

function normalizeInstagramUrl(input: string) {
  const match = input.match(/instagram\.com\/(reel|p|tv)\/([^/?#\"']+)/i);
  if (match) {
    return `https://www.instagram.com/${match[1]}/${match[2]}/`;
  }
  return input.trim();
}

function buildTitle(url: string) {
  const match = url.match(/instagram\.com\/(reel|p|tv)\/([^/?#]+)/i);
  if (!match) return "Instagram gönderisi";
  const type = match[1].toLowerCase();
  const code = match[2];
  return type === "reel" ? `Reel: ${code}` : `Gönderi: ${code}`;
}

export async function POST(req: Request) {
  const authResult = await verifyAdminRequest(req);
  if (!authResult.ok) {
    return NextResponse.json(
      { error: authResult.reason ?? "Yetkisiz." },
      { status: 401 }
    );
  }

  const { urls } = (await req.json()) as { urls?: string[] };
  const safeUrls = (urls ?? [])
    .map((item) => normalizeInstagramUrl(item))
    .filter(Boolean);

  const cards = safeUrls.map((url) => ({
    title: buildTitle(url),
    url,
    description: "Instagram gönderisi."
  }));

  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";

  if (!adminEnabled) {
    const filePath = path.join(process.cwd(), "content", "social.json");
    const existing = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : {};
    const nextData = {
      platform: existing?.platform ?? "Instagram",
      profileUrl: existing?.profileUrl ?? "",
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
    const docRef = adminDb.collection("settings").doc("social");
    const existing = await docRef.get();
    const existingData = existing.exists ? existing.data() : {};
    const nextData = {
      platform: existingData?.platform ?? "Instagram",
      profileUrl: existingData?.profileUrl ?? "",
      cards
    };
    await docRef.set(nextData, { merge: true });
    revalidateTag("social");
    return NextResponse.json(nextData);
  } catch (error) {
    return NextResponse.json(
      { error: "Firebase kaydı başarısız." },
      { status: 500 }
    );
  }
}
