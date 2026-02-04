import { AdminPanel } from "@/components/admin-panel";
import { getBlogPosts, getPodcast, getSocial } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function YonetimPage() {
  const social = await getSocial();
  const podcast = await getPodcast();
  const posts = await getBlogPosts();

  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Yönetim Paneli
          </p>
          <h1 className="text-4xl md:text-5xl">İçerik Yönetimi</h1>
          <p className="text-lg text-foreground/80">
            Blog yazıları ekleyin, Instagram ve podcast içeriklerini güncelleyin.
          </p>
        </div>

        <AdminPanel
          initialSocial={social}
          initialPodcast={podcast}
          initialPosts={posts}
        />
      </div>
    </div>
  );
}
