"use client";

import { useEffect, useRef, useState } from "react";

export function TransitionMessage({
  text,
  align
}: {
  text: string;
  align: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.6,
        rootMargin: "-35% 0px -35% 0px"
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-2 md:py-3">
      <div className={align === "left" ? "flex justify-start" : "flex justify-end"}>
        <p
          className={`subconscious-message max-w-xs ${
            align === "left" ? "ml-6 text-left" : "mr-6 text-right"
          } ${visible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
