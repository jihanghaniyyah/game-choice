import { Choice } from "@/types/story";

interface ChoiceListProps {
  choices: Choice[];
  visitedFriends: string[];
  onChoose: (nextId: string) => void;
  layout?: "vertical" | "horizontal";
}

export default function ChoiceList({
  choices,
  visitedFriends,
  onChoose,
  layout = "vertical",
}: ChoiceListProps) {
  const filteredChoices = choices.filter((choice) => {
    if (choice.next.startsWith("kira") && visitedFriends.includes("kira"))
      return false;
    if (choice.next.startsWith("dea") && visitedFriends.includes("dea"))
      return false;
    if (choice.next.startsWith("nisa") && visitedFriends.includes("nisa"))
      return false;

    return true;
  });

  return (
    <div
      className={`absolute bottom-32 left-1/2 z-30 -translate-x-1/2 flex gap-3 ${
        layout === "horizontal"
          ? "flex-row justify-center"
          : "w-[600px] flex-col"
      }`}
    >
      {filteredChoices.map((choice) => (
        <button
          key={choice.label}
          onClick={() => onChoose(choice.next)}
          className={`
    cursor-pointer
    rounded-xl
    px-8
    py-4
    min-w-[180px]
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-200
    hover:scale-105

    ${
      choice.label === "YA"
        ? "bg-green-600 hover:bg-green-500 border border-green-500"
        : choice.label === "TIDAK"
          ? "bg-slate-600 hover:bg-slate-500 border border-slate-500"
          : "bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left"
    }
  `}
        >
          {choice.label}
        </button>
      ))}
    </div>
  );
}
