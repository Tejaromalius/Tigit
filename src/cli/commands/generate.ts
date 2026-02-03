import { Command } from "commander";
import { Tagit } from "../../core/tagger.js";
import chalk from "chalk";

export function generateCommand(tagit: Tagit) {
  return new Command("generate")
    .description("Preview a random tag name without creating it")
    .option("-p, --pattern <pattern>", "Naming pattern")
    .action((options) => {
      try {
        const name = tagit.generate({ pattern: options.pattern });
        console.log(chalk.cyan(name));
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message);
        process.exit(1);
      }
    });
}
