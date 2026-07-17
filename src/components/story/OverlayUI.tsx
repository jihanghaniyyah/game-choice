"use client";

import { ReactNode } from "react";

interface OverlayUIProps {
  children: ReactNode;
}

export default function OverlayUI({ children }: OverlayUIProps) {
  return (
    <div
      className="
        absolute
        inset-0
        z-50
        flex
        items-end
        justify-center
        pb-32
        pointer-events-none
      "
    >
      <div className="pointer-events-auto w-full">{children}</div>
    </div>
  );
}
