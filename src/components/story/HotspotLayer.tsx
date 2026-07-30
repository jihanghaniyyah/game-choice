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
  console.log("HotspotLayer render", hotspots);
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

  console.log("VISIBLE HOTSPOTS:", visibleHotspots);

  const wardrobeHotspot = hotspots.find((hotspot) => hotspot.id === "wardrobe");
  console.log("VISIBLE HOTSPOTS:", visibleHotspots);
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
          onClick={() => {
            console.log("CLICK", hotspot.id);
            onClick(hotspot.id);
          }}
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
        />
      ))}
    </div>
  );
}
