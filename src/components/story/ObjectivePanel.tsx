"use client";

interface ObjectivePanelProps {
  objective: string[];
  completedCount?: number;
  totalCount?: number;
}

export default function ObjectivePanel({
  objective,
  completedCount,
  totalCount,
}: ObjectivePanelProps) {
  return (
    <div
      className="
        absolute
        top-50
        right-10
        z-50
        w-[170px]
        rounded-md
        bg-white/95
        px-3
        py-2
        shadow-lg
        backdrop-blur-sm
      "
    >
      <p className="font-bold text-gray-900">Objective :</p>

      <div className="mt-1 space-y-1 text-gray-900">
        {objective.map((item, index) => (
          <p key={index}>
            - {item}
            {completedCount !== undefined && totalCount !== undefined && (
              <span className="ml-2 font-semibold text-green-600">
                ({completedCount}/{totalCount})
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
