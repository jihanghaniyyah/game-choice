"use client";

interface ObjectivePanelProps {
  objective: string;
}

export default function ObjectivePanel({ objective }: ObjectivePanelProps) {
  return (
    <div
      className="
        absolute
        top-50
        right-10
        z-50

        w-[170px]

        rounded-md
        bg-white/90

        px-3
        py-2

        shadow-lg
        backdrop-blur-sm
      "
    >
      <p className="font-bold text-gray-900">Objective :</p>

      <p className="mt-1 text-gray-900">- {objective}</p>
    </div>
  );
}
