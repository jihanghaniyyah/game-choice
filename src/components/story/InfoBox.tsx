import { ContentBlock } from "@/types/story";

interface InfoBoxProps {
  title?: string;
  content: ContentBlock[];
}

export default function InfoBox({ title, content }: InfoBoxProps) {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="rounded-2xl border border-slate-700 bg-slate-900">
        <div className="border-b border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-yellow-400">{title}</h2>
        </div>

        <div className="space-y-6 p-6">
          {content.map((block, index) => {
            if (block.type === "text") {
              return (
                <p key={index} className="text-lg leading-relaxed text-white">
                  {block.value}
                </p>
              );
            }

            if (block.type === "lesson") {
              return (
                <div
                  key={index}
                  className="rounded-xl border border-green-700 bg-green-950/50 p-5"
                >
                  <h3 className="mb-2 text-lg font-bold text-green-400">
                    {block.title}
                  </h3>

                  <p className="text-slate-200">{block.value}</p>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
