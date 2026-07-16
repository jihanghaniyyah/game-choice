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
    if (currentSceneId === "choice_friend_001" && visitedFriends.length === 3) {
      setCurrentSceneId("day2_008");
    }
  }, [visitedFriends, currentSceneId]);

  const nextScene = () => {
    console.log("NEXT CLICK");
    console.log("Current Scene:", currentScene);

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
    setCurrentSceneId(STARTING_SCENE);
  };

  return {
    currentScene,
    nextScene,
    previousScene,
    choose,
    resetProgress,
    visitedFriends,
    flash,
    transition,
    markNotebookAsRead,
    readNotebooks,
  };
}
