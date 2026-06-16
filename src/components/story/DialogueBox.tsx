import Image from "next/image";

import { CHARACTER_AVATARS, CHARACTER_COLORS } from "@/data/characters";

interface DialogueBoxProps {
  speaker: string;
  text: string;
}

export default function DialogueBox({ speaker, text }: DialogueBoxProps) {
  const avatar = CHARACTER_AVATARS[speaker] ?? "/characters/default.png";

  const badgeColor = CHARACTER_COLORS[speaker] ?? "bg-slate-600";

  return (
    <div className="border-t border-slate-700 bg-black/90 p-6">
      <div className="flex gap-4">
        <div className="overflow-hidden rounded-lg border border-slate-600 bg-white">
          <Image
            src={avatar}
            alt={speaker}
            width={96}
            height={96}
            className="h-24 w-24 object-cover"
          />
        </div>

        <div className="flex-1">
          <div
            className={`mb-3 inline-block rounded-md px-3 py-1 text-sm font-bold text-white ${badgeColor}`}
          >
            {speaker}
          </div>
          <p className="text-lg leading-relaxed text-white">{text}</p>
        </div>
      </div>
    </div>
  );
}
