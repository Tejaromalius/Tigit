import { Command } from "commander";
import { Tigit } from "../../core/tagger.js";
import { TagType, TagResult } from "../../types/index.js";
import chalk from "chalk";

export function createCommand(tigit: Tigit) {
  const cmd = new Command("create");

  cmd
    .description("Create a new tag")
    .option(
      "-p, --pattern <pattern>",
      "Naming pattern (e.g., adjective-animal)",
    )
    .option(
      "-v, --tag-version <version>",
      "Specific semantic version (e.g., 1.0.0)",
    )
    .option("-t, --type <type>", "Tag type (alpha, beta, rc, stable)", "stable")
    .option("-b, --bump <level>", "Bump version (major, minor, patch)")
    .option("--push", "Push to remote after creation")
    .option("-m, --message <message>", "Tag message")
    .action(async (options) => {
      try {
        await tigit.init();
        let result: TagResult;

        if (options.tagVersion) {
          result = await tigit.createVersionTag({
            version: options.tagVersion,
            type: options.type as TagType,
            metadata: options.message,
          });
        } else if (options.bump) {
          result = await tigit.bumpVersion({
            type: options.type as TagType,
            bump: options.bump,
          });
        } else {
          // Random creative tag
          result = await tigit.createRandomTag({
            pattern: options.pattern,
            message: options.message,
            annotated: !!options.message,
          });
        }

        console.log(chalk.green(`Tag created: ${chalk.bold(result.name)}`));

        if (options.push) {
          console.log(chalk.gray("Pushing to remote..."));
          await tigit.pushTags(); // Or push specific tag if API supports
          console.log(chalk.blue("Pushed successfully."));
        }
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message);
        process.exit(1);
      }
    });

  return cmd;
}
