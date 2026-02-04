import { TigitConfig, TagPattern } from "../types/index.js";

export const DEFAULT_CONFIG: TigitConfig = {
  categories: ["adjectives", "animals"],
  separator: "-",
  maxWords: 2,
  pattern: TagPattern.Random,
  versionPrefix: "v",
};
