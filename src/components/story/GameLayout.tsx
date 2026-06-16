interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {children}
    </div>
  );
}
