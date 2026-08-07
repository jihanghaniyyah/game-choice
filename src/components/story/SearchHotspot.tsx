"use client";

import { useState } from "react";
import { PANORAMA } from "@/constants/game";
import { Hotspot } from "@/types/story";
import NarrationBox from "./NarrationBox";

interface SearchHotspotProps {
  hotspots: Hotspot[];
  target: string;
  wrongMessages: string[];

  cameraX: number;

  onSuccess: () => void;
}

export default function SearchHotspot({
  hotspots,
  target,
  wrongMessages,
  onSuccess,
  cameraX,
}: SearchHotspotProps) {
  const [message, setMessage] = useState("");

  const showWrongMessage = () => {
    const random =
      wrongMessages[Math.floor(Math.random() * wrongMessages.length)];

    setMessage(random);

    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  const handleClick = (id: string) => {
    if (id === target) {
      onSuccess();
      return;
    }

    showWrongMessage();
  };

  return (
    <>
      <div
        className="absolute left-0 top-0 h-full z-40 pointer-events-auto"
        style={{
          width: `${PANORAMA.WIDTH}px`,
          transform: `translateX(${cameraX}px)`,
        }}
      >
        {hotspots.map((spot) => (
          <div key={spot.id}>
            {/* Ripple hanya untuk next_room */}
            {spot.id === "next_room" && (
              <div
                className="
      absolute
      pointer-events-none
      z-[999]
      flex
      items-center
      gap-3
    "
                style={{
                  left: `calc(${spot.left} + 350px)`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <span className="next-arrow delay-0">❯</span>
                <span className="next-arrow delay-1">❯</span>
                <span className="next-arrow delay-2">❯</span>
              </div>
            )}

            <button
              onClick={() => handleClick(spot.id!)}
              className="
                absolute
                cursor-pointer
              "
              style={{
                left: spot.left,
                right: spot.right,
                top: spot.top,
                width: spot.width,
                height: spot.height,
              }}
            />
          </div>
        ))}
      </div>

      {message && <NarrationBox text={message} />}
    </>
  );
}
