"use client";

import { ReactNode } from "react";
import { Camera } from "@/types/story";

interface CameraControllerProps {
  children: ReactNode;
  camera?: Camera;
}

export default function CameraController({
  children,
  camera,
}: CameraControllerProps) {
  const start = camera?.start ?? "center";

  let translateX = 0;

  switch (start) {
    case "left":
      translateX = 0;
      break;

    case "center":
      translateX = -1000;
      break;

    case "right":
      translateX = -2000;
      break;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="h-full transition-transform duration-700"
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
