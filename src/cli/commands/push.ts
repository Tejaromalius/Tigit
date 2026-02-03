import { Command } from "commander";
import { Tagit } from "../../core/tagger.js";
import chalk from "chalk";

export function pushCommand(tagit: Tagit) {
  return new Command("push")
    .description("Push tags to remote")
    .action(async () => {
      try {
        await tagit.init();
        console.log(chalk.gray("Pushing tags..."));
        await tagit.pushTags();
        console.log(
          chalk.green("Already up to date or tags pushed successfully."),
        );
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message);
        process.exit(1);
      }
    });
}
