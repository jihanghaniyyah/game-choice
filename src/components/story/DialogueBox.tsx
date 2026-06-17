import Image from "next/image";

import { CHARACTER_AVATARS, CHARACTER_COLORS } from "@/data/characters";

interface DialogueBoxProps {
  speaker: string;
  text: string;
}

export default function DialogueBox({ speaker, text }: DialogueBoxProps) {
  const avatar = CHARACTER_AVATARS[speaker] ?? "/characters/default.png";

  const badgeColor = CHARACTER_COLORS[speaker] ?? "bg-slate-600";

  const isDualSpeaker = speaker === "Nisa & Melati";

  return (
    <div className="border-t border-slate-700 bg-black/90 p-6">
      <div className="flex gap-4">
        <div className="flex gap-2">
          {isDualSpeaker ? (
            <>
              <Image
                src="/characters/nisa.png"
                alt="Nisa"
                width={96}
                height={96}
                className="h-24 w-24 rounded-lg bg-white object-contain"
              />

              <Image
                src="/characters/melati.png"
                alt="Melati"
                width={96}
                height={96}
                className="h-24 w-24 rounded-lg bg-white object-contain"
              />
            </>
          ) : (
            <Image
              src={avatar}
              alt={speaker}
              width={96}
              height={96}
              className="h-24 w-24 rounded-lg bg-white object-contain"
            />
          )}
        </div>

        <div className="flex-1">
          {isDualSpeaker ? (
            <div className="mb-3 flex gap-2">
              <div className="rounded-md bg-green-500 px-3 py-1 text-sm font-bold text-white">
                Nisa
              </div>

              <div className="rounded-md bg-pink-500 px-3 py-1 text-sm font-bold text-white">
                Melati
              </div>
            </div>
          ) : (
            <div
              className={`mb-3 inline-block rounded-md px-3 py-1 text-sm font-bold text-white ${badgeColor}`}
            >
              {speaker}
            </div>
          )}
          <p className="text-lg leading-relaxed text-white">{text}</p>
        </div>
      </div>
    </div>
  );
}
