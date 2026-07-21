"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  onFinished: () => void;
}

export default function ComicCutscene({ images, onFinished }: Props) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  console.log("Comic Phase:", phase);

  useEffect(() => {
    // selesai animasi masuk
    const holdTimer = setTimeout(() => {
      console.log("→ HOLD");
      setPhase("hold");
    }, 2000);

    // mulai animasi keluar
    const exitTimer = setTimeout(() => {
      console.log("→ EXIT");
      setPhase("exit");
    }, 5500);

    // pindah scene
    const finishTimer = setTimeout(() => {
      console.log("→ NEXT SCENE");
      onFinished();
    }, 6200);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={`
    absolute inset-0
    z-[90]
    flex items-center justify-center
    overflow-hidden
    bg-black
    transition-opacity
    duration-[1500ms]

    ${phase === "exit" ? "opacity-0" : "opacity-100"}
  `}
    >
      {" "}
      <div
        className={`
            flex gap-5
            ${
              phase === "hold"
                ? "animate-comic-hold"
                : phase === "exit"
                  ? "animate-comic-exit"
                  : ""
            }
        `}
      >
        {/* IMAGE 1 */}
        <div
          className="
            animate-comic-down
          "
        >
          <div className="relative h-[98vh] aspect-[9/16]">
            <Image src={images[0]} alt="" fill className="object-contain" />
          </div>
        </div>

        {/* IMAGE 2 */}
        <div
          className="
            animate-comic-up
          "
        >
          <div className="relative h-[98vh] aspect-[9/16]">
            <Image src={images[1]} alt="" fill className="object-contain" />
          </div>
        </div>

        {/* IMAGE 3 */}
        <div
          className="
            animate-comic-down-delay
          "
        >
          <div className="relative h-[98vh] aspect-[9/16]">
            <Image src={images[2]} alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
