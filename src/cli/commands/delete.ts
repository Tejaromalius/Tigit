import { Command } from "commander";
import { Tigit } from "../../core/tagger.js";
import chalk from "chalk";

export function deleteCommand(tigit: Tigit) {
  return new Command("delete")
    .argument("<tag>", "Tag name to delete")
    .description("Delete an existing tag")
    .option("--remote", "Delete the tag from the remote repository as well")
    .addHelpText(
      "after",
      `
Examples:
  $ tigit delete v1.0.0            # Delete locally
  $ tigit delete v1.0.0 --remote   # Delete locally and on remote
`,
    )
    .action(async (tagName, options) => {
      try {
        await tigit.init();
        await tigit.deleteTag(tagName, options.remote);
        console.log(chalk.green(`Deleted tag: ${tagName}`));
        if (options.remote) {
          console.log(chalk.blue("Deleted from remote."));
        }
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message);
        process.exit(1);
      }
    });
}
