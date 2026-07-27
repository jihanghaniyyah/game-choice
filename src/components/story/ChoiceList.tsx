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

  const getButtonColor = (label: string) => {
    switch (label) {
      case "YA":
        return `
        brick
        bg-white
        border-[#2DBE60]
        text-[#2DBE60]
        hover:bg-[#2DBE60]
        hover:text-white
      `;

      case "TIDAK":
        return `
        brick
        bg-white
        border-[#E84D6A]
        text-[#E84D6A]
        hover:bg-[#E84D6A]
        hover:text-white
      `;

      default:
        return `
        bg-white/85
        hover:bg-white
        border-slate-800
        text-slate-900
        hover:border-slate-900
      `;
    }
  };

  const isYesNoChoice =
    filteredChoices.length === 2 &&
    filteredChoices.some((c) => c.label === "YA") &&
    filteredChoices.some((c) => c.label === "TIDAK");

  return (
    <div
      className={`absolute bottom-20 left-1/2 z-60 -translate-x-1/2 flex gap-3 pointer-events-auto ${
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
            group
            cursor-pointer

            rounded-2xl
            border-2

            px-8
            py-4
            min-w-[180px]

            ${isYesNoChoice ? "text-center" : "text-left"}

            text-xl
            font-500

            shadow-xl
            transition-all
            duration-300

            hover:-translate-y-1
            hover:scale-105
            hover:shadow-2xl

            active:scale-[0.98]

            ${getButtonColor(choice.label)}
          `}
        >
          {choice.label}
        </button>
      ))}
    </div>
  );
}
