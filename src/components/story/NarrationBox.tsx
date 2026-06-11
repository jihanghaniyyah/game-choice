interface Props {
  text: string;
}

export default function NarrationBox({ text }: Props) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <p>{text}</p>
    </div>
  );
}
