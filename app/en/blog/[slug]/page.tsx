import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { getBlogPost } from "@/lib/content";

export const revalidate = 120;

export default async function BlogPostPageEn({
  params
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(var(--accent-2)/0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--accent-3)/0.2),transparent_60%)]" />
      <div className="container relative max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Blog
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {post.image ? (
              <div className="relative h-24 w-32 overflow-hidden rounded-2xl bg-white/70 shadow-soft md:h-28 md:w-40">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl">{post.title}</h1>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-white/70 p-8 shadow-soft">
          <div className="richtext">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        <div>
          <Link
            href="/en/icerikler"
            className="inline-flex items-center justify-center rounded-full border border-border/70 bg-white/80 px-6 py-2 text-sm text-foreground/80 transition hover:text-foreground"
          >
            Back to content
          </Link>
        </div>
      </div>
    </div>
  );
}
