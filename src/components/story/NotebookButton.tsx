"use client";

import Image from "next/image";

interface NotebookButtonProps {
  onOpen: () => void;
  hasNotification?: boolean;
}

export default function NotebookButton({
  onOpen,
  hasNotification = false,
}: NotebookButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="
    group
    absolute
    right-6
    top-6
    z-[45]
    cursor-pointer
    transition-all
    duration-200
    hover:scale-110
    active:scale-95
  "
    >
      {/* Notebook */}
      <Image
        src="/icons/notebook_icon.png"
        alt="Notebook"
        width={150}
        height={150}
        className="
          drop-shadow-[0_0_10px_rgba(255,255,255,0.65)]
          transition-all
          duration-200
          group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]
        "
      />

      {/* Notification */}
      {hasNotification && (
        <Image
          src="/icons/notebook_badge.png"
          alt="New Notebook"
          width={1000}
          height={1000}
          className="
            absolute
            -right-0
            -top-0
            animate-pulse
          "
        />
      )}
    </button>
  );
}
