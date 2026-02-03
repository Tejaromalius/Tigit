import { Command } from "commander";
import chalk from "chalk";
import { Tagit } from "../core/tagger.js";
import { createCommand } from "./commands/create.js";
import { generateCommand } from "./commands/generate.js";
import { listCommand } from "./commands/list.js";
import { deleteCommand } from "./commands/delete.js";
import { pushCommand } from "./commands/push.js";
import { setupAliasCommand } from "./commands/setup-alias.js";

const program = new Command();
const tagit = new Tagit();

program
  .name("tagit")
  .description("Generate creative Git tags and semantic version tags")
  .version("1.0.0");

// Default action if no command specified: create random tag (Ultra-fast 't' mode)
program.action(async () => {
  // Check if arguments were passed that match commands but weren't caught
  // But if we are here, no subcommands matched.
  // So we just create a random tag immediately.
  try {
    await tagit.init();
    const result = await tagit.createRandomTag({ annotated: false });
    console.log(chalk.green(`✨ Tag created: ${chalk.bold(result.name)}`));
  } catch (e: any) {
    console.error(chalk.red("Error:"), e.message);
    process.exit(1);
  }
});

program.addCommand(createCommand(tagit));
program.addCommand(generateCommand(tagit));
program.addCommand(listCommand(tagit));
program.addCommand(deleteCommand(tagit));
program.addCommand(pushCommand(tagit));
program.addCommand(setupAliasCommand());

program.parse(process.argv);
