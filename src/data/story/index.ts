import { Story } from "@/types/story";

import splash from "./splash.json";
import disclaimer from "./disclaimer.json";
import consent from "./consent.json";
import intro from "./intro.json";
import dm from "./dm.json";
import ending from "./ending.json";

export const story = {
  ...splash,
  ...disclaimer,
  ...consent,
  ...intro,
  ...dm,
  ...ending,
} as unknown as Story;
