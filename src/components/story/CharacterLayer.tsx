"use client";

import Image from "next/image";
import { Scene } from "@/types/story";

interface CharacterLayerProps {
  scene: Scene;
}

const POSITION_CLASS = {
  1: "left-[2%]",
  2: "left-[20%]",
  3: "left-1/2 -translate-x-1/2",
  4: "right-[20%]",
  5: "right-[2%]",
} as const;

export default function CharacterLayer({ scene }: CharacterLayerProps) {
  if (!scene.characters?.length) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {scene.characters.map((character) => (
        <div
          key={character.id}
          className={`absolute bottom-0 ${POSITION_CLASS[character.position]}`}
          style={{
            transform: `translate(${character.offsetX ?? 0}px, ${
              character.offsetY ?? 0
            }px) scale(${character.scale ?? 1})`,
            transformOrigin: "bottom center",
          }}
        >
          <Image
            src={character.image}
            alt={character.id}
            width={650}
            height={900}
            priority
            className="h-[88vh] w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}
