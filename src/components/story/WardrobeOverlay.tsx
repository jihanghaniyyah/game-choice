"use client";
import { useState } from "react";
import Image from "next/image";

interface WardrobeOverlayProps {
  visible: boolean;

  left: number;
  top: number;
  width: number;
  height: number;

  onComplete: () => void;
}

export default function WardrobeOverlay({
  visible,
  left,
  top,
  width,
  height,
  onComplete,
}: WardrobeOverlayProps) {
  const [wardrobeStep, setWardrobeStep] = useState(0);

  const wardrobeImages = [
    "/backgrounds/wardrobe/wardrobe_open_dirty.png",
    "/backgrounds/wardrobe/wardrobe_open_clean.png",
    "/backgrounds/wardrobe/wardrobe_closed.png",
  ];

  const currentImage = wardrobeImages[wardrobeStep];

  if (!visible) return null;

  return (
    <div
      className="absolute z-[100]"
      style={{
        left,
        top,
        width,
        height,
      }}
    >
      <button
        className="relative h-full w-full"
        onClick={() => {
          if (wardrobeStep < wardrobeImages.length - 1) {
            setWardrobeStep((prev) => prev + 1);
          } else {
            onComplete();
          }
        }}
      >
        <Image
          src={currentImage}
          alt="Wardrobe"
          fill
          priority
          draggable={false}
          className="object-contain select-none"
        />
      </button>
    </div>
  );
}
