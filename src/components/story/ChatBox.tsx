"use client";
import ChatBubble from "./ChatBubble";

export interface ChatMessage {
  from: "me" | "other";
  text: string;
}

interface ChatBoxProps {
  messages: ChatMessage[];
  visibleCount: number;
  chatMode?: "progressive" | "all";
}

export default function ChatBox({
  messages,
  visibleCount,
  chatMode = "progressive",
}: ChatBoxProps) {
  const displayedMessages =
    chatMode === "all" ? messages : messages.slice(0, visibleCount);

  return (
    <div
      className="
        absolute
        inset-0
        z-40
        flex
        flex-col
        justify-end
        px-8
        pb-36
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[380px]
          space-y-2
        "
      >
        {displayedMessages.map((message, index) => (
          <ChatBubble key={index} from={message.from} text={message.text} />
        ))}
      </div>
    </div>
  );
}
