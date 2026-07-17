import { CHARACTER_COLORS } from "@/data/characters";

interface DialogueBoxProps {
  speaker: string;
  text: string;
}

export default function DialogueBox({ speaker, text }: DialogueBoxProps) {
  const badgeColor = CHARACTER_COLORS[speaker] ?? "bg-slate-600";
  const isDualSpeaker = speaker === "Nisa & Melati";

  return (
    <div className="absolute bottom-8 left-1/2 z-20 w-[90%] max-w-5xl -translate-x-1/2 rounded-3xl border-2 border-slate-800 bg-white/85 p-6 shadow-2xl backdrop-blur-sm">
      {isDualSpeaker ? (
        <div className="mb-4 flex gap-2">
          <span className="rounded-lg bg-green-500 px-3 py-1 text-xl font-semibold text-white">
            Nisa
          </span>
          <span className="rounded-lg bg-pink-500 px-3 py-1 text-xl font-semibold text-white">
            Melati
          </span>
        </div>
      ) : (
        <span
          className={`inline-block rounded-lg px-3 py-1 text-xl font-semibold text-white ${badgeColor}`}
        >
          {speaker}
        </span>
      )}
      <p className="mt-4 text-2xl leading-9 text-slate-900">{text}</p>
    </div>
  );
}
