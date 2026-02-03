import { TagPattern, TagitConfig } from "../types/index.js";
import { loadCategory } from "../data/index.js";
import { DEFAULT_CONFIG } from "./config.js";

export class NameGenerator {
  private cache: Map<string, string[]> = new Map();
  private config: TagitConfig;

  constructor(config: Partial<TagitConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  private getWords(category: string): string[] {
    if (!this.cache.has(category)) {
      this.cache.set(category, loadCategory(category));
    }
    return this.cache.get(category) || [];
  }

  private getRandomWord(category: string): string {
    const words = this.getWords(category);
    if (words.length === 0) return "unknown";
    return words[Math.floor(Math.random() * words.length)];
  }

  generate(pattern?: TagPattern | string): string {
    const p = pattern || this.config.pattern || TagPattern.AdjectiveAnimal;

    let parts: string[] = [];

    switch (p) {
      case TagPattern.AdjectiveAnimal:
      case "adjective-animal":
      case "adjective-noun": // treating noun as animal for now
        parts = [
          this.getRandomWord("adjectives"),
          this.getRandomWord("animals"),
        ];
        break;
      case TagPattern.ColorAnimal:
      case "color-animal":
        parts = [this.getRandomWord("colors"), this.getRandomWord("animals")];
        break;
      case TagPattern.AdjectiveColorAnimal:
      case "adjective-color-animal":
        parts = [
          this.getRandomWord("adjectives"),
          this.getRandomWord("colors"),
          this.getRandomWord("animals"),
        ];
        break;
      case TagPattern.VerbAdjectiveNoun:
      case "verb-adjective-noun":
        parts = [
          this.getRandomWord("verbs"),
          this.getRandomWord("adjectives"),
          this.getRandomWord("animals"),
        ];
        break;
      case "color-animal-verb":
        parts = [
          this.getRandomWord("colors"),
          this.getRandomWord("animals"),
          this.getRandomWord("verbs"),
        ];
        break;
      default:
        // Default fallthrough
        parts = [
          this.getRandomWord("adjectives"),
          this.getRandomWord("animals"),
        ];
    }

    return parts.join(this.config.separator);
  }
}
