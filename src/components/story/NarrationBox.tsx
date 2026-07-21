interface NarrationBoxProps {
  text: string;
}

export default function NarrationBox({ text }: NarrationBoxProps) {
  return (
    <div className="absolute bottom-20 left-1/2 z-20 w-[85%] max-w-4xl -translate-x-1/2 rounded-3xl border-2 border-slate-800 bg-white/85 p-6 text-center shadow-2xl backdrop-blur-sm">
      <p className="text-2xl leading-9 text-slate-900">{text}</p>
    </div>
  );
}
