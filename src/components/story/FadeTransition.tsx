"use client";

interface FadeTransitionProps {
  visible: boolean;
}

export default function FadeTransition({ visible }: FadeTransitionProps) {
  return (
    <div
      className={`
        absolute inset-0
        z-[95]
        bg-black
        pointer-events-none
        transition-opacity
        duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    />
  );
}
