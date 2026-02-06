import { TagPattern, TigitConfig } from "../types/index.js";
import { loadCategory, AVAILABLE_CATEGORIES } from "../data/index.js";
import { DEFAULT_CONFIG } from "./config.js";

export class NameGenerator {
  private cache: Map<string, string[]> = new Map();
  private config: TigitConfig;

  constructor(config: Partial<TigitConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  private getRandomCategory(): string {
    return AVAILABLE_CATEGORIES[
      Math.floor(Math.random() * AVAILABLE_CATEGORIES.length)
    ];
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
    const p = pattern || this.config.pattern || TagPattern.Random;

    let parts: string[] = [];

    switch (p) {
      case TagPattern.Random:
      case "random":
        const count = Math.min(this.config.maxWords || 2, 5);
        parts = Array.from({ length: count }, () =>
          this.getRandomWord(this.getRandomCategory()),
        );
        break;
      case TagPattern.AdjectiveAnimal:
      case "adjective-animal":
      case "adjective-noun":
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
        // If it's a valid category, use it
        if (AVAILABLE_CATEGORIES.includes(p as string)) {
          parts = [this.getRandomWord(p as string)];
        } else {
          // Fallback to random if nothing matches
          const count = Math.min(this.config.maxWords || 2, 5);
          parts = Array.from({ length: count }, () =>
            this.getRandomWord(this.getRandomCategory()),
          );
        }
    }

    return parts.join(this.config.separator);
  }
}
