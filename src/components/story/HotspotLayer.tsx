"use client";

import { Hotspot } from "@/types/story";

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
}

export default function HotspotLayer({
  hotspots,
  onClick,
  roomState,
  cameraX,
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
