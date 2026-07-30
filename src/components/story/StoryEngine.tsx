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
    exploreOtherEnding,
    gameSession,
    visitedFriends,
    flash,
    transition,
    readNotebooks,
    markNotebookAsRead,
    cameraX,
    cameraLimit,
    setCameraLimit,
    moveCameraLeft,
    moveCameraRight,
    visibleMessages,
    roomState,
    wardrobeStep,
    setWardrobeStep,
    completeRoomTask,
  } = useStoryEngine();

  useEffect(() => {
    console.log({
      cameraX,
      cameraLimit,
    });
  }, [cameraX, cameraLimit]);

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
        wardrobeStep={wardrobeStep}
        onCameraLimitChange={setCameraLimit}
      />

      {currentScene.camera?.enabled && (
        <PanoramaControls
          onLeft={moveCameraLeft}
          onRight={moveCameraRight}
          canMoveLeft={cameraX < 0}
          canMoveRight={cameraX > -cameraLimit}
        />
      )}

      <GameControls
        scene={currentScene}
        onNext={nextScene}
        onPrevious={previousScene}
        onReset={resetProgress}
        onExploreEnding={exploreOtherEnding}
        isEnding={currentScene.id === "epilogue_007"}
        showNext={
          !!currentScene.next &&
          !currentScene.overlayChoice &&
          currentScene.type !== "search" &&
          !currentScene.hideNext
        }
      />
    </GameLayout>
  );
}
