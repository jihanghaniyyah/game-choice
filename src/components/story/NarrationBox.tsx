type Props = {
  text: string;
  onNext?: () => void;
};

export default function NarrationBox({ text, onNext }: Props) {
  return (
    <div className="flex h-full items-center justify-center p-12">
      <div className="w-full max-w-2xl rounded-xl bg-black/70 p-8 backdrop-blur">
        <p className="text-center text-xl text-white">{text}</p>

        {onNext && (
          <div className="mt-6 flex justify-end">
            <button onClick={onNext} className="rounded bg-green-600 px-4 py-2">
              Lanjut →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
