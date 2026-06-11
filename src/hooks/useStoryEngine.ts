"use client";

import { useEffect, useState } from "react";
import { story } from "@/data/story";

const STORAGE_KEY = "digital-grooming-progress";
const STARTING_SCENE = "splash_001";

export function useStoryEngine() {
  const [currentSceneId, setCurrentSceneId] = useState(STARTING_SCENE);

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
    if (!currentScene) return;

    if (currentScene.next) {
      setCurrentSceneId(currentScene.next);
    }
  };

  const choose = (nextId: string) => {
    setCurrentSceneId(nextId);
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentSceneId(STARTING_SCENE);
  };

  return {
    currentScene,
    nextScene,
    choose,
    resetProgress,
  };
}
