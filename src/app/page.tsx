import StoryEngine from "@/components/story/StoryEngine";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="relative h-[720px] w-[1280px] overflow-hidden rounded-xl border border-slate-700 bg-black">
        <StoryEngine />
      </div>
    </main>
  );
}
