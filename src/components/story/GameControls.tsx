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
  if (scene.type === "splash") {
    return null;
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
