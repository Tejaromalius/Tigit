import { Command } from "commander";
import chalk from "chalk";
import { Tigit } from "../core/tagger.js";
import { createCommand } from "./commands/create.js";
import { generateCommand } from "./commands/generate.js";
import { listCommand } from "./commands/list.js";
import { deleteCommand } from "./commands/delete.js";
import { pushCommand } from "./commands/push.js";
import { setupAliasCommand } from "./commands/setup-alias.js";

const program = new Command();
const tigit = new Tigit();

program
  .name("tigit")
  .description(
    "🏷️  Generate creative Git tags and semantic version tags with ease",
  )
  .version("1.0.0")
  .addHelpText(
    "after",
    `
Examples:
  $ tigit                # Quick creative tag (e.g. "gentle-wolf")
  $ t                    # Even faster using the global alias
  $ tigit --help         # Show this help
  $ tigit create --help  # Show help for create command
`,
  );

// Default action if no command specified: create random tag (Ultra-fast 't' mode)
program.action(async () => {
  // Check if arguments were passed that match commands but weren't caught
  // But if we are here, no subcommands matched.
  // So we just create a random tag immediately.
  try {
    await tigit.init();
    const result = await tigit.createRandomTag({ annotated: false });
    console.log(chalk.green(`✨ Tag created: ${chalk.bold(result.name)}`));
  } catch (e: any) {
    console.error(chalk.red("Error:"), e.message);
    process.exit(1);
  }
});

program.addCommand(createCommand(tigit));
program.addCommand(generateCommand(tigit));
program.addCommand(listCommand(tigit));
program.addCommand(deleteCommand(tigit));
program.addCommand(pushCommand(tigit));
program.addCommand(setupAliasCommand());

program.parse(process.argv);
