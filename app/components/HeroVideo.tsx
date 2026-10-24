"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Check if user is on mobile or prefers reduced data/motion
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Only stream heavy video if on desktop and not reduced motion
    if (!isMobile && !prefersReducedMotion) {
      // Delay mounting video slightly to prioritize main thread LCP
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* High-fidelity immediate poster image (zero network lag) */}
      <Image
        src="/hero-poster.jpg"
        alt="Green Sunsure clean energy installation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
      />

      {/* Optional smooth ambient video overlay that fades in once buffered */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-40" : "opacity-0"
          }`}
        />
      )}

      {/* World-class multi-layered cinema grading & energy photon sheen */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/70 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[var(--surface)]/50 to-[var(--surface)]" />
      
      {/* Precision kinetic energy scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(25, 224, 138, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 224, 138, 0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

