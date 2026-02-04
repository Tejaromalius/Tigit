import { Command } from "commander";
import { Tigit } from "../../core/tagger.js";
import chalk from "chalk";

export function listCommand(tigit: Tigit) {
  return new Command("list")
    .description("List all existing tags in the current repository")
    .addHelpText(
      "after",
      `
Examples:
  $ tigit list
`,
    )
    .action(async () => {
      try {
        await tigit.init();
        const tags = await tigit.listTags();
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
