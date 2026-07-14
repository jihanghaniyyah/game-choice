"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Scene } from "@/types/story";

interface OverlayLayerProps {
  scene: Scene;
}

export default function OverlayLayer({ scene }: OverlayLayerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    if (!scene.overlay) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, scene.overlay.delay ?? 0);

    return () => clearTimeout(timer);
  }, [scene]);

  if (!scene.overlay || !visible) return null;

  return (
    <div
      className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60"
      onClick={() => setVisible(false)}
    >
      <Image
        src={scene.overlay.image}
        alt="Overlay"
        width={900}
        height={1200}
        priority
        className="max-h-[90vh] w-auto object-contain"
      />
    </div>
  );
}
