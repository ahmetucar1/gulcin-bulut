import { DeferredIframe } from "@/components/deferred-iframe";

function toEmbedUrl(url: string) {
  const match = url.match(/instagram\.com\/(reel|p|tv)\/([^/?#]+)/);
  if (!match) return null;
  return `https://www.instagram.com/${match[1]}/${match[2]}/embed/`;
}

export function InstagramEmbed({
  url,
  className
}: {
  url: string;
  className?: string;
}) {
  const embedUrl = toEmbedUrl(url);

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="block rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm text-foreground/80"
      >
        Gönderiyi Instagram’da görüntüle
      </a>
    );
  }

  return (
    <div
      className={`relative h-[423px] overflow-hidden rounded-2xl border border-border/70 bg-white/70 shadow-soft ${
        className ?? ""
      }`}
    >
      <DeferredIframe
        src={embedUrl}
        title="Instagram gönderisi"
        allow="encrypted-media; clipboard-write; picture-in-picture"
        wrapperClassName="h-full w-full"
        iframeClassName="block h-[703px] w-full -mt-24 pointer-events-none"
        rootMargin="800px"
      />
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram gönderisini aç"
        className="absolute inset-0 z-10"
      />
    </div>
  );
}
