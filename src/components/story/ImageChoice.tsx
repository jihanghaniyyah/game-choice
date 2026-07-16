"use client";

import { Hotspot } from "@/types/story";

interface ImageChoiceProps {
  hotspots: Hotspot[];
  onChoose: (nextId: string) => void;
}

export default function ImageChoice({ hotspots, onChoose }: ImageChoiceProps) {
  return (
    <>
      {hotspots.map((spot, index) => (
        <button
          key={index}
          onClick={() => onChoose(spot.next)}
          className="
            absolute
            z-40
            cursor-pointer
            rounded-xl
            transition-all
            duration-200
            hover:bg-white/10
            hover:scale-[1.02]
            active:scale-[0.98]
          "
          style={{
            left: spot.left,
            top: spot.top,
            width: spot.width,
            height: spot.height,
          }}
        />
      ))}
    </>
  );
}
