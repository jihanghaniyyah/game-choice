interface Props {
  speaker: string;
  text: string;
}

export default function DialogueBox({ speaker, text }: Props) {
  return (
    <div className="rounded-xl bg-white p-4 text-black">
      <h3 className="font-bold">{speaker}</h3>
      <p>{text}</p>
    </div>
  );
}
