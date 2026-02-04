# Tigit 🏷️

> Generate creative, memorable Git tags and semantic version tags with a single command.

[![npm version](https://img.shields.io/npm/v/tigit.svg)](https://www.npmjs.com/package/tigit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ⚡ Ultra-Fast Tagging

Speed is a feature. Tigit provides a global alias `t` for instant tagging.

```bash
t
# ✨ Tag created: gentle-red-deer
```

No prompts. No config needed. Just one keystroke to mark your progress.

## Features

- 🎲 **Creative Names**: `hollow-bat`, `crimson-tiger-jumped`
- 📦 **Semantic Versioning**: `v1.0.0-beta.1` with auto-increment
- ⚡ **Zero Config**: Works out of the box
- 🔄 **Git Integration**: Push, delete, and sync tags
- 🏷️ **Annotated Tags**: Optional messages support
- 📚 **Huge Word Lists**: 3000+ words included (Animals, Colors, Adjectives, Verbs)

## Installation

```bash
npm install -g tigit
```

This installs two commands: `tigit` and the ultra-fast alias `t`.

## Usage

### Instant Tagging

```bash
t             # Create random tag immediately
t --push      # Create and push to remote
```

### Semantic Releases

```bash
tigit create --tag-version 1.0.0               # v1.0.0
tigit create --tag-version 1.0.0 --type beta   # v1.0.0-beta
tigit create --bump patch --type beta          # Auto-increment
```

### Creative Patterns

```bash
tigit create --pattern adjective-animal        # silent-wolf
tigit create --pattern color-animal-verb       # red-fox-ran
```

### Manage Tags

```bash
tigit list
tigit delete <tag-name> --remote
tigit push
```

## License

MIT
