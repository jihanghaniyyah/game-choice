interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {children}
    </main>
  );
}
