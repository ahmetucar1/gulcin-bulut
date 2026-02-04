"use client";

import { useEffect, useRef, useState } from "react";

type DeferredIframeProps = {
  src: string;
  title: string;
  wrapperClassName?: string;
  iframeClassName?: string;
  allow?: string;
  loading?: "lazy" | "eager";
  rootMargin?: string;
};

export function DeferredIframe({
  src,
  title,
  wrapperClassName,
  iframeClassName,
  allow,
  loading = "lazy",
  rootMargin = "200px"
}: DeferredIframeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={ref} className={wrapperClassName}>
      {isVisible ? (
        <iframe
          src={src}
          title={title}
          allow={allow}
          loading={loading}
          className={iframeClassName}
        />
      ) : (
        <div className="h-full w-full animate-pulse bg-black/5" aria-hidden />
      )}
    </div>
  );
}
