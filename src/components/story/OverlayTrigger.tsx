"use client";

import Image from "next/image";
import { Scene } from "@/types/story";

interface OverlayTriggerProps {
  scene: Scene;
  onOpen: () => void;
}

export default function OverlayTrigger({ scene, onOpen }: OverlayTriggerProps) {
  if (!scene.overlay) return null;

  return (
    <button
      onClick={onOpen}
      className="absolute right-6 top-6 z-[45] cursor-pointer transition hover:scale-110"
    >
      <Image
        src="/icons/notebook_icon.png"
        alt="Notebook"
        width={200}
        height={200}
      />
    </button>
  );
}
