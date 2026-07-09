"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollChoreography() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.utils.toArray<HTMLElement>("[data-float-card]").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 84, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "bottom 60%",
              scrub: 0.8,
            },
            delay: index * 0.04,
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-kinetic-image]").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 0.86, opacity: 0.62, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom 35%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return <div ref={root} className="contents" />;
}
