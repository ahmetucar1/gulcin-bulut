import fs from "fs";
import path from "path";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { verifyAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

async function ensureStorageBucket() {
  if (!adminBucket) return false;
  const [exists] = await adminBucket.exists();
  return exists;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  const authResult = await verifyAdminRequest(req);
  if (!authResult.ok) {
    return NextResponse.json(
      { error: authResult.reason ?? "Yetkisiz." },
      { status: 401 }
    );
  }

  const formData = await req.formData();
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const titleEnRaw = String(formData.get("titleEn") || "").trim();
  const contentEnRaw = String(formData.get("contentEn") || "").trim();
  const image = formData.get("image") as File | null;

  if (!title || !content || !image) {
    return NextResponse.json(
      { error: "Başlık, içerik ve görsel zorunlu." },
      { status: 400 }
    );
  }

  const mime = image.type || "image/jpeg";
  const ext = mime.includes("png")
    ? ".png"
    : mime.includes("webp")
    ? ".webp"
    : ".jpg";

  const buffer = Buffer.from(await image.arrayBuffer());
  const excerpt = content.replace(/\s+/g, " ").slice(0, 180);
  const titleEn = titleEnRaw || (contentEnRaw ? title : "");
  const contentEn = contentEnRaw;
  const excerptEn = contentEn
    ? contentEn.replace(/\s+/g, " ").slice(0, 180)
    : "";
  const buildPost = (slug: string, imageUrl: string, storagePath?: string) => ({
    slug,
    title,
    titleEn: titleEn || undefined,
    excerpt: excerpt.length < content.length ? `${excerpt}…` : excerpt,
    excerptEn:
      contentEn && excerptEn.length < contentEn.length ? `${excerptEn}…` : contentEn ? excerptEn : undefined,
    content,
    contentEn: contentEn || undefined,
    image: imageUrl,
    date: new Date().toISOString(),
    ...(storagePath ? { storagePath } : {})
  });

  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";

  if (!adminEnabled) {
    const blogFile = path.join(process.cwd(), "content", "blog.json");
    const existing = fs.existsSync(blogFile)
      ? JSON.parse(fs.readFileSync(blogFile, "utf8"))
      : { posts: [] };
    const posts: any[] = existing.posts ?? [];

    let slugBase = slugify(title);
    if (!slugBase) slugBase = "yazi";
    let slug = slugBase;
    let count = 2;
    while (posts.some((post) => post.slug === slug)) {
      slug = `${slugBase}-${count}`;
      count += 1;
    }

    const uploadDir = path.join(process.cwd(), "public", "images", "blog");
    fs.mkdirSync(uploadDir, { recursive: true });
    const localFilePath = path.join(uploadDir, `${slug}${ext}`);
    fs.writeFileSync(localFilePath, buffer);

    const post = buildPost(slug, `/images/blog/${slug}${ext}`);
    const nextPosts = [post, ...posts];
    fs.writeFileSync(blogFile, JSON.stringify({ posts: nextPosts }, null, 2));

    return NextResponse.json({ posts: nextPosts, post });
  }

  if (!adminDb || !adminBucket) {
    return NextResponse.json(
      { error: "Firebase yapılandırması eksik." },
      { status: 500 }
    );
  }

  try {
    const bucketReady = await ensureStorageBucket();
    if (!bucketReady) {
      return NextResponse.json(
        {
          error:
            "Firebase Storage etkin değil veya bucket bulunamadı. Firebase Console > Storage bölümünden etkinleştirip FIREBASE_STORAGE_BUCKET değerini doğru bucket adıyla güncelleyin."
        },
        { status: 500 }
      );
    }

    let slugBase = slugify(title);
    if (!slugBase) slugBase = "yazi";
    let slug = slugBase;
    let count = 2;
    while ((await adminDb.collection("blogPosts").doc(slug).get()).exists) {
      slug = `${slugBase}-${count}`;
      count += 1;
    }

    const filePath = `blog/${slug}${ext}`;
    const file = adminBucket.file(filePath);
    await file.save(buffer, {
      contentType: mime,
      resumable: false
    });

    const [signedUrl] = await file.getSignedUrl({
      action: "read",
      expires: "03-01-2500"
    });

    const post = buildPost(slug, signedUrl, filePath);
    await adminDb.collection("blogPosts").doc(slug).set(post);

    const snapshot = await adminDb
      .collection("blogPosts")
      .orderBy("date", "desc")
      .get();
    const posts = snapshot.docs.map((doc) => doc.data());
    revalidateTag("blog");
    return NextResponse.json({ posts, post });
  } catch (error) {
    return NextResponse.json(
      { error: "Firebase kaydı başarısız." },
      { status: 500 }
    );
  }
}
