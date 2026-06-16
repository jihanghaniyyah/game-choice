interface GameControlsProps {
  //   currentSceneId?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void;
  showNext?: boolean;
}

export default function GameControls({
  //   currentSceneId,
  onNext,
  onPrevious,
  onReset,
  showNext = true,
}: GameControlsProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-700 bg-slate-900 p-4">
      <div>
        <button onClick={onPrevious} className="rounded bg-slate-700 px-4 py-2">
          ← Kembali
        </button>
        <button onClick={onReset} className="rounded bg-red-600 px-4 py-2">
          Ulangi
        </button>
        {/* <div className="mt-2 text-xs text-slate-400">{currentSceneId}</div> */}
      </div>

      {showNext && (
        <button onClick={onNext} className="rounded bg-green-600 px-4 py-2">
          Lanjut →
        </button>
      )}
    </div>
  );
}
