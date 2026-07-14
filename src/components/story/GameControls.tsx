import { Scene } from "@/types/story";

interface GameControlsProps {
  scene: Scene;
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void;
  showNext?: boolean;
}

export default function GameControls({
  scene,
  onNext,
  onPrevious,
  onReset,
  showNext = true,
}: GameControlsProps) {
  // Splash Screen
  if (scene.controls === "intro") {
    return (
      <div className="absolute bottom-10 left-0 right-0 z-50 flex justify-center">
        <button
          onClick={onNext}
          className="cursor-pointer rounded-xl bg-pink-600 px-10 py-4 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-pink-500"
        >
          ▶ PLAY
        </button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 left-0 right-0 z-50 flex items-center justify-between px-8">
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="cursor-pointer rounded-xl bg-black/60 px-5 py-3 text-white backdrop-blur-md transition hover:bg-black/80"
        >
          ← Kembali
        </button>

        <button
          onClick={onReset}
          className="cursor-pointer rounded-xl bg-red-600/90 px-5 py-3 text-white transition hover:bg-red-500"
        >
          Ulangi
        </button>
      </div>

      {showNext && (
        <button
          onClick={onNext}
          className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500"
        >
          Lanjut →
        </button>
      )}
    </div>
  );
}
