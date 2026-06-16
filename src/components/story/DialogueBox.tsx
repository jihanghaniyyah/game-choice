interface DialogueBoxProps {
  speaker: string;
  text: string;
  onNext?: () => void;
}

export default function DialogueBox({
  speaker,
  text,
  onNext,
}: DialogueBoxProps) {
  return (
    <div className="absolute bottom-0 w-full p-6">
      <div className="rounded-xl bg-black/80 p-6 backdrop-blur">
        <h3 className="mb-2 text-lg font-bold text-yellow-300">{speaker}</h3>

        <p className="text-white">{text}</p>

        {onNext && (
          <div className="mt-4 flex justify-end">
            <button onClick={onNext} className="rounded bg-green-600 px-4 py-2">
              Lanjut →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
