export function SpotifyEmbed({ embedUrl }: { embedUrl: string }) {
  const coverSrc = `/api/spotify-image?embed=${encodeURIComponent(embedUrl)}`;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/10">
      <iframe
        src={embedUrl}
        title="Spotify Podcast"
        width="100%"
        height="152"
        className="relative z-10 h-[152px] w-full rounded-2xl sm:h-[352px]"
        style={{ border: 0 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      <img
        src={coverSrc}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 z-20 h-24 w-24 -translate-y-1/2 rounded-xl object-cover shadow-soft sm:left-11 sm:top-[52px] sm:h-28 sm:w-28 sm:translate-y-0 lg:h-32 lg:w-32"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
