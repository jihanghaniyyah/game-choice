import Image from "next/image";

import { Play } from "lucide-react";

interface SplashBoxProps {
  onStart: () => void;
}

export default function SplashBox({ onStart }: SplashBoxProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center">
      {/* Gradient kiri */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 ml-[8%] flex max-w-xl flex-col">
        <Image
          src="/logo/logo-game.png"
          alt="Logo"
          width={600}
          height={600}
          priority
          className="h-auto w-full max-w-[480px] min-w-[240px]"
        />

        <button
          onClick={onStart}
          className="
            mt-12
            flex
            w-fit
            items-center
            gap-3
            rounded-xl
            bg-pink-600
            px-10
            py-4
            text-2xl
            font-bold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:bg-pink-500
            cursor-pointer
          "
        >
          <Play size={24} fill="white" />
          Play
        </button>
      </div>
    </div>
  );
}
