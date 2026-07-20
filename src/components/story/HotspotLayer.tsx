"use client";

import { Hotspot } from "@/types/story";

import WardrobeOverlay from "./WardrobeOverlay";

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

  showWardrobeOverlay: boolean;
  onWardrobeComplete: () => void;
}

export default function HotspotLayer({
  hotspots,
  onClick,
  roomState,
  cameraX,
  showWardrobeOverlay,
  onWardrobeComplete,
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

  return (
    <div
      className="absolute left-0 top-0 z-[40] pointer-events-auto"
      style={{
        transform: `translateX(${cameraX}px)`,
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

      {wardrobeHotspot && (
        <WardrobeOverlay
          visible={showWardrobeOverlay}
          left={parseInt(wardrobeHotspot.left)}
          top={parseInt(wardrobeHotspot.top)}
          width={parseInt(wardrobeHotspot.width)}
          height={parseInt(wardrobeHotspot.height)}
          onComplete={onWardrobeComplete}
        />
      )}
    </div>
  );
}

// export default function HotspotLayer() {
//   return (
//     <button
//       onClick={() => console.log("CLICK")}
//       className="absolute bg-red-500"
//       style={{
//         left: "10%",
//         top: "20%",
//         width: "15%",
//         height: "65%",
//       }}
//     />
//   );
// }
