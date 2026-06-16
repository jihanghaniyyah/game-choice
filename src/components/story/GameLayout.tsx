interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col bg-slate-950 text-white">
      {children}
    </div>
  );
}
