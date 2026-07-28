import { Scene } from "@/types/story";

interface GameControlsProps {
  scene: Scene;
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void;
  onExploreEnding?: () => void;
  showNext?: boolean;
  isEnding?: boolean;
}

export default function GameControls({
  scene,
  onNext,
  onPrevious,
  onReset,
  onExploreEnding,
  showNext = true,
  isEnding = false,
}: GameControlsProps) {
  if (scene.type === "splash") {
    return null;
  }
  return (
    <div className="absolute bottom-6 left-0 right-0 z-50 flex justify-end px-8">
      <div className="flex justify-end brick">
        {isEnding ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onExploreEnding}
              className="
                brick
                cursor-pointer

                rounded-2xl
                border-2
                border-[#5B6EF5]

                bg-white/95
                px-8
                py-4

                text-l
                font-medium
                text-[#5B6EF5]

                shadow-xl
                transition-all
                duration-300

                hover:-translate-y-1
                hover:scale-105
                hover:bg-[#5B6EF5]
                hover:text-white
              "
            >
              🌿 Jelajahi Ending Lain
            </button>

            <button
              onClick={onReset}
              className="
                brick
                cursor-pointer

                rounded-2xl
                border-2
                border-[#E84D6A]

                bg-white/95
                px-8
                py-4

                text-l
                font-medium
                text-[#E84D6A]

                shadow-xl
                transition-all
                duration-300

                hover:-translate-y-1
                hover:scale-105
                hover:bg-[#E84D6A]
                hover:text-white
              "
            >
              🔄 Main dari Awal
            </button>
          </div>
        ) : (
          showNext && (
            <button
              onClick={onNext}
              className="
                brick
                cursor-pointer

                rounded-2xl
                border-2
                border-[#2DBE60]

                bg-white/95
                px-8
                py-4

                text-l
                font-medium
                text-[#2DBE60]

                shadow-xl
                transition-all
                duration-300

                hover:-translate-y-1
                hover:scale-105
                hover:bg-[#2DBE60]
                hover:text-white
              "
            >
              Lanjut →
            </button>
          )
        )}
      </div>
    </div>
  );
}
