import { Choice } from "@/types/story";

interface ChoiceListProps {
  choices: Choice[];
  visitedFriends: string[];
  onChoose: (nextId: string) => void;
}

export default function ChoiceList({
  choices,
  visitedFriends,
  onChoose,
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
    <div className="absolute bottom-32 left-1/2 z-30 flex w-[600px] -translate-x-1/2 flex-col gap-3">
      {filteredChoices.map((choice) => (
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
