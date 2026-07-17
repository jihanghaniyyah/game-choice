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

          ${
            isMe
              ? `
                ml-auto
                mr-0
                translate-x-18
                bg-[#3797F0]
                text-white
                rounded-br-lg
              `
              : `
                mr-auto
                ml-1
                bg-white
                text-black
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
