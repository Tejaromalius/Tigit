import { Command } from "commander";
import { Tigit } from "../../core/tagger.js";
import { TagType, TagResult } from "../../types/index.js";
import chalk from "chalk";

export function createCommand(tigit: Tigit) {
  const cmd = new Command("create");

  cmd
    .description("Create a new Git tag (random creative or semantic version)")
    .option(
      "-p, --pattern <pattern>",
      "Naming pattern for creative tags (e.g., adjective-animal, color-animal-verb)",
    )
    .option(
      "-v, --tag-version <version>",
      "Specific semantic version (e.g., 1.0.0)",
    )
    .option("-t, --type <type>", "Tag type (alpha, beta, rc, stable)", "stable")
    .option("-b, --bump <level>", "Bump version (major, minor, patch)")
    .option("--push", "Push the new tag to remote repository immediately")
    .option(
      "-m, --message <message>",
      "Add a message to the tag (creates an annotated tag)",
    )
    .addHelpText(
      "after",
      `
Available Patterns:
  random (default)       - 2-word random combination
  adjective-animal       - e.g., silent-tiger
  adjective-noun         - alias for adjective-animal
  color-animal           - e.g., crimson-panda
  adjective-color-animal - e.g., huge-blue-bear
  verb-adjective-noun    - e.g., jump-happy-deer
  color-animal-verb      - e.g., red-fox-ran

Examples:
  $ tigit create                                     # creative-random-tag
  $ tigit create --pattern color-animal-verb         # red-fox-ran
  $ tigit create --tag-version 1.0.0                 # v1.0.0
  $ tigit create --tag-version 1.1.0-beta --type beta # v1.1.0-beta
  $ tigit create --bump patch --push                 # Bumps patch version and pushes
  $ tigit create -m "Release version 2.0"            # Tag with message
`,
    )
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
