import { Command } from "commander";
import { configManager } from "../../core/config-manager.js";
import { TagPattern } from "../../types/index.js";
import chalk from "chalk";

export function configCommand() {
  const cmd = new Command("config");

  cmd.description("Manage Tigit configuration");

  cmd
    .command("set")
    .description("Set a configuration value")
    .argument("<key>", "Configuration key (e.g., pattern, separator, maxWords)")
    .argument("<value>", "Configuration value")
    .action((key, value) => {
      try {
        if (key === "pattern") {
          // Validate pattern
          const validPatterns = Object.values(TagPattern) as string[];
          if (!validPatterns.includes(value) && value !== "random") {
            console.warn(
              chalk.yellow(
                `Warning: '${value}' is not a standard pattern. It will be treated as a category or fall back to random.`,
              ),
            );
          }
          configManager.set("pattern", value as TagPattern);
        } else if (key === "maxWords") {
          configManager.set("maxWords", parseInt(value, 10));
        } else if (key === "separator") {
          configManager.set("separator", value);
        } else if (key === "versionPrefix") {
          configManager.set("versionPrefix", value);
        } else {
          throw new Error(`Invalid configuration key: ${key}`);
        }

        console.log(
          chalk.green(
            `✓ Configuration ${chalk.bold(key)} set to ${chalk.bold(value)}`,
          ),
        );
      } catch (error: any) {
        console.error(chalk.red("Error:"), error.message);
      }
    });

  cmd
    .command("list")
    .description("List current configuration")
    .action(() => {
      const config = configManager.getAll();
      console.log(chalk.blue.bold("\nCurrent Tigit Configuration:"));
      Object.entries(config).forEach(([key, value]) => {
        console.log(`${chalk.gray(key)}: ${chalk.white(value)}`);
      });
      console.log("");
    });

  cmd
    .command("reset")
    .description("Reset configuration to defaults")
    .action(() => {
      configManager.reset();
      console.log(chalk.green("✓ Configuration reset to defaults."));
    });

  return cmd;
}
