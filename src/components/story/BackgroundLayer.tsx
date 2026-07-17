"use client";

import Image from "next/image";
import BackgroundPanoramic from "./BackgroundPanoramic";
import { Scene } from "@/types/story";

interface BackgroundLayerProps {
  scene: Scene;
  cameraX: number;
}

export default function BackgroundLayer({
  scene,
  cameraX,
}: BackgroundLayerProps) {
  if (!scene.background) return null;

  if (scene.camera?.enabled && scene.background) {
    return (
      <BackgroundPanoramic background={scene.background} cameraX={cameraX} />
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={scene.background}
        alt="Background"
        fill
        priority
        className="object-cover object-center"
      />
    </div>
  );
}
