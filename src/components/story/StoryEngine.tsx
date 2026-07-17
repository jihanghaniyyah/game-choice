"use client";

import GameLayout from "./GameLayout";
import GameControls from "./GameControls";
import SceneRenderer from "./SceneRenderer";
import PanoramaControls from "./PanoramaControls";
import { useStoryEngine } from "@/hooks/useStoryEngine";

export default function StoryEngine() {
  const {
    currentScene,
    nextScene,
    previousScene,
    choose,
    resetProgress,
    gameSession,
    visitedFriends,
    flash,
    transition,
    readNotebooks,
    markNotebookAsRead,
    cameraX,
    moveCameraLeft,
    moveCameraRight,
    visibleMessages,
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
        readNotebooks={readNotebooks}
        markNotebookAsRead={markNotebookAsRead}
        cameraX={cameraX}
        gameSession={gameSession}
        visibleMessages={visibleMessages}
      />

      {currentScene.camera?.enabled && (
        <PanoramaControls
          onLeft={moveCameraLeft}
          onRight={moveCameraRight}
          canMoveLeft={cameraX < 0}
          canMoveRight={cameraX > -1000}
        />
      )}

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
