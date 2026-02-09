"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
};

type Locale = "tr" | "en";

export function BlogList({
  posts,
  locale = "tr"
}: {
  posts: BlogPost[];
  locale?: Locale;
}) {
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = useMemo(
    () => (showAll ? posts : posts.slice(0, 3)),
    [posts, showAll]
  );
  const basePath = locale === "en" ? "/en" : "";
  const labels =
    locale === "en"
      ? {
          read: "Read article",
          empty: "No blog posts yet.",
          more: "Show more"
        }
      : {
          read: "Yazıyı oku",
          empty: "Henüz blog yazısı eklenmedi.",
          more: "Daha fazla"
        };

  return (
    <div className="space-y-6">
      {visiblePosts.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {visiblePosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden bg-white/70">
              <div className="relative aspect-[4/3] w-full bg-white/60">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <a
                  href={`${basePath}/blog/${post.slug}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {labels.read}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/70 bg-white/60 p-6 text-sm text-foreground/60">
          {labels.empty}
        </div>
      )}

      {!showAll && posts.length > 3 ? (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center justify-center rounded-full border border-border/70 bg-white/80 px-6 py-2 text-sm text-foreground/80 transition hover:text-foreground"
          >
            {labels.more}
          </button>
        </div>
      ) : null}
    </div>
  );
}
