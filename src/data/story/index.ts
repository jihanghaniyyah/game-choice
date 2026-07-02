import { Story } from "@/types/story";

import splash from "./splash.json";
import day1 from "./day1.json";
import dm from "./dm.json";
import competition from "./competition.json";
import day2 from "./day2.json";
import friends from "./friends.json";
import museum from "./museum.json";
import ending from "./ending.json";
import epilogue from "./epilogue.json";

export const story = {
  ...splash,
  ...day1,
  ...dm,
  ...competition,
  ...day2,
  ...friends,
  ...museum,
  ...ending,
  ...epilogue,
} as unknown as Story;
