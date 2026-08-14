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

  sceneId: string;
}

export default function HotspotLayer({
  hotspots,
  onClick,
  roomState,
  cameraX,
  useCamera = true,
  sceneId,
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
          className={`
  absolute
  cursor-pointer
  transition-all
  duration-200
  ${sceneId !== "day2_029" ? "hover:bg-white/20" : ""}
`}
          style={{
            left: hotspot.left,
            top: hotspot.top,
            width: hotspot.width,
            height: hotspot.height,
          }}
        >
          {sceneId === "day2_029" && (
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
            border-[8px]
            border-black/70
            bg-red-500
            animate-ripple-breathe
          "
              />

              <span
                className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            whitespace-nowrap
            text-sm
            font-medium
            tracking-wide
            text-white
          "
              >
                Klik
              </span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
