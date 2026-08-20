"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PanoramaControlsProps {
  onLeft: () => void;
  onRight: () => void;
  canMoveLeft: boolean;
  canMoveRight: boolean;
}

export default function PanoramaControls({
  onLeft,
  onRight,
  canMoveLeft,
  canMoveRight,
}: PanoramaControlsProps) {
  return (
    <>
      {/* Left */}
      <button
        onClick={onLeft}
        disabled={!canMoveLeft}
        className={`
            absolute
            left-6
            top-1/2
            z-[9999]
            -translate-y-1/2
            rounded-full
            bg-black/40
            p-3
            text-white
            backdrop-blur-md
            transition-all
            duration-200
            active:scale-95

            ${
              canMoveLeft
                ? `
                    cursor-pointer
                    hover:scale-110
                    hover:bg-white/20
                    hover:shadow-[0_0_18px_rgba(255,255,255,0.25)]
                    active:scale-95
                    `
                : "cursor-default opacity-30"
            }
            `}
      >
        <ChevronLeft size={34} />
      </button>

      {/* Right */}
      <button
        onClick={onRight}
        disabled={!canMoveRight}
        className={`
            absolute
            right-6
            top-1/2
            z-[9999]
            -translate-y-1/2
            rounded-full
            bg-black/40
            p-3
            text-white
            backdrop-blur-md
            transition-all
            duration-200
            active:scale-95

            ${
              canMoveRight
                ? `
                cursor-pointer
                hover:scale-110
                hover:bg-white/20
                hover:shadow-[0_0_18px_rgba(255,255,255,0.25)]
                active:scale-95
                `
                : "cursor-default opacity-30"
            }
            `}
      >
        <ChevronRight size={34} />
      </button>
    </>
  );
}
