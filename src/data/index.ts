import animals from "./categories/animals.js";
import colors from "./categories/colors.js";
import adjectives from "./categories/adjectives.js";
import verbs from "./categories/verbs.js";

const categoryMap: Record<string, string[]> = {
  animals,
  colors,
  adjectives,
  verbs,
};

export function loadCategory(category: string): string[] {
  return categoryMap[category] || [];
}

export const AVAILABLE_CATEGORIES = Object.keys(categoryMap);
