"use client";

import { useEffect, useState } from "react";
import { story } from "@/data/story";

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
  const [gameSession, setGameSession] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(1);

  useEffect(() => {
    const savedScene = localStorage.getItem(STORAGE_KEY);
    if (savedScene && story[savedScene]) {
      setCurrentSceneId(savedScene);
    }
  }, []);

  const currentScene = story[currentSceneId];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentSceneId);
  }, [currentSceneId]);

  useEffect(() => {
    setVisibleMessages(1);
  }, [currentSceneId]);

  useEffect(() => {
    if (currentSceneId === "choice_friend_001" && visitedFriends.length === 3) {
      setCurrentSceneId("day2_008");
    }
  }, [visitedFriends, currentSceneId]);

  const nextScene = () => {
    console.log({
      visibleMessages,
      totalMessages: currentScene.messages?.length,
    });
    console.log("NEXT CLICK");
    console.log("Current Scene:", currentScene);

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
      console.log("NEXT TIDAK ADA");
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
    setCameraX((prev) => Math.min(prev + 250, 0));
  };

  const moveCameraRight = () => {
    setCameraX((prev) => Math.max(prev - 250, -1000));
  };

  useEffect(() => {
    console.log("Camera X:", cameraX);
  }, [cameraX]);

  const choose = (nextId: string) => {
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
    if (!currentScene.overlay) return;

    setReadNotebooks((prev) => {
      if (prev.includes(currentScene.id)) return prev;
      return [...prev, currentScene.id];
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

  return {
    currentScene,
    nextScene,
    previousScene,
    choose,
    resetProgress,
    gameSession,
    visitedFriends,

    flash,
    transition,

    markNotebookAsRead,
    readNotebooks,

    cameraX,
    moveCameraLeft,
    moveCameraRight,
    visibleMessages,
  };
}
