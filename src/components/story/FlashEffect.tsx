"use client";

interface FlashEffectProps {
  visible: boolean;
}

export default function FlashEffect({ visible }: FlashEffectProps) {
  return (
    <div
      className={`
        absolute inset-0 z-[100] pointer-events-none
        bg-white transition-opacity duration-200
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    />
  );
}
