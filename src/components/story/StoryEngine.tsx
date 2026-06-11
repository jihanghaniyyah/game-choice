"use client";

import SceneRenderer from "./SceneRenderer";
import { useStoryEngine } from "@/hooks/useStoryEngine";

export default function StoryEngine() {
  const { currentScene, nextScene, choose, resetProgress } = useStoryEngine();

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={resetProgress}
          className="rounded bg-red-500 px-3 py-2 text-white"
        >
          Reset Progress
        </button>
      </div>

      <SceneRenderer
        scene={currentScene}
        nextScene={nextScene}
        choose={choose}
      />
    </div>
  );
}
