export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900 to-slate-900" />

      {children}
    </div>
  );
}
