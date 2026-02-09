const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY || "";
const DEFAULT_ENDPOINTS = [
  process.env.TRANSLATE_API_URL,
  "https://libretranslate.de/translate",
  "https://translate.astian.org/translate",
  "https://libretranslate.com/translate"
].filter(Boolean) as string[];

export async function translateText(
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

  return text;
}
