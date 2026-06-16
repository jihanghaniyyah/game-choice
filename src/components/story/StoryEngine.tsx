"use client";

import GameLayout from "./GameLayout";
import GameControls from "./GameControls";
import SceneRenderer from "./SceneRenderer";
import { useStoryEngine } from "@/hooks/useStoryEngine";

export default function StoryEngine() {
  const { currentScene, nextScene, previousScene, choose, resetProgress } =
    useStoryEngine();

  return (
    <GameLayout>
      <SceneRenderer
        scene={currentScene}
        nextScene={nextScene}
        choose={choose}
      />

      <GameControls
        // currentSceneId={currentScene.id}
        onNext={nextScene}
        onPrevious={previousScene}
        onReset={resetProgress}
        showNext={!!currentScene.next}
      />
    </GameLayout>
  );
}
