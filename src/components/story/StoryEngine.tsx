"use client";

import { useEffect } from "react";

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
    roomState,
    completeRoomTask,
    showWardrobeOverlay,
    setShowWardrobeOverlay,
  } = useStoryEngine();

  const handleWardrobeComplete = () => {
    completeRoomTask("wardrobe");
    setShowWardrobeOverlay(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          nextScene();
          break;

        case "ArrowLeft":
          previousScene();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextScene, previousScene]);

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
        roomState={roomState}
        gameSession={gameSession}
        visibleMessages={visibleMessages}
        showWardrobeOverlay={showWardrobeOverlay}
        onWardrobeComplete={handleWardrobeComplete}
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
        showNext={!!currentScene.next && !currentScene.overlayChoice}
      />
    </GameLayout>
  );
}
