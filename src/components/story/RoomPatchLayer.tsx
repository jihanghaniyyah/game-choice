"use client";

import Image from "next/image";

interface RoomPatchLayerProps {
  roomState: {
    desk: boolean;
    bed: boolean;
    painting: boolean;
    wardrobe: number;
  };
}

export default function RoomPatchLayer({ roomState }: RoomPatchLayerProps) {
  return (
    <>
      {roomState.desk && (
        <Image
          src="/backgrounds/room/patches/desk_clean.png"
          alt=""
          fill
          className="object-cover pointer-events-none"
        />
      )}

      {roomState.bed && (
        <Image
          src="/backgrounds/room/patches/bed_clean.png"
          alt=""
          fill
          className="object-cover pointer-events-none"
        />
      )}

      {roomState.painting && (
        <Image
          src="/backgrounds/room/patches/canvas_clean.png"
          alt=""
          fill
          className="object-cover pointer-events-none"
        />
      )}

      {roomState.wardrobe === 3 && (
        <Image
          src="/backgrounds/room/patches/wardrobe_open_clean.png"
          alt=""
          fill
          className="object-cover pointer-events-none"
        />
      )}
    </>
  );
}
