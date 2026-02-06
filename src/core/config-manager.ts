import Conf from "conf";
import { TigitConfig, TagPattern } from "../types/index.js";

export const DEFAULT_CONFIG: TigitConfig = {
  categories: ["adjectives", "animals"],
  separator: "-",
  maxWords: 2,
  pattern: TagPattern.Random,
  versionPrefix: "v",
};

export class ConfigManager {
  private store: Conf<TigitConfig>;

  constructor() {
    this.store = new Conf({
      projectName: "tigit",
      defaults: DEFAULT_CONFIG,
    });
  }

  get<K extends keyof TigitConfig>(key: K): TigitConfig[K] {
    return this.store.get(key);
  }

  set<K extends keyof TigitConfig>(key: K, value: TigitConfig[K]): void {
    this.store.set(key, value);
  }

  getAll(): TigitConfig {
    return this.store.store;
  }

  reset(): void {
    this.store.clear();
  }
}

export const configManager = new ConfigManager();
