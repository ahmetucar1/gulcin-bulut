const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY || "";
const DEFAULT_ENDPOINTS = [
  process.env.TRANSLATE_API_URL,
  "https://libretranslate.de/translate",
  "https://translate.astian.org/translate",
  "https://libretranslate.com/translate"
].filter(Boolean) as string[];

const MAX_CHUNK = 3500;

async function translateChunk(
  text: string,
  source = "tr",
  target = "en"
) {
  const trimmed = text.trim();
  if (!trimmed) return "";

  for (const endpoint of DEFAULT_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "psikologgulcin.com"
        },
        body: JSON.stringify({
          q: trimmed,
          source,
          target,
          format: "text",
          ...(TRANSLATE_API_KEY ? { api_key: TRANSLATE_API_KEY } : {})
        })
      });

      if (!res.ok) continue;
      const data = (await res.json()) as { translatedText?: string };
      if (data?.translatedText?.trim()) {
        return data.translatedText.trim();
      }
    } catch {
      continue;
    }
  }

  try {
    const googleUrl =
      "https://translate.googleapis.com/translate_a/single" +
      `?client=gtx&sl=${encodeURIComponent(source)}` +
      `&tl=${encodeURIComponent(target)}` +
      `&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(googleUrl, {
      headers: { "User-Agent": "psikologgulcin.com" }
    });
    if (res.ok) {
      const data = (await res.json()) as any;
      const translated = Array.isArray(data?.[0])
        ? data[0].map((part: any) => part?.[0]).join("")
        : "";
      if (translated?.trim()) return translated.trim();
    }
  } catch {
    // ignore
  }

  return text;
}

export async function translateText(
  text: string,
  source = "tr",
  target = "en"
) {
  const trimmed = text.trim();
  if (!trimmed) return "";

  if (trimmed.length <= MAX_CHUNK) {
    return translateChunk(trimmed, source, target);
  }

  const blocks = trimmed.split(/\n\n+/);
  const chunks: string[] = [];
  let current = "";

  for (const block of blocks) {
    const next = current ? `${current}\n\n${block}` : block;
    if (next.length > MAX_CHUNK) {
      if (current) chunks.push(current);
      current = block;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);

  const translatedChunks: string[] = [];
  for (const chunk of chunks) {
    translatedChunks.push(await translateChunk(chunk, source, target));
  }
  return translatedChunks.join("\n\n");
}
