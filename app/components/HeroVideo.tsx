"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* High-fidelity immediate poster image (visible while video buffers) */}
      <Image
        src="/hero-poster.jpg"
        alt="Green Sunsure clean energy installation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Video playing cleanly with zero filters or artificial overlays */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}


