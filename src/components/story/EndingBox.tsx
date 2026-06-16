interface EndingBoxProps {
  title?: string;
  text?: string;
}

export default function EndingBox({ title, text }: EndingBoxProps) {
  return (
    <div className="border-t border-slate-700 bg-green-800 p-8 text-center">
      <h2 className="mb-4 text-3xl font-bold">{title}</h2>

      <p className="text-lg">{text}</p>
    </div>
  );
}
