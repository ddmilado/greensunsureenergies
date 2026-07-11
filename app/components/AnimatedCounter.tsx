"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    started.current = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = 16;
          const increment = value / (duration / step);

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setDisplay(value);
              clearInterval(timer);
            } else {
              setDisplay(Number(start.toFixed(decimals)));
            }
          }, step);

          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
