"use client";

import { useEffect, useState } from "react";
import { story } from "@/data/story";
import { PANORAMA } from "@/constants/game";

const STORAGE_KEY = "digital-grooming-progress";
const STARTING_SCENE = "splash_001";

export function useStoryEngine() {
  const [currentSceneId, setCurrentSceneId] = useState(STARTING_SCENE);
  const [history, setHistory] = useState<string[]>([]);
  const [visitedFriends, setVisitedFriends] = useState<string[]>([]);
  const [readNotebooks, setReadNotebooks] = useState<string[]>([]);
  const [flash, setFlash] = useState(false);
  const [transition, setTransition] = useState(false);
  const [cameraX, setCameraX] = useState(0);
  const [cameraLimit, setCameraLimit] = useState(1000);
  const [gameSession, setGameSession] = useState(0);
  const [roomState, setRoomState] = useState({
    desk: false,
    bed: false,
    painting: false,
    wardrobe: false,
  });
  const [wardrobeStep, setWardrobeStep] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(1);
  const currentScene = story[currentSceneId];

  useEffect(() => {
    setVisibleMessages(1);
  }, [currentSceneId]);

  useEffect(() => {
    setCameraX(0);
  }, [currentSceneId]);

  useEffect(() => {
    if (currentSceneId === "choice_friend_001" && visitedFriends.length === 3) {
      setCurrentSceneId("day2_008");
    }
  }, [visitedFriends, currentSceneId]);

  useEffect(() => {}, [roomState]);

  const nextScene = () => {
    if (
      currentScene.type === "chat" &&
      currentScene.chatMode !== "all" &&
      currentScene.messages &&
      visibleMessages < currentScene.messages.length
    ) {
      setVisibleMessages((prev) => prev + 1);
      return;
    }

    if (!currentScene.next) {
      return;
    }

    setHistory((prev) => [...prev, currentSceneId]);

    if (currentScene.flash) {
      setFlash(true);

      setTimeout(() => {
        setCurrentSceneId(currentScene.next!);
        setFlash(false);
      }, 200);

      return;
    }

    if (currentScene.transition === "fade") {
      setTransition(true);

      setTimeout(() => {
        setCurrentSceneId(currentScene.next!);

        setTimeout(() => {
          setTransition(false);
        }, 200);
      }, 300);

      return;
    }

    setCurrentSceneId(currentScene.next);
  };

  const moveCameraLeft = () => {
    setCameraX((prev) => Math.min(prev + PANORAMA.STEP, 0));
  };

  const moveCameraRight = () => {
    const extra = currentScene.id === "galeri_001" ? 3000 : 0;

    setCameraX((prev) =>
      Math.max(prev - PANORAMA.STEP, -(cameraLimit + extra)),
    );
  };

  const completeRoomTask = (task: "desk" | "bed" | "painting" | "wardrobe") => {
    setRoomState((prev) => ({
      ...prev,
      [task]: true,
    }));
  };

  const choose = (nextId: string) => {
    const isBedroomExploration = currentScene.id === "day2_029";

    if (isBedroomExploration) {
      switch (nextId) {
        case "desk":
          setRoomState((prev) => ({
            ...prev,
            desk: true,
          }));
          return;

        case "painting":
          setRoomState((prev) => ({
            ...prev,
            painting: true,
          }));
          return;

        case "wardrobe":
          if (wardrobeStep === 0) {
            setWardrobeStep(1);
          } else if (wardrobeStep === 1) {
            setWardrobeStep(2);
          } else {
            completeRoomTask("wardrobe");
            setWardrobeStep(0);
          }

          return;

        case "bed":
          setRoomState((prev) => ({
            ...prev,
            bed: true,
          }));
          return;
      }
    }

    setHistory((prev) => [...prev, currentSceneId]);

    if (nextId.startsWith("kira")) {
      setVisitedFriends((prev) =>
        prev.includes("kira") ? prev : [...prev, "kira"],
      );
    }

    if (nextId.startsWith("dea")) {
      setVisitedFriends((prev) =>
        prev.includes("dea") ? prev : [...prev, "dea"],
      );
    }

    if (nextId.startsWith("nisa")) {
      setVisitedFriends((prev) =>
        prev.includes("nisa") ? prev : [...prev, "nisa"],
      );
    }

    if (currentScene.transition === "fade") {
      setTransition(true);

      setTimeout(() => {
        setCurrentSceneId(nextId);

        setTimeout(() => {
          setTransition(false);
        }, 200);
      }, 300);

      return;
    }

    setCurrentSceneId(nextId);
  };

  const markNotebookAsRead = () => {
    const notebookImage = currentScene.overlay?.image;

    if (!notebookImage) return;

    setReadNotebooks((prev) => {
      if (prev.includes(notebookImage)) return prev;
      return [...prev, notebookImage];
    });
  };

  const previousScene = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentSceneId(previous);
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setVisitedFriends([]);
    setHistory([]);
    setCurrentSceneId(STARTING_SCENE);
    setGameSession((prev) => prev + 1);
  };

  const exploreOtherEnding = () => {
    setCurrentSceneId("choice_dm_001");
  };

  return {
    currentScene,
    nextScene,
    previousScene,
    choose,
    resetProgress,
    gameSession,
    visitedFriends,
    visibleMessages,
    exploreOtherEnding,

    flash,
    transition,

    markNotebookAsRead,
    readNotebooks,

    cameraX,
    cameraLimit,
    setCameraLimit,

    moveCameraLeft,
    moveCameraRight,

    roomState,
    setRoomState,
    completeRoomTask,

    wardrobeStep,
    setWardrobeStep,
  };
}
