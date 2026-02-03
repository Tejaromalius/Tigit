import { Command } from "commander";
import { Tagit } from "../../core/tagger.js";
import chalk from "chalk";

export function deleteCommand(tagit: Tagit) {
  return new Command("delete")
    .argument("<tag>", "Tag name to delete")
    .description("Delete a tag")
    .option("--remote", "Delete from remote repository too")
    .action(async (tagName, options) => {
      try {
        await tagit.init();
        await tagit.deleteTag(tagName, options.remote);
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
