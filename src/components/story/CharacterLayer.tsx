"use client";

import { useEffect, useState } from "react";
import { Scene } from "@/types/story";
import { CHARACTER_ASSETS } from "@/data/characters";
import CharacterSprite from "./CharacterSprite";

interface CharacterLayerProps {
  scene: Scene;
  gameSession: number;
}

const POSITION_X = {
  1: 10,
  2: 30,
  3: 50,
  4: 65,
  5: 75,
} as const;

export default function CharacterLayer({
  scene,
  gameSession,
}: CharacterLayerProps) {
  const [positions, setPositions] = useState<Record<string, number>>({});
  const [walkingCharacters, setWalkingCharacters] = useState<
    Record<string, boolean>
  >({});
  const [facingRight, setFacingRight] = useState<Record<string, boolean>>({});

  useEffect(() => {
    scene.characters?.forEach((character) => {
      const target = POSITION_X[character.moveTo ?? character.position];
      const start = positions[character.id] ?? POSITION_X[character.position];

      setFacingRight((prev) => ({
        ...prev,
        [character.id]: target >= start,
      }));

      if (start === target) return;

      let current = start;

      const distance = Math.abs(target - start);
      const speed = Math.max(0.25, distance / 60);

      setWalkingCharacters((prev) => ({
        ...prev,
        [character.id]: true,
      }));

      const interval = setInterval(() => {
        if (Math.abs(current - target) <= speed) {
          current = target;

          setPositions((prev) => ({
            ...prev,
            [character.id]: target,
          }));

          setWalkingCharacters((prev) => ({
            ...prev,
            [character.id]: false,
          }));

          clearInterval(interval);
          return;
        }

        current += current < target ? speed : -speed;

        setPositions((prev) => ({
          ...prev,
          [character.id]: current,
        }));
      }, 16);
    });
  }, [scene]);

  useEffect(() => {
    const initialPositions: Record<string, number> = {};

    scene.characters?.forEach((character) => {
      initialPositions[character.id] = POSITION_X[character.position];
    });

    setPositions(initialPositions);
    setWalkingCharacters({});
    setFacingRight({});
  }, [gameSession]);

  if (!scene.characters?.length) return null;
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {scene.characters.map((character) => {
        const asset = character.asset
          ? CHARACTER_ASSETS[character.asset]
          : null;
        return (
          <div
            key={character.id}
            className="absolute bottom-0"
            style={{
              left: `${positions[character.id] ?? POSITION_X[character.position]}%`,

              transform: `
              translate(calc(-50% + ${character.offsetX ?? 0}px), ${character.offsetY ?? 0}px)
              scale(${character.scale ?? 1})
            `,

              transformOrigin: "bottom center",
            }}
          >
            <CharacterSprite
              image={asset?.idle ?? character.image}
              walkFrames={asset?.walk ?? character.walkFrames}
              state={walkingCharacters[character.id] ? "walking" : "idle"}
              alt={character.id}
              className="h-[88vh] w-auto object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}
