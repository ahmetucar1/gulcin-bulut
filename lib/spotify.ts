import { cache } from "react";

type SpotifyOEmbed = {
  title?: string;
  author_name?: string;
};

export type SpotifyCard = {
  embedUrl: string;
  openUrl: string;
  title: string;
  author: string;
  thumbnailUrl: string | null;
};

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

async function fetchSpotifyOEmbed(openUrl: string): Promise<SpotifyOEmbed | null> {
  try {
    const res = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(openUrl)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    return (await res.json()) as SpotifyOEmbed;
  } catch {
    return null;
  }
}

export const getSpotifyCards = cache(async (embeds: string[]): Promise<SpotifyCard[]> => {
  const results = await Promise.all(
    embeds.map(async (embedUrl) => {
      const openUrl = toOpenUrl(embedUrl);
      const data = await fetchSpotifyOEmbed(openUrl);
      return {
        embedUrl,
        openUrl,
        title: data?.title ?? "Spotify Bölümü",
        author: data?.author_name ?? "",
        thumbnailUrl: `/api/spotify-image?url=${encodeURIComponent(openUrl)}`
      } as SpotifyCard;
    })
  );

  return results;
});
