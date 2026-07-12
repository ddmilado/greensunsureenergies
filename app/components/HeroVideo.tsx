"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const forwardRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);
  const [playingReverse, setPlayingReverse] = useState(false);

  useEffect(() => {
    const forward = forwardRef.current;
    const reverse = reverseRef.current;
    if (!forward || !reverse) return;

    const playForward = () => {
      reverse.pause();
      reverse.currentTime = 0;
      forward.currentTime = 0;
      forward.play().catch(() => {});
    };

    const playReverse = () => {
      forward.pause();
      forward.currentTime = 0;
      reverse.currentTime = 0;
      setPlayingReverse(true);
      reverse.play().catch(() => {});
    };

    const onForwardEnded = () => playReverse();
    const onReverseEnded = () => {
      setPlayingReverse(false);
      playForward();
    };

    forward.addEventListener("ended", onForwardEnded);
    reverse.addEventListener("ended", onReverseEnded);

    forward.play().catch(() => {});

    return () => {
      forward.removeEventListener("ended", onForwardEnded);
      reverse.removeEventListener("ended", onReverseEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <video
        ref={forwardRef}
        src="/hero.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          playingReverse ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={reverseRef}
        src="/hero-reverse.mp4"
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          playingReverse ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
