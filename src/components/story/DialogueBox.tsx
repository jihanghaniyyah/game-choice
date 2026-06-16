interface DialogueBoxProps {
  speaker: string;
  text: string;
}

export default function DialogueBox({ speaker, text }: DialogueBoxProps) {
  return (
    <div className="border-t border-slate-700 bg-black/90 p-6">
      <h3 className="mb-2 text-lg font-bold text-yellow-300">{speaker}</h3>

      <p className="text-lg text-white">{text}</p>
    </div>
  );
}
