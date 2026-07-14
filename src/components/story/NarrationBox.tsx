interface NarrationBoxProps {
  text: string;
}

export default function NarrationBox({ text }: NarrationBoxProps) {
  return (
    <div className="absolute bottom-12 left-1/2 z-40 w-[80%] max-w-4xl -translate-x-1/2 rounded-3xl bg-black/60 px-10 py-6 text-center backdrop-blur-md shadow-xl">
      <p className="text-2xl leading-9 text-white">{text}</p>
    </div>
  );
}
