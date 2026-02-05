import { NextResponse } from "next/server";

export const runtime = "nodejs";

function toOpenUrl(input: string) {
  try {
    const url = new URL(input);
    if (url.pathname.includes("/embed/")) {
      url.pathname = url.pathname.replace("/embed/", "/");
      url.search = "";
      return url.toString();
    }
    return url.toString();
  } catch {
    return input.replace("/embed/", "/");
  }
}

function extractMetaImage(html: string) {
  const ogMatch = html.match(/property="og:image"\s+content="([^"]+)"/i);
  if (ogMatch?.[1]) return ogMatch[1];
  const twitterMatch = html.match(/name="twitter:image"\s+content="([^"]+)"/i);
  if (twitterMatch?.[1]) return twitterMatch[1];
  return null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("url") ?? searchParams.get("embed") ?? "";
  if (!raw) {
    return new NextResponse("Missing url", { status: 400 });
  }

  const openUrl = toOpenUrl(raw);
  const oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(openUrl)}`;

  try {
    const oembedRes = await fetch(oembedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json"
      }
    });
    let thumbnailUrl: string | null = null;
    if (oembedRes.ok) {
      const oembed = (await oembedRes.json()) as {
        thumbnail_url?: string;
      };
      thumbnailUrl = oembed.thumbnail_url ?? null;
    }

    if (!thumbnailUrl) {
      const pageRes = await fetch(openUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "text/html"
        }
      });
      if (pageRes.ok) {
        const html = await pageRes.text();
        thumbnailUrl = extractMetaImage(html);
      }
    }

    if (!thumbnailUrl) {
      return new NextResponse("Not found", { status: 404 });
    }

    const imageRes = await fetch(thumbnailUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8"
      }
    });
    if (!imageRes.ok) {
      return new NextResponse("Not found", { status: 404 });
    }
    const contentType = imageRes.headers.get("content-type") ?? "image/jpeg";
    const buffer = Buffer.from(await imageRes.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable"
      }
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
