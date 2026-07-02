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
  // Controls khusus Intro
  if (scene.controls === "intro") {
    return (
      <div className="absolute bottom-8 left-0 right-0 z-50 flex justify-center">
        <button
          onClick={onNext}
          className="rounded-xl bg-green-600 px-8 py-3 text-lg font-semibold transition hover:bg-green-500"
        >
          Mulai
        </button>
      </div>
    );
  }

  // Controls default
  return (
    <div className="absolute bottom-4 left-0 right-0 z-50 flex items-center justify-between px-8">
      <div className="flex gap-2">
        <button onClick={onPrevious} className="rounded bg-slate-700 px-4 py-2">
          ← Kembali
        </button>

        <button onClick={onReset} className="rounded bg-red-600 px-4 py-2">
          Ulangi
        </button>
      </div>

      {showNext && (
        <button onClick={onNext} className="rounded bg-green-600 px-4 py-2">
          Lanjut →
        </button>
      )}
    </div>
  );
}
