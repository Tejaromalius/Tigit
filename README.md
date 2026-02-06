# Tigit 🏷️

> Generate creative, memorable Git tags and semantic version tags with a single command.

Tigit replaces boring version numbers with fun, memorable names like `gentle-wolf`, or simplifies semantic versioning with powerful bumping logic. It's designed to be ultra-fast and zero-overhead.

[![npm version](https://img.shields.io/npm/v/tigit.svg)](https://www.npmjs.com/package/tigit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ⚡ Installation

```bash
npm install -g tigit
```

This installs the `tigit` command and an ultra-fast alias `t`.

---

## 🎨 Core Concepts: Patterns vs Categories

Understanding the difference between patterns and categories helps you customize your tags:

- **Categories**: The source word lists (dictionaries).
  - *Built-in*: `adjectives`, `animals`, `colors`, `verbs`.
- **Patterns**: The "recipe" or structure of the tag.
  - *Predefined*: `adjective-animal`, `color-animal-verb`, etc.
  - *Random*: Uses your `maxWords` setting to pick words from random categories.
  - *Dynamic*: You can use a category name directly as a pattern (e.g., `--pattern colors`) to get a single word from that list.

**Fallback Logic**: If you specify a pattern that Tigit doesn't recognize or a category that doesn't exist, it gracefully falls back to the `random` logic to ensure a tag is always generated.

---

## 🚀 Command Reference

### `tigit` (or `t`)

The default action uses **Smart Mode** to detect your project's style:

- **Versioning**: If your latest tag is a semantic version (e.g., `v1.2.3`), it automatically bumps the patch version.
- **Creative**: If your latest tag is a name or if no tags exist, it generates a random creative tag.
- **Example**: `t` → `✨ Tag created: v1.2.4` (or `silent-tiger`)

### `tigit create`

The primary command for generating and applying tags to your current repository.

| Option | Shorthand | Description | Example |
| :--- | :--- | :--- | :--- |
| `--pattern` | `-p` | Use a specific naming pattern or category. | `t create -p colors` |
| `--tag-version` | `-v` | Create a specific semantic version tag. | `t create -v 1.2.0` |
| `--bump` | `-b` | Bump the version: `major`, `minor`, or `patch`. | `t create -b patch` |
| `--type` | `-t` | Release type: `stable` (default), `alpha`, `beta`, `rc`. | `t create -b minor -t beta` |
| `--message` | `-m` | Add a message (creates an **annotated** tag). | `t create -m "Fix bugs"` |
| `--push` | | Automatically push the new tag to `origin`. | `t create --push` |

**Smart Bumping**:

- If no tags exist, `create --bump` will start at `v0.1.0`.
- It intelligently handles pre-releases (e.g., bumping `v1.0.0` with `--type beta` results in `v1.0.1-beta.0`).

### `tigit generate`

Preview a tag name without actually creating it in Git.

- **Example**: `tigit generate --pattern color-animal` → `crimson-panda`

### `tigit config`

Manage your persistent settings. Config is stored locally and applied to all your projects.

- `tigit config set <key> <value>`: Set a persistent option.
  - `pattern`: Default pattern (e.g., `adjective-animal`).
  - `maxWords`: Number of words for random patterns (1-5).
  - `separator`: Character between words (e.g., `.`, `-`, `_`).
  - `versionPrefix`: Prefix for versions (default: `v`).
- `tigit config list`: View your current configuration.
- `tigit config reset`: Revert all settings to defaults.

**Pro-tip**: Set your favorite pattern once: `tigit config set pattern adjective-animal`. Now, every time you run `t`, it will use that style!

### `tigit list`

List all tags in the current repository.

- **Example**: `tigit list`

### `tigit delete <tag>`

Delete a tag.

- `--remote`: Also delete the tag from the remote repository (`origin`).
- **Example**: `tigit delete v1.0.0 --remote`

### `tigit push`

Push all local tags to the remote repository.

- **Example**: `tigit push`

### `tigit setup-alias`

If the `t` alias was not set up during installation, run this to add it to your shell configuration (`.zshrc`, `.bashrc`, etc.).

---

## 🛠️ Typical Workflows

**1. The "Quick Save"**
Just finished a small fix?

```bash
t
```

**2. The "Formal Beta Release"**
Ready for testing?

```bash
tigit create --bump minor --type beta --push
# Result: v1.1.0-beta.0 created and pushed
```

**3. The "Themed Project"**
Want all tags in a project to be colors?

```bash
tigit config set pattern colors
t
# Result: emerald
```

---

## License

MIT
