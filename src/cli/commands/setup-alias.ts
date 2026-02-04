import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import os from "os";

export function setupAliasCommand() {
  return new Command("setup-alias")
    .description('Configure the "t" alias manually if needed')
    .action(() => {
      const shell = process.env.SHELL;
      let rcFile = "";

      if (shell?.includes("zsh")) {
        rcFile = ".zshrc";
      } else if (shell?.includes("bash")) {
        rcFile = ".bashrc";
      } else {
        console.log(
          chalk.yellow("Could not detect supported shell (bash or zsh)."),
        );
        console.log(
          `Please add the following to your shell configuration manually:\n`,
        );
        console.log(chalk.cyan('alias t="tigit"'));
        return;
      }

      const homeDir = os.homedir();
      const rcPath = path.join(homeDir, rcFile);

      try {
        const aliasLine = '\nalias t="tigit"\n';
        if (fs.existsSync(rcPath)) {
          const content = fs.readFileSync(rcPath, "utf-8");
          if (content.includes('alias t="tigit"')) {
            console.log(chalk.green(`Alias already exists in ${rcFile}`));
            return;
          }
        }

        fs.appendFileSync(rcPath, aliasLine);
        console.log(chalk.green(`✓ Added alias to ${rcPath}`));
        console.log(chalk.gray("Run this to apply changes immediately:"));
        console.log(chalk.cyan(`source ~/${rcFile}`));
      } catch (e: any) {
        console.error(chalk.red("Error writing to config file:"), e.message);
      }
    });
}
