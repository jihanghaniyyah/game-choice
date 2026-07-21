"use client";

import { useState } from "react";

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
        className="absolute left-0 top-0 h-full w-[3200px] z-40 pointer-events-auto"
        style={{
          transform: `translateX(${cameraX}px)`,
        }}
      >
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            onClick={() => handleClick(spot.id!)}
            className="absolute cursor-pointer"
            style={{
              left: spot.left,
              top: spot.top,
              width: spot.width,
              height: spot.height,
            }}
          />
        ))}
      </div>

      {message && <NarrationBox text={message} />}
    </>
  );
}
