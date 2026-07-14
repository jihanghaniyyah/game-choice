"use client";

import Image from "next/image";
import { Scene } from "@/types/story";

interface BackgroundLayerProps {
  scene: Scene;
}

export default function BackgroundLayer({ scene }: BackgroundLayerProps) {
  if (!scene.background) return null;

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={scene.background}
        alt="Background"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
