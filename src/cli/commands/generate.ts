import { Command } from "commander";
import { Tigit } from "../../core/tagger.js";
import chalk from "chalk";

export function generateCommand(tigit: Tigit) {
  return new Command("generate")
    .description("Preview a random tag name without creating it")
    .option("-p, --pattern <pattern>", "Naming pattern")
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
