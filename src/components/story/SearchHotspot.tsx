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
          <div
            key={spot.id}
            className="absolute"
            style={{
              left: spot.left,
              right: spot.right,
              top: spot.top,
              width: spot.width,
              height: spot.height,
            }}
          >
            {spot.id === "next_room" && (
              <div
                className="
          pointer-events-none
          absolute
          z-[999]
          flex
          flex-col
          items-center
        "
                style={{
                  left: "350px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <div className="flex items-center gap-1">
                  <span className="room-arrow">❯</span>
                  <span className="room-arrow room-arrow-delay-1">❯</span>
                  <span className="room-arrow room-arrow-delay-2">❯</span>
                </div>

                <span
                  className="
            mt-2
            whitespace-nowrap
            rounded-xl
            bg-black/60
            px-4
            py-2
            text-sm
            font-medium
            tracking-wide
            text-white
            shadow-lg
            backdrop-blur-sm
          "
                >
                  Klik menuju ruangan selanjutnya
                </span>
              </div>
            )}

            <button
              onClick={() => handleClick(spot.id)}
              className="
        absolute
        inset-0
        cursor-pointer
        bg-transparent
      "
              aria-label="Hotspot"
            />
          </div>
        ))}
      </div>

      {message && <NarrationBox text={message} />}
    </>
  );
}
