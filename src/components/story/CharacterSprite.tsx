"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CharacterSpriteProps {
  image: string;
  walkFrames?: string[];
  state: "idle" | "walking";
  alt: string;
  className?: string;
}

export default function CharacterSprite({
  image,
  walkFrames,
  state,
  alt,
  className,
}: CharacterSpriteProps) {
  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => {
    if (state === "idle" || !walkFrames?.length) {
      setCurrentImage(image);
      return;
    }

    let frame = 0;

    const interval = setInterval(() => {
      setCurrentImage(walkFrames[frame]);

      frame = (frame + 1) % walkFrames.length;
    }, 120);

    return () => clearInterval(interval);
  }, [state, image, walkFrames]);

  return (
    <Image
      src={currentImage}
      alt={alt}
      width={650}
      height={900}
      priority
      unoptimized
      className={className}
    />
  );
}
