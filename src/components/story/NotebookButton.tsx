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
        absolute
        right-6
        top-6
        z-[45]
        cursor-pointer
        transition
        duration-200
        hover:scale-110
      "
    >
      {/* Notebook */}
      <Image
        src="/icons/notebook.png"
        alt="Notebook"
        width={300}
        height={300}
      />

      {/* Notification */}
      {hasNotification && (
        <Image
          src="/icons/notebook_notification.png"
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
