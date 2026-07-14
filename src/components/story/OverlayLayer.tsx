"use client";

import Image from "next/image";
import { Scene } from "@/types/story";

interface OverlayLayerProps {
  scene: Scene;
  visible: boolean;
  onClose: () => void;
}

export default function OverlayLayer({
  scene,
  visible,
  onClose,
}: OverlayLayerProps) {
  if (!scene.overlay || !visible) return null;

  return (
    <div
      className="absolute inset-0 z-[60] flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <Image
        src={scene.overlay.image}
        alt="Overlay"
        width={1000}
        height={1400}
        priority
        className="max-h-[90vh] w-auto object-contain"
      />
    </div>
  );
}
