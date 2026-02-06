import { NameGenerator } from "./generator.js";
import { GitOperations } from "../git/operations.js";
import {
  TigitConfig,
  TagOptions,
  VersionTagOptions,
  TagType,
  TagPattern,
  TagResult,
} from "../types/index.js";
import { configManager } from "./config-manager.js";
import semver from "semver";

export class Tigit {
  private generator: NameGenerator;
  private git: GitOperations;
  private config: TigitConfig;

  constructor(config: Partial<TigitConfig> = {}) {
    // Merge provided config with persistent config, which defaults to DEFAULT_CONFIG
    this.config = { ...configManager.getAll(), ...config };
    this.generator = new NameGenerator(this.config);
    this.git = new GitOperations();
  }

  async init() {
    await this.git.init();
  }

  generate(options: { pattern?: TagPattern | string } = {}): string {
    return this.generator.generate(options.pattern);
  }

  async createTag(options: { name: string } & TagOptions): Promise<TagResult> {
    try {
      await this.git.createTag(options.name, options);
      return {
        name: options.name,
        created: true,
        message: "Tag created successfully",
      };
    } catch (error: any) {
      throw new Error(`Failed to create tag: ${error.message}`);
    }
  }

  async createRandomTag(
    options: { pattern?: TagPattern | string } & TagOptions = {},
  ): Promise<TagResult> {
    const name = this.generate({ pattern: options.pattern });
    // Check if exists
    const tags = await this.listTags();
    if (tags.includes(name)) {
      // Retry once or throw? For now just try again
      const name2 = this.generate({ pattern: options.pattern });
      if (tags.includes(name2)) {
        throw new Error("Failed to generate unique tag name");
      }
      return this.createTag({ ...options, name: name2 });
    }
    return this.createTag({ ...options, name });
  }

  async createVersionTag(options: VersionTagOptions): Promise<TagResult> {
    // Logic to construct version string
    // v1.0.0-alpha.1
    let tagName = `${this.config.versionPrefix}${options.version}`;

    if (options.type !== TagType.Stable) {
      tagName += `-${options.type}`;
      if (options.iteration) {
        tagName += `.${options.iteration}`;
      }
    }

    if (options.metadata) {
      tagName += `+${options.metadata}`;
    }

    return this.createTag({
      name: tagName,
      annotated: true,
      message: `Release ${tagName}`,
    });
  }

  async bumpVersion(options: {
    type: TagType;
    bump: "major" | "minor" | "patch";
  }): Promise<TagResult> {
    const tags = await this.listTags();
    const versions = tags
      .map((t) => semver.clean(t))
      .filter((v) => v !== null) as string[];

    versions.sort(semver.rcompare);
    const latest = versions[0];

    let nextVersion: string | null;

    if (!latest) {
      // No existing versions - create initial version
      nextVersion = "0.1.0";

      // If pre-release type is specified, append it
      if (options.type !== TagType.Stable) {
        nextVersion = `${nextVersion}-${options.type}.0`;
      }
    } else {
      // Bump from existing version
      if (options.type === TagType.Stable) {
        // For stable releases, just bump the version
        nextVersion = semver.inc(latest, options.bump);
      } else {
        // For pre-releases (alpha, beta, rc), use prerelease increment
        // First bump the version, then add the pre-release identifier
        const bumped = semver.inc(latest, options.bump);
        if (bumped) {
          nextVersion = `${bumped}-${options.type}.0`;
        } else {
          nextVersion = null;
        }
      }
    }

    if (!nextVersion) {
      throw new Error("Failed to increment version");
    }

    return this.createTag({
      name: `${this.config.versionPrefix}${nextVersion}`,
      annotated: true,
    });
  }

  async listTags(): Promise<string[]> {
    return this.git.listTags();
  }

  async deleteTag(name: string, remote: boolean = false): Promise<void> {
    await this.git.deleteTag(name, remote);
  }

  async pushTags(): Promise<void> {
    await this.git.pushTags();
  }
}
