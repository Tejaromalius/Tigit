import simpleGit, { SimpleGit, TagResult } from "simple-git";
import { TagOptions, VersionTagOptions } from "../types/index.js";

export class GitOperations {
  private git: SimpleGit;

  constructor() {
    this.git = simpleGit();
  }

  async init(): Promise<void> {
    const isRepo = await this.git.checkIsRepo();
    if (!isRepo) {
      throw new Error("Not a git repository");
    }
  }

  async createTag(name: string, options: TagOptions = {}): Promise<void> {
    if (options.annotated) {
      await this.git.addAnnotatedTag(name, options.message || name);
    } else {
      await this.git.addTag(name);
    }
  }

  async deleteTag(name: string, remote: boolean = false): Promise<void> {
    await this.git.tag(["-d", name]);
    if (remote) {
      // Assume origin for now, or make configurable
      await this.git.push(["origin", "--delete", name]);
    }
  }

  async listTags(): Promise<string[]> {
    const tags = await this.git.tags();
    return tags.all;
  }

  async pushTags(): Promise<void> {
    await this.git.pushTags();
  }

  async pushTag(name: string): Promise<void> {
    await this.git.push("origin", name);
  }

  async getLatestTag(): Promise<string | null> {
    const tags = await this.git.tags();
    return tags.latest || null;
  }
}
