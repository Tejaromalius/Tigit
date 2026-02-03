import { TagitConfig, TagPattern } from "../types/index.js";

export const DEFAULT_CONFIG: TagitConfig = {
  categories: ["adjectives", "animals"],
  separator: "-",
  maxWords: 3,
  pattern: TagPattern.AdjectiveAnimal,
  versionPrefix: "v",
};
