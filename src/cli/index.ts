import { Command } from "commander";
import chalk from "chalk";
import { Tigit } from "../core/tagger.js";
import { createCommand } from "./commands/create.js";
import { generateCommand } from "./commands/generate.js";
import { listCommand } from "./commands/list.js";
import { deleteCommand } from "./commands/delete.js";
import { pushCommand } from "./commands/push.js";
import { setupAliasCommand } from "./commands/setup-alias.js";
import { configCommand } from "./commands/config.js";

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

// Default action if no command specified: Smart Mode (Detects versioning vs creative)
program.action(async () => {
  try {
    await tigit.init();
    const result = await tigit.createSmartTag({ annotated: false });
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
program.addCommand(configCommand());

program.parse(process.argv);
