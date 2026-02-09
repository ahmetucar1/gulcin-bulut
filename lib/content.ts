import fs from "fs";
import path from "path";
import { unstable_cache } from "next/cache";

import { adminDb } from "@/lib/firebase-admin";

const contentDir = path.join(process.cwd(), "content");

function readFile(fileName: string) {
  return fs.readFileSync(path.join(contentDir, fileName), "utf8");
}

export function getAboutMarkdown(locale: "tr" | "en" = "tr") {
  return readFile(locale === "en" ? "about.en.md" : "about.md");
}

export function getAboutExcerpt(maxLength = 260, locale: "tr" | "en" = "tr") {
  const raw = getAboutMarkdown(locale);
  const firstParagraph = raw
    .split("\n\n")
    .find((block) => !block.startsWith("#"))
    ?.replace(/[#*]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!firstParagraph) return "";
  if (firstParagraph.length <= maxLength) return firstParagraph;
  return `${firstParagraph.slice(0, maxLength).trim()}…`;
}

export function getContact() {
  const raw = readFile("contact.json");
  return JSON.parse(raw) as {
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    address: string;
    mapUrl: string;
    googleBusinessUrl?: string;
  };
}

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

function normalizeInstagramUrl(input: string) {
  const match = input.match(/instagram\.com\/(reel|p|tv)\/([^/?#\"']+)/i);
  if (match) {
    return `https://www.instagram.com/${match[1]}/${match[2]}/`;
  }
  return input.trim();
}

type PodcastCard = {
  embedUrl: string;
  openUrl?: string;
  title?: string;
  author?: string;
  thumbnailUrl?: string | null;
};

async function getSocialFromFirestore() {
  if (!adminDb) return null;
  const snapshot = await adminDb.collection("settings").doc("social").get();
  if (!snapshot.exists) return null;
  const data = snapshot.data() as {
    platform: string;
    profileUrl: string;
    cards: { title: string; url: string; description: string }[];
  };
  const cards = Array.isArray(data.cards) ? data.cards : [];
  return {
    ...data,
    cards: cards
      .map((card) => ({
        ...card,
        url: normalizeInstagramUrl(card.url)
      }))
      .filter((card) => card.url)
  };
}

async function getPodcastFromFirestore() {
  if (!adminDb) return null;
  const snapshot = await adminDb.collection("settings").doc("podcast").get();
  if (!snapshot.exists) return null;
  const data = snapshot.data() as {
    title: string;
    spotifyEmbedUrl?: string;
    embeds?: string[];
    episodes?: { title: string; url: string; description: string }[];
    cards?: PodcastCard[];
  };
  const embeds = Array.isArray(data.embeds) ? data.embeds : [];
  const cards = Array.isArray(data.cards) ? data.cards : undefined;
  return {
    ...data,
    cards,
    embeds: embeds
      .map((item) => normalizeSpotifyEmbed(item))
      .filter((item) => item) as string[]
  };
}

async function getBlogPostsFromFirestore() {
  if (!adminDb) return [];
  const snapshot = await adminDb
    .collection("blogPosts")
    .orderBy("date", "desc")
    .get();
  return snapshot.docs.map((doc) => doc.data()) as {
    slug: string;
    title: string;
    titleEn?: string;
    excerpt: string;
    excerptEn?: string;
    content: string;
    contentEn?: string;
    image: string;
    date: string;
  }[];
}

async function getBlogPostFromFirestore(slug: string) {
  if (!adminDb) return undefined;
  const snapshot = await adminDb.collection("blogPosts").doc(slug).get();
  if (!snapshot.exists) return undefined;
  return snapshot.data() as {
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
}

const getSocialCached = unstable_cache(getSocialFromFirestore, ["social"], {
  revalidate: 120,
  tags: ["social"]
});

const getPodcastCached = unstable_cache(getPodcastFromFirestore, ["podcast"], {
  revalidate: 120,
  tags: ["podcast"]
});

const getBlogPostsCached = unstable_cache(getBlogPostsFromFirestore, ["blogPosts"], {
  revalidate: 120,
  tags: ["blog"]
});

export async function getSocial() {
  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";
  if (adminEnabled && adminDb) {
    try {
      const data = await getSocialCached();
      if (data) return data;
    } catch (error) {
      console.warn("Firebase sosyal verisi okunamadı, yerel içeriğe dönülüyor.", error);
    }
    return {
      platform: "Instagram",
      profileUrl: "",
      cards: []
    };
  }

  if (adminEnabled) {
    return {
      platform: "Instagram",
      profileUrl: "",
      cards: []
    };
  }

  const raw = readFile("social.json");
  const parsed = JSON.parse(raw) as {
    platform: string;
    profileUrl: string;
    cards: { title: string; url: string; description: string }[];
  };
  const cards = Array.isArray(parsed.cards) ? parsed.cards : [];
  return {
    ...parsed,
    cards: cards
      .map((card) => ({
        ...card,
        url: normalizeInstagramUrl(card.url)
      }))
      .filter((card) => card.url)
  };
}

export async function getPodcast() {
  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";
  if (adminEnabled && adminDb) {
    try {
      const data = await getPodcastCached();
      if (data) return data;
    } catch (error) {
      console.warn("Firebase podcast verisi okunamadı, yerel içeriğe dönülüyor.", error);
    }
    return {
      title: "Psikoloji Sohbetleri",
      embeds: []
    };
  }

  if (adminEnabled) {
    return {
      title: "Psikoloji Sohbetleri",
      embeds: []
    };
  }

  const raw = readFile("podcast.json");
  const parsed = JSON.parse(raw) as {
    title: string;
    spotifyEmbedUrl?: string;
    embeds?: string[];
    episodes?: { title: string; url: string; description: string }[];
    cards?: PodcastCard[];
  };
  const embeds = Array.isArray(parsed.embeds) ? parsed.embeds : [];
  const cards = Array.isArray(parsed.cards) ? parsed.cards : undefined;
  return {
    ...parsed,
    cards,
    embeds: embeds
      .map((item) => normalizeSpotifyEmbed(item))
      .filter((item) => item) as string[]
  };
}

export async function getBlogPosts() {
  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";
  if (adminEnabled && adminDb) {
    try {
      return await getBlogPostsCached();
    } catch (error) {
      console.warn("Firebase blog verisi okunamadı, yerel içeriğe dönülüyor.", error);
    }
    return [];
  }

  if (adminEnabled) {
    return [];
  }

  const raw = readFile("blog.json");
  const data = JSON.parse(raw) as {
    posts: {
      slug: string;
      title: string;
      titleEn?: string;
      excerpt: string;
      excerptEn?: string;
      content: string;
      contentEn?: string;
      image: string;
      date: string;
    }[];
  };

  return data.posts ?? [];
}

export async function getBlogPost(slug: string) {
  const adminEnabled = process.env.FIREBASE_ADMIN_ENABLED === "true";
  if (adminEnabled && adminDb) {
    try {
      const cached = unstable_cache(
        async () => getBlogPostFromFirestore(slug),
        ["blogPost", slug],
        { revalidate: 120, tags: ["blog"] }
      );
      const data = await cached();
      if (data) return data;
    } catch (error) {
      console.warn("Firebase blog verisi okunamadı, yerel içeriğe dönülüyor.", error);
    }
    return undefined;
  }

  if (adminEnabled) {
    return undefined;
  }

  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
