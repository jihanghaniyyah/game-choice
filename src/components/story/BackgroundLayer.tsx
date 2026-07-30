"use client";

import Image from "next/image";
import BackgroundPanoramic from "./BackgroundPanoramic";
import { Scene } from "@/types/story";
import { getBedroomBackground } from "@/utils/getBedroomBackground";

interface BackgroundLayerProps {
  scene: Scene;
  cameraX: number;

  roomState?: {
    desk: boolean;
    bed: boolean;
    painting: boolean;
    wardrobe: boolean;
  };

  onHotspotClick?: (id: string) => void;
  onCameraLimitChange?: (limit: number) => void;
}

export default function BackgroundLayer({
  scene,
  cameraX,
  roomState,
  onCameraLimitChange,
}: BackgroundLayerProps) {
  const isBedroomExploration = scene.id === "day2_029";

  const background = isBedroomExploration
    ? getBedroomBackground(roomState!)
    : scene.background;

  if (!background) return null;

  if (scene.camera?.enabled) {
    return (
      <BackgroundPanoramic
        background={background}
        cameraX={cameraX}
        onLimitCalculated={onCameraLimitChange}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={background}
        alt="Background"
        fill
        priority
        className="object-cover object-center"
      />
    </div>
  );
}
