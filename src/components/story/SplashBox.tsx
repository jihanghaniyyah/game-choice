import Image from "next/image";

import { Play } from "lucide-react";

interface SplashBoxProps {
  onStart: () => void;
}

export default function SplashBox({ onStart }: SplashBoxProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center pointer-events-auto">
      {/* Gradient kiri */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 ml-[8%] flex max-w-xl flex-col">
        <Image
          src="/logo/logo-game.png"
          alt="Logo"
          width={600}
          height={600}
          priority
          className="h-auto w-full max-w-[600px] min-w-[240px]"
        />

        <button
          onClick={onStart}
          className="
            group
            mt-12
            w-full
            max-w-[600px]

            flex
            items-center
            justify-center

            gap-3
            rounded-4xl
            border-4
            border-[#1b0c63]
            bg-white

            py-5

            brick
            text-6xl
            font-bold
            text-[#9539c6]

            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#9539c6]
            hover:text-white

            cursor-pointer
          "
        >
          <Play
            size={64}
            className="fill-current text-[#9539c6] transition-colors duration-300 group-hover:text-white"
          />
          PLAY
        </button>
      </div>
    </div>
  );
}
