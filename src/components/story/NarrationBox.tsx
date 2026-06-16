interface NarrationBoxProps {
  text: string;
}

export default function NarrationBox({ text }: NarrationBoxProps) {
  return (
    <div className="border-t border-slate-700 bg-black/90 p-6">
      <p className="text-lg text-white">{text}</p>
    </div>
  );
}
