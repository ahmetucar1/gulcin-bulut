const TRANSLATE_API_URL =
  process.env.TRANSLATE_API_URL || "https://libretranslate.com/translate";
const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY || "";

export async function translateText(
  text: string,
  source = "tr",
  target = "en"
) {
  const trimmed = text.trim();
  if (!trimmed) return "";

  try {
    const res = await fetch(TRANSLATE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: trimmed,
        source,
        target,
        format: "text",
        ...(TRANSLATE_API_KEY ? { api_key: TRANSLATE_API_KEY } : {})
      })
    });

    if (!res.ok) return text;
    const data = (await res.json()) as { translatedText?: string };
    return data.translatedText?.trim() || text;
  } catch {
    return text;
  }
}
