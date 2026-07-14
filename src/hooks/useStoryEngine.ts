"use client";

import { useEffect, useState } from "react";
import { story } from "@/data/story";

const STORAGE_KEY = "digital-grooming-progress";
const STARTING_SCENE = "splash_001";

export function useStoryEngine() {
  const [currentSceneId, setCurrentSceneId] = useState(STARTING_SCENE);
  const [history, setHistory] = useState<string[]>([]);
  const [visitedFriends, setVisitedFriends] = useState<string[]>([]);

  useEffect(() => {
    const savedScene = localStorage.getItem(STORAGE_KEY);

    if (savedScene && story[savedScene]) {
      setCurrentSceneId(savedScene);
    }
  }, []);

  console.log("currentSceneId", currentSceneId);

  const currentScene = story[currentSceneId];

  console.log("currentScene", currentScene);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentSceneId);
  }, [currentSceneId]);

  const nextScene = () => {
    if (!currentScene.next) return;

    let nextId = currentScene.next;

    // Khusus choice teman kantin
    if (nextId === "choice_friend_001" && visitedFriends.length === 3) {
      nextId = "day2_008";
    }

    setHistory((prev) => [...prev, currentSceneId]);
    setCurrentSceneId(nextId);
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

    setCurrentSceneId(nextId);
  };

  console.log(visitedFriends);

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
  };
}
