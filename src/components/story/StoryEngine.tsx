"use client";

import SceneRenderer from "./SceneRenderer";
import { useStoryEngine } from "@/hooks/useStoryEngine";

export default function StoryEngine() {
  const { currentScene, nextScene, previousScene, choose, resetProgress } =
    useStoryEngine();

  return (
    <>
      <div className="mb-4 flex gap-2">
        <button
          onClick={previousScene}
          className="rounded bg-gray-700 px-4 py-2"
        >
          ← Previous
        </button>

        <button
          onClick={resetProgress}
          className="rounded bg-red-700 px-4 py-2"
        >
          Reset
        </button>
      </div>

      <SceneRenderer
        scene={currentScene}
        nextScene={nextScene}
        choose={choose}
      />
    </>
  );
}
