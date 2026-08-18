"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const VIDEO_URL =
  "https://video.wixstatic.com/video/b008a0_fd3740c8b02548db9ad8d2638b4736ec/1080p/mp4/file.mp4";

export default function HeroBackground({ posterUrl }: { posterUrl: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(min-width: 640px)");

    const update = () => setShowVideo(!motionQuery.matches && widthQuery.matches);

    motionQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);
    update();

    return () => {
      motionQuery.removeEventListener("change", update);
      widthQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={posterUrl}
        alt="Dubai skyline with the Burj Khalifa at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-linear-to-b from-navy-950/48 via-navy-950/34 to-navy-950/62" />
    </div>
  );
}
