"use client";

import Image from "next/image";
import { Hotspot } from "@/types/story";
import HotspotLayer from "./HotspotLayer";

interface BackgroundPanoramicProps {
  background: string;
  cameraX: number;
}

export default function BackgroundPanoramic({
  background,
  cameraX,
}: BackgroundPanoramicProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="
            absolute
            left-0
            top-0
            h-full
            transition-transform
            duration-700
            ease-out
        "
        style={{
          transform: `translateX(${cameraX}px)`,
        }}
      >
        <div className="relative">
          <Image
            src={background}
            alt="Background"
            width={3200}
            height={1080}
            priority
            draggable={false}
            className="
                h-screen
                max-w-none
                w-auto
                select-none
                object-cover
                pointer-events-none
            "
          />
        </div>
      </div>
    </div>
  );
}
