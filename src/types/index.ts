export enum TagType {
  Creative = "creative",
  Alpha = "alpha",
  Beta = "beta",
  RC = "rc",
  Stable = "stable",
}

export enum TagPattern {
  AdjectiveNoun = "adjective-noun",
  AdjectiveAnimal = "adjective-animal",
  ColorAnimal = "color-animal",
  AdjectiveColorAnimal = "adjective-color-animal",
  VerbAdjectiveNoun = "verb-adjective-noun",
  Random = "random",
  Version = "version",
}

export interface TigitConfig {
  categories: string[];
  separator: string;
  maxWords: number;
  pattern: TagPattern;
  versionPrefix: string;
}

export interface TagOptions {
  name?: string;
  message?: string;
  annotated?: boolean;
}

export interface VersionTagOptions {
  version: string;
  type: TagType;
  iteration?: number;
  metadata?: string;
}

export interface TagResult {
  name: string;
  created: boolean;
  message?: string;
}
