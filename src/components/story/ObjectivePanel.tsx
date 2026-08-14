"use client";

interface ObjectivePanelProps {
  objective: string[];
  completedCount?: number;
  totalCount?: number;

  roomState?: {
    desk: boolean;
    bed: boolean;
    painting: boolean;
    wardrobe: boolean;
  };
}

export default function ObjectivePanel({
  objective,
  completedCount,
  totalCount,
  roomState,
}: ObjectivePanelProps) {
  const roomTasks = roomState
    ? [
        {
          label: "Rapihkan meja belajar",
          done: roomState.desk,
        },
        {
          label: "Rapihkan tempat melukis",
          done: roomState.painting,
        },
        {
          label: "Rapihkan lemari",
          done: roomState.wardrobe,
        },
        {
          label: "Rapihkan tempat tidur",
          done: roomState.bed,
        },
      ]
    : [];

  const progress =
    completedCount !== undefined && totalCount !== undefined && totalCount > 0
      ? (completedCount / totalCount) * 100
      : 0;

  return (
    <div
      className="
        absolute
        top-50
        right-10
        z-50
        w-[300px]
        rounded-md
        bg-white/95
        px-3
        py-2
        shadow-lg
        backdrop-blur-sm
      "
    >
      <p className="font-bold text-gray-900">Objective :</p>

      <div className="mt-2 space-y-1 text-gray-900">
        {roomTasks.length > 0 ? (
          <>
            {roomTasks.map((task) => (
              <p
                key={task.label}
                className={task.done ? "text-green-600" : "text-gray-800"}
              >
                {task.done ? "✅" : "⬜"} {task.label}
              </p>
            ))}

            <div className="pt-2">
              {completedCount === totalCount ? (
                <p className="mb-2 font-semibold text-green-600">
                  🎉 Semua area telah dirapihkan!
                </p>
              ) : (
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Progress {completedCount}/{totalCount}
                </p>
              )}

              <div className="h-2 mb-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          objective.map((item, index) => <p key={index}>• {item}</p>)
        )}
      </div>
    </div>
  );
}
