"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface BackgroundPanoramicProps {
  background: string;
  cameraX: number;
  onLimitCalculated?: (limit: number) => void;
}

export default function BackgroundPanoramic({
  background,
  cameraX,
  onLimitCalculated,
}: BackgroundPanoramicProps) {
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    loaded: false,
  });

  useEffect(() => {
    if (!background) return;

    const img = new window.Image();

    img.onload = () => {
      setImageSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
        loaded: true,
      });

      console.log("🖼 Background Loaded:", {
        src: background,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.src = background;
  }, [background]);

  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;

    console.log("📏 Rendered Image:", {
      renderedWidth: imageRef.current.clientWidth,
      renderedHeight: imageRef.current.clientHeight,
    });
  }, [viewportWidth, viewportHeight, imageSize.loaded]);

  const scale = imageSize.loaded ? viewportHeight / imageSize.height : 1;

  const renderWidth = imageSize.width * scale;

  const maxOffset = Math.max(renderWidth - viewportWidth, 0);

  useEffect(() => {
    if (!imageSize.loaded) return;

    console.log("SEND LIMIT", maxOffset);

    onLimitCalculated?.(maxOffset);
  }, [maxOffset, imageSize.loaded, onLimitCalculated]);

  useEffect(() => {
    if (!imageSize.loaded) return;

    console.log({
      naturalWidth: imageSize.width,
      naturalHeight: imageSize.height,
      viewportWidth,
      viewportHeight,
      scale,
      renderWidth,
      maxOffset,
    });
  }, [imageSize, viewportWidth, viewportHeight, renderWidth, maxOffset, scale]);

  const clampedCameraX = Math.max(-maxOffset, Math.min(cameraX, 0));

  useEffect(() => {
    console.log({
      cameraX,
      clampedCameraX,
      maxOffset,
    });
  }, [cameraX, clampedCameraX, maxOffset]);

  return (
    <div className="absolute inset-0 overflow-hidden">
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
          transform: `translateX(${clampedCameraX}px)`,
        }}
      >
        <Image
          ref={imageRef}
          src={background}
          alt="Background"
          width={3200}
          height={1080}
          priority
          draggable={false}
          className="
    h-screen
    w-auto
    max-w-none
    select-none
    object-cover
    pointer-events-none
  "
        />
      </div>
    </div>
  );
}
