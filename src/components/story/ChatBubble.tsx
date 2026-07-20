"use client";

interface ChatBubbleProps {
  text: string;
  from: "me" | "other";
}

export default function ChatBubble({ text, from }: ChatBubbleProps) {
  const isMe = from === "me";

  return (
    <div className="w-full mb-2">
      <div
        className={`
          w-fit
          max-w-[68%]
          px-4
          py-3

          rounded-3xl
          text-[17px]
          leading-relaxed
          break-words

          border-2
          shadow-md
          transition-all
          duration-200

          ${
            isMe
              ? `
                ml-auto
                mr-0
                translate-x-18

                bg-[#EEF5FF]
                border-blue-400
                text-slate-900

                rounded-br-lg
              `
              : `
                mr-auto
                ml-1

                bg-white/90
                border-slate-700
                text-slate-900

                rounded-bl-lg
              `
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}
