"use client";

import { Hotspot } from "@/types/story";
import { PANORAMA } from "@/constants/game";

interface HotspotLayerProps {
  hotspots: Hotspot[];
  onClick: (id: string) => void;

  roomState: {
    desk: boolean;
    bed: boolean;
    painting: boolean;
    wardrobe: boolean;
  };

  cameraX: number;

  useCamera?: boolean;
}

export default function HotspotLayer({
  hotspots,
  onClick,
  roomState,
  cameraX,
  useCamera = true,
}: HotspotLayerProps) {
  const visibleHotspots = hotspots.filter((hotspot) => {
    switch (hotspot.id) {
      case "desk":
        return !roomState.desk;

      case "bed":
        return !roomState.bed;

      case "painting":
        return !roomState.painting;

      case "wardrobe":
        return !roomState.wardrobe;

      default:
        return true;
    }
  });

  return (
    <div
      className="absolute inset-0 z-[40] pointer-events-auto"
      style={{
        width: useCamera ? `${PANORAMA.WIDTH}px` : "100%",
        height: "100%",
        transform: useCamera ? `translateX(${cameraX}px)` : undefined,
      }}
    >
      {visibleHotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          onClick={() => onClick(hotspot.id)}
          className="
            absolute
            cursor-pointer
          "
          style={{
            left: hotspot.left,
            top: hotspot.top,
            width: hotspot.width,
            height: hotspot.height,
          }}
        >
          {/* Ripple indicator */}
          <div
            className="
    pointer-events-none
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
  "
          >
            {/* Soft glow */}
            <span
              className="
      absolute
      left-1/2
      top-1/2
      h-24
      w-24
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-sky-300/20
      blur-xl
      animate-ripple-breathe
    "
            />

            {/* Outer ripple */}
            <span
              className="
      absolute
      left-1/2
      top-1/2
      h-20
      w-20
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      border-[3px]
      border-sky-300/40
      shadow-[0_0_20px_rgba(125,211,252,0.9)]
      animate-ripple-breathe
    "
            />

            {/* Inner ripple */}
            <span
              className="
      absolute
      left-1/2
      top-1/2
      h-10
      w-10
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      border-2
      border-sky-200/20
      shadow-[0_0_12px_rgba(186,230,253,0.9)]
      animate-ripple-breathe
    "
            />
          </div>
        </button>
      ))}
    </div>
  );
}
