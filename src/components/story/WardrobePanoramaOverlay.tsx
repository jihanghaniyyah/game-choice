"use client";

import Image from "next/image";

interface Props {
  step: number;
  cameraX: number;
}

export default function WardrobePanoramaOverlay({ step, cameraX }: Props) {
  if (step === 0) return null;

  const src =
    step === 1
      ? "/backgrounds/wardrobe/wardrobe_step1.png"
      : "/backgrounds/wardrobe/wardrobe_step2.png";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
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
        <Image
          src={src}
          alt="Wardrobe Overlay"
          width={3200}
          height={1080}
          priority
          draggable={false}
          className="
            h-screen
            w-auto
            max-w-none
            object-cover
            select-none
            pointer-events-none
          "
        />
      </div>
    </div>
  );
}
