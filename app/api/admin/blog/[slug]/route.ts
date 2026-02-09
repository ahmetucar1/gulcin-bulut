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

async function listPostsFromFirestore() {
  if (!adminDb) return [];
  const snapshot = await adminDb.collection("blogPosts").orderBy("date", "desc").get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
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

  if (!title || !content) {
    return NextResponse.json(
      { error: "Başlık ve içerik zorunlu." },
      { status: 400 }
    );
  }

  const slug = params.slug;
  const excerpt = content.replace(/\s+/g, " ").slice(0, 180);
  const updateBase = {
    title,
    content,
    excerpt: excerpt.length < content.length ? `${excerpt}…` : excerpt,
    date: new Date().toISOString()
  };
  const updateEn: Record<string, string | undefined> = {};
  if (titleEnRaw) updateEn.titleEn = titleEnRaw;
  if (contentEnRaw) {
    const excerptEn = contentEnRaw.replace(/\s+/g, " ").slice(0, 180);
    updateEn.contentEn = contentEnRaw;
    updateEn.excerptEn =
      excerptEn.length < contentEnRaw.length ? `${excerptEn}…` : excerptEn;
  }

  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";

  if (!adminEnabled) {
    const blogFile = path.join(process.cwd(), "content", "blog.json");
    const existing = fs.existsSync(blogFile)
      ? JSON.parse(fs.readFileSync(blogFile, "utf8"))
      : { posts: [] };
    const posts: any[] = existing.posts ?? [];
    const index = posts.findIndex((post) => post.slug === slug);
    if (index === -1) {
      return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    }

    let imageUrl = posts[index].image;
    if (image) {
      const mime = image.type || "image/jpeg";
      const ext = mime.includes("png")
        ? ".png"
        : mime.includes("webp")
        ? ".webp"
        : ".jpg";
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "images", "blog");
      fs.mkdirSync(uploadDir, { recursive: true });
      const localFilePath = path.join(uploadDir, `${slug}${ext}`);
      fs.writeFileSync(localFilePath, buffer);
      imageUrl = `/images/blog/${slug}${ext}`;
    }

    posts[index] = { ...posts[index], ...updateBase, ...updateEn, image: imageUrl };
    fs.writeFileSync(blogFile, JSON.stringify({ posts }, null, 2));
    return NextResponse.json({ posts });
  }

  if (!adminDb || !adminBucket) {
    return NextResponse.json(
      { error: "Firebase yapılandırması eksik." },
      { status: 500 }
    );
  }

  try {
    const docRef = adminDb.collection("blogPosts").doc(slug);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    }

    const existing = snapshot.data() ?? {};
    let imageUrl = existing.image as string | undefined;
    let storagePath = existing.storagePath as string | undefined;

    if (image) {
      const bucketReady = await ensureStorageBucket();
      if (!bucketReady) {
        return NextResponse.json(
          {
            error:
              "Firebase Storage etkin değil veya bucket bulunamadı. Storage aktif olduktan sonra görsel güncelleyebilirsiniz."
          },
          { status: 500 }
        );
      }

      const mime = image.type || "image/jpeg";
      const ext = mime.includes("png")
        ? ".png"
        : mime.includes("webp")
        ? ".webp"
        : ".jpg";
      const buffer = Buffer.from(await image.arrayBuffer());
      const filePath = storagePath ?? `blog/${slug}${ext}`;
      const file = adminBucket.file(filePath);
      await file.save(buffer, { contentType: mime, resumable: false });
      const [signedUrl] = await file.getSignedUrl({
        action: "read",
        expires: "03-01-2500"
      });
      imageUrl = signedUrl;
      storagePath = filePath;
    }

    await docRef.set(
      {
        ...existing,
        ...updateBase,
        ...updateEn,
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(storagePath ? { storagePath } : {})
      },
      { merge: true }
    );

    const posts = await listPostsFromFirestore();
    revalidateTag("blog");
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: "Firebase güncelleme başarısız." }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const authResult = await verifyAdminRequest(req);
  if (!authResult.ok) {
    return NextResponse.json(
      { error: authResult.reason ?? "Yetkisiz." },
      { status: 401 }
    );
  }

  const slug = params.slug;

  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";

  if (!adminEnabled) {
    const blogFile = path.join(process.cwd(), "content", "blog.json");
    const existing = fs.existsSync(blogFile)
      ? JSON.parse(fs.readFileSync(blogFile, "utf8"))
      : { posts: [] };
    const posts: any[] = existing.posts ?? [];
    const nextPosts = posts.filter((post) => post.slug !== slug);
    fs.writeFileSync(blogFile, JSON.stringify({ posts: nextPosts }, null, 2));
    return NextResponse.json({ posts: nextPosts });
  }

  if (!adminDb) {
    return NextResponse.json(
      { error: "Firebase yapılandırması eksik." },
      { status: 500 }
    );
  }

  try {
    const docRef = adminDb.collection("blogPosts").doc(slug);
    const snapshot = await docRef.get();
    if (snapshot.exists && adminBucket) {
      const bucketReady = await ensureStorageBucket();
      const data = snapshot.data() ?? {};
      const storagePath = data.storagePath as string | undefined;
      if (storagePath && bucketReady) {
        await adminBucket.file(storagePath).delete({ ignoreNotFound: true });
      }
    }

    await docRef.delete();
    const posts = await listPostsFromFirestore();
    revalidateTag("blog");
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: "Firebase silme başarısız." }, { status: 500 });
  }
}
