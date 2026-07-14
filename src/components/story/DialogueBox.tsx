import { CHARACTER_COLORS } from "@/data/characters";

interface DialogueBoxProps {
  speaker: string;
  text: string;
}

export default function DialogueBox({ speaker, text }: DialogueBoxProps) {
  const badgeColor = CHARACTER_COLORS[speaker] ?? "bg-slate-600";

  const isDualSpeaker = speaker === "Nisa & Melati";

  return (
    <div className="absolute bottom-6 left-1/2 z-40 w-[92%] max-w-6xl -translate-x-1/2 rounded-3xl border border-white/10 bg-black/75 p-7 backdrop-blur-md shadow-2xl">
      {isDualSpeaker ? (
        <div className="mb-4 flex gap-2">
          <span className="rounded-lg bg-green-500 px-3 py-1 text-sm font-semibold">
            Nisa
          </span>

          <span className="rounded-lg bg-pink-500 px-3 py-1 text-sm font-semibold">
            Melati
          </span>
        </div>
      ) : (
        <span
          className={`inline-block rounded-lg px-3 py-1 text-sm font-semibold text-white ${badgeColor}`}
        >
          {speaker}
        </span>
      )}

      <p className="mt-4 text-xl leading-9 text-white">{text}</p>
    </div>
  );
}
