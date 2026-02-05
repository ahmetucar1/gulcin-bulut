export function SpotifyEmbed({ embedUrl }: { embedUrl: string }) {
  const coverSrc = `/api/spotify-image?embed=${encodeURIComponent(embedUrl)}`;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/10">
      <iframe
        src={embedUrl}
        title="Spotify Podcast"
        width="100%"
        height="152"
        className="relative z-10 w-full rounded-2xl"
        style={{ border: 0 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      <img
        src={coverSrc}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 z-20 h-24 w-24 rounded-xl object-cover shadow-soft sm:h-28 sm:w-28 lg:left-2 lg:top-2 lg:h-20 lg:w-20"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
