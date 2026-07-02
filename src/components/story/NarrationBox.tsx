interface NarrationBoxProps {
  text: string;
}

export default function NarrationBox({ text }: NarrationBoxProps) {
  return (
    <div className="absolute bottom-8 left-1/2 z-20 w-[85%] max-w-4xl -translate-x-1/2 rounded-2xl bg-black/70 p-6 text-center shadow-xl backdrop-blur-md">
      <p className="text-lg text-white">{text}</p>
    </div>
  );
}
