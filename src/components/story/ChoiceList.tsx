interface Choice {
  label: string;
  next: string;
}

interface Props {
  choices: Choice[];
  onChoose: (next: string) => void;
}

export default function ChoiceList({ choices, onChoose }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {choices.map((choice) => (
        <button
          key={choice.label}
          onClick={() => onChoose(choice.next)}
          className="rounded-lg bg-blue-600 p-3"
        >
          {choice.label}
        </button>
      ))}
    </div>
  );
}
