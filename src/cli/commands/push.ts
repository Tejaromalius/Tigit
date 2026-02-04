import { Command } from "commander";
import { Tigit } from "../../core/tagger.js";
import chalk from "chalk";

export function pushCommand(tigit: Tigit) {
  return new Command("push")
    .description("Push all local tags to the remote repository")
    .addHelpText(
      "after",
      `
Examples:
  $ tigit push
`,
    )
    .action(async () => {
      try {
        await tigit.init();
        console.log(chalk.gray("Pushing tags..."));
        await tigit.pushTags();
        console.log(
          chalk.green("Already up to date or tags pushed successfully."),
        );
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message);
        process.exit(1);
      }
    });
}
