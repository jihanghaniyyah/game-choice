export default function ChoiceList({ choices, onChoose }: any) {
  return (
    <div className="absolute bottom-32 left-1/2 z-30 flex w-[600px] -translate-x-1/2 flex-col gap-3">
      {choices.map((choice: any) => (
        <button
          key={choice.label}
          onClick={() => onChoose(choice.next)}
          className="cursor-pointer rounded-xl border border-slate-600 bg-slate-800 p-4 text-left transition hover:bg-slate-700"
        >
          {choice.label}
        </button>
      ))}
    </div>
  );
}
