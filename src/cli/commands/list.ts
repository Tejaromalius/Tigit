import { Command } from "commander";
import { Tagit } from "../../core/tagger.js";
import chalk from "chalk";

export function listCommand(tagit: Tagit) {
  return new Command("list")
    .description("List existing tags")
    .action(async () => {
      try {
        await tagit.init();
        const tags = await tagit.listTags();
        if (tags.length === 0) {
          console.log(chalk.gray("No tags found."));
        } else {
          tags.forEach((t) => console.log(t));
          console.log(chalk.gray(`\nTotal: ${tags.length} tags`));
        }
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message);
        process.exit(1);
      }
    });
}
