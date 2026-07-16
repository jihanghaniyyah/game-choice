"use client";

import GameLayout from "./GameLayout";
import GameControls from "./GameControls";
import SceneRenderer from "./SceneRenderer";
import { useStoryEngine } from "@/hooks/useStoryEngine";

export default function StoryEngine() {
  const {
    currentScene,
    nextScene,
    previousScene,
    choose,
    resetProgress,
    visitedFriends,
    flash,
    transition,
  } = useStoryEngine();

  return (
    <GameLayout>
      <SceneRenderer
        scene={currentScene}
        nextScene={nextScene}
        choose={choose}
        visitedFriends={visitedFriends}
        flash={flash}
        transition={transition}
      />

      <GameControls
        scene={currentScene}
        onNext={nextScene}
        onPrevious={previousScene}
        onReset={resetProgress}
        showNext={!!currentScene.next}
      />
    </GameLayout>
  );
}
