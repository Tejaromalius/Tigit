import { Command } from "commander";
import { Tigit } from "../../core/tagger.js";
import chalk from "chalk";

export function generateCommand(tigit: Tigit) {
  return new Command("generate")
    .description("Preview a random tag name without creating it")
    .option("-p, --pattern <pattern>", "Naming pattern for the name generation")
    .addHelpText(
      "after",
      `
Available Patterns:
  random (default)       - 2-word random combination
  adjective-animal       - e.g., silent-tiger
  adjective-noun         - alias for adjective-animal
  color-animal           - e.g., crimson-panda
  adjective-color-animal - e.g., huge-blue-bear
  verb-adjective-noun    - e.g., jump-happy-deer
  color-animal-verb      - e.g., red-fox-ran

Examples:
  $ tigit generate                             # Preview random (e.g. gentle-wolf)
  $ tigit generate --pattern color-animal-verb # Preview e.g. red-fox-ran
`,
    )
    .action((options) => {
      try {
        const name = tigit.generate({ pattern: options.pattern });
        console.log(chalk.cyan(name));
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message);
        process.exit(1);
      }
    });
}
