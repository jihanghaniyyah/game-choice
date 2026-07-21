"use client";

import { useState } from "react";

import { Hotspot } from "@/types/story";
import NarrationBox from "./NarrationBox";

interface SearchHotspotProps {
  hotspots: Hotspot[];
  target: string;
  wrongMessage: string;

  cameraX: number;

  onSuccess: () => void;
}

export default function SearchHotspot({
  hotspots,
  target,
  wrongMessage,
  onSuccess,
  cameraX,
}: SearchHotspotProps) {
  const [message, setMessage] = useState("");

  const handleClick = (id: string) => {
    if (id === target) {
      onSuccess();
      return;
    }

    setMessage(wrongMessage);

    setTimeout(() => {
      setMessage("");
    }, 1200);
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
            className=" absolute  cursor-pointer"
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
