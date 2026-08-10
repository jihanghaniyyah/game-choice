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
        className="absolute left-0 top-0 z-40 h-full pointer-events-auto"
        style={{
          width: `${PANORAMA.WIDTH}px`,
          transform: `translateX(${cameraX}px)`,
        }}
      >
        {hotspots.map((spot) => (
          <div key={spot.id} className="absolute inset-0">
            {/* Ripple hanya untuk next_room */}
            {spot.id === "next_room" && (
              <div
                className="
      pointer-events-none
      absolute
      z-[999]
      flex
      items-center
      justify-center
    "
                style={{
                  left: `calc(${spot.left} + 350px)`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {/* Outer ripple */}
                <span
                  className="
        absolute
        h-20
        w-20
        rounded-full
        border-[4px]
        animate-ripple-breathe
      "
                  style={{
                    borderColor: "#FF3B3B",
                    boxShadow: "0 0 25px rgba(255, 59, 59, 0.95)",
                  }}
                />

                {/* Inner ripple */}
                <span
                  className="
        absolute
        h-10
        w-10
        rounded-full
        border-[3px]
        animate-ripple-breathe
      "
                  style={{
                    borderColor: "#FF5A5A",
                    boxShadow: "0 0 15px rgba(255, 90, 90, 0.95)",
                  }}
                />
              </div>
            )}

            {/* Area hotspot */}
            <button
              onClick={() => handleClick(spot.id)}
              className="absolute cursor-pointer"
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
