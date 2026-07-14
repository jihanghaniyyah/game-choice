interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {children}
    </div>
  );
}
