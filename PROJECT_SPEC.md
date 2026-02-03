# Tagit - Random Branch Name Generator

## Project Overview

**Tagit** is a TypeScript-based CLI tool and library for generating creative, memorable Git tags using categorized word lists. It supports semantic versioning for alpha, beta, and release candidates, while also allowing purely creative tag names for marking commits with unique, human-friendly identifiers.

## Core Features

### 1. Random Git Tag Generation

- Generate creative tag names from multiple categories of words
- Combine words from different categories for unique, memorable tags
- Configurable patterns (e.g., `adjective-noun`, `color-animal-verb`)
- Ensure uniqueness within the repository
- Support both lightweight and annotated tags
- **⚡ Ultra-fast execution**: Single command `t` creates a tag instantly

### 2. Category-Based Word Lists

The tool will include extensive word lists across multiple categories:

#### Primary Categories

- **Animals**: mammals, birds, reptiles, fish, insects (500+ words)
- **Colors**: basic, advanced, shades, hex-inspired names (200+ words)
- **Adjectives**: descriptive, emotional, technical (400+ words)
- **Verbs**: action words, tech-related (300+ words)
- **Mythology**: Greek, Roman, Norse, Egyptian gods/creatures (200+ words)
- **Astronomy**: planets, stars, constellations, celestial objects (150+ words)
- **Geography**: mountains, rivers, cities, landmarks (300+ words)
- **Technology**: programming terms, frameworks, algorithms (250+ words)
- **Food**: fruits, vegetables, dishes, ingredients (200+ words)
- **Weather**: conditions, phenomena (100+ words)
- **Music**: instruments, genres, terms (150+ words)
- **Architecture**: styles, structures, elements (100+ words)

#### Total Word Pool: 3000+ unique words

### 3. Version Tagging Support

#### Alpha Releases

- Pattern: `v{major}.{minor}.{patch}-alpha.{iteration}`
- Example: `v1.0.0-alpha.1`
- Auto-increment alpha iteration
- Optional: Combine with random names (`v1.0.0-alpha.1-swift-falcon`)

#### Beta Releases

- Pattern: `v{major}.{minor}.{patch}-beta.{iteration}`
- Example: `v1.0.0-beta.3`
- Auto-increment beta iteration
- Track progression from alpha to beta

#### Release Candidates

- Pattern: `v{major}.{minor}.{patch}-rc.{iteration}`
- Example: `v1.0.0-rc.1`
- Pre-release validation tags

#### Stable Releases

- Pattern: `v{major}.{minor}.{patch}`
- Example: `v1.0.0`
- Follows semantic versioning strictly

### 4. CLI Interface

```bash
# ⚡ INSTANT TAGGING - Ultra-fast one-command tagging
t                                         # Single letter alias - instant tag!
tagit                                     # Same as 't' - creates tag immediately

# Generate and create a random tag on current commit
tagit create
tagit create --pattern "adjective-animal"  # With specific pattern
tagit create --categories "color,mythology" # With specific categories
tagit create --push                        # Create and push to remote

# Semantic version tagging
tagit create --version 1.0.0 --type alpha  # Explicit version
tagit create --bump patch --type beta      # Auto-increment
tagit create --bump minor                  # Bump minor version

# Preview without creating
tagit generate                             # Preview random name
tagit generate --pattern "adjective-noun"  # Preview with pattern

# Tag management
tagit list                                 # List all tags
tagit list --mine                          # Only tagit-created tags
tagit stats                                # Show statistics
tagit delete <tag-name>                    # Delete tag (local)
tagit delete <tag-name> --remote           # Delete from remote too

# Remote operations
tagit push                                 # Push all tags
tagit push --latest                        # Push only latest tag
tagit sync                                 # Sync with remote

# Aliases (all do the same - instant tag creation)
t
tagit
tagit now
tagit quick
```

### 5. Installation & Setup

```bash
# Install globally for CLI usage
npm install -g tagit

# Install as dev dependency for project
npm install --save-dev tagit

# Setup ultra-fast alias (one-time setup)
tagit setup-alias
# This adds 't' alias to your shell (.bashrc, .zshrc, etc.)
# After setup, just type 't' anywhere to create a tag!
```

### 6. Programmatic API

```typescript
import { Tagit, TagType, TagPattern } from "tagit";

const tagit = new Tagit({
  categories: ["animals", "colors", "adjectives"],
  separator: "-",
  maxWords: 3,
});

// Generate random tag name (without creating)
const tagName = tagit.generate();

// Generate with pattern
const patternedName = tagit.generate({
  pattern: TagPattern.AdjectiveNoun,
});

// Create a creative tag on current commit
await tagit.createTag({
  name: tagName,
  message: "Auto-generated tag",
  annotated: true,
});

// Create semantic version tag
await tagit.createVersionTag({
  version: "1.0.0",
  type: TagType.Alpha,
  iteration: 1,
});

// Auto-increment version
const nextTag = await tagit.bumpVersion({
  type: TagType.Beta,
  bump: "patch",
});

// List all tags
const tags = await tagit.listTags();

// Push tags to remote
await tagit.pushTags();
```

## Recommended Additional Features

### 7. Configuration File Support

- `.tagitrc.json` or `tagit.config.js`
- Define custom categories and word lists
- Set default patterns and preferences
- Project-specific naming conventions

```json
{
  "version": "1.0.0",
  "defaultPattern": "adjective-animal",
  "categories": ["animals", "colors", "adjectives"],
  "separator": "-",
  "maxWords": 3,
  "customCategories": {
    "team": ["alpha", "bravo", "charlie", "delta"]
  },
  "versionPrefix": "v",
  "allowDuplicates": false
}
```

### 8. Git Integration

- Automatic tag creation (lightweight and annotated)
- Check for existing tag names to prevent conflicts
- Push tags to remote repositories
- Tag deletion (local and remote)
- Fetch and sync tags from remote
- Support for multiple remotes

### 9. History and Analytics

- Track all generated tags with metadata
- Prevent duplicate tag names
- Show most used categories and patterns
- Export tag history to JSON/CSV
- Tag usage statistics and trends

### 10. Custom Word Lists

- Import custom word lists from files
- Support for multiple languages
- Community-contributed categories
- Download additional word packs

### 11. Interactive Mode

- Wizard-style tag creation
- Preview tag name before creation
- Category selection menu
- Version bump suggestions based on commit history
- Commit selection for tagging

### 12. Team Collaboration Features

- Shared configuration across team
- Tag naming convention enforcement
- Tag validation and policies
- Integration with release workflows
- Automated changelog generation from tags

### 13. Plugins and Extensions

- Plugin system for custom generators
- Hooks for pre/post generation
- Integration with GitHub/GitLab APIs
- Jira/Linear ticket integration

## Technical Specifications

### Technology Stack

- **Language**: TypeScript 5.x
- **Runtime**: Node.js 18+ (ESM support)
- **CLI Framework**: Commander.js or Yargs
- **Git Integration**: simple-git
- **Testing**: Jest or Vitest
- **Build Tool**: tsup or esbuild
- **Linting**: ESLint + Prettier
- **Documentation**: TypeDoc

### Project Structure

```
tagit/
├── src/
│   ├── cli/
│   │   ├── commands/
│   │   │   ├── create.ts
│   │   │   ├── generate.ts
│   │   │   ├── tag.ts
│   │   │   ├── list.ts
│   │   │   ├── push.ts
│   │   │   ├── delete.ts
│   │   │   ├── sync.ts
│   │   │   └── setup-alias.ts
│   │   └── index.ts
│   ├── core/
│   │   ├── generator.ts
│   │   ├── tagger.ts
│   │   ├── validator.ts
│   │   └── config.ts
│   ├── data/
│   │   ├── categories/
│   │   │   ├── animals.json
│   │   │   ├── colors.json
│   │   │   ├── adjectives.json
│   │   │   └── [other categories].json
│   │   └── index.ts
│   ├── git/
│   │   ├── tag.ts
│   │   ├── repository.ts
│   │   └── remote.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── API.md
│   ├── CLI.md
│   └── EXAMPLES.md
├── scripts/
│   ├── download-wordlists.ts
│   ├── setup-alias.ts
│   └── build.ts
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
├── package.json
├── tsconfig.json
├── README.md
├── LICENSE
└── CHANGELOG.md
```

### Package Configuration

```json
{
  "name": "tagit",
  "version": "1.0.0",
  "description": "Generate creative Git tags and semantic version tags with random category-based names",
  "keywords": [
    "git",
    "tag",
    "tagging",
    "version",
    "versioning",
    "cli",
    "semantic-versioning",
    "release",
    "git-tag"
  ],
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "bin": {
    "tagit": "./dist/cli.js",
    "t": "./dist/cli.js"
  },
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md", "LICENSE"],
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "build": "tsup",
    "test": "vitest",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\"",
    "prepublishOnly": "npm run build && npm test"
  }
}
```

## Data Sources for Word Lists

### Free Resources

1. **WordNet** - Princeton University's lexical database
2. **Moby Word Lists** - Public domain word lists
3. **SCOWL** - Spell Checker Oriented Word Lists
4. **GitHub Awesome Lists** - Curated word collections
5. **Wiktionary** - Free dictionary data dumps
6. **OpenThesaurus** - Open-source thesaurus

### Download Strategy

- Create a setup script to download and process word lists
- Cache locally in `src/data/categories/`
- Provide fallback embedded lists for offline use
- Allow users to update word lists independently

## Versioning Strategy

### Semantic Versioning Rules

- **Major**: Breaking API changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, backward compatible

### Pre-release Workflow

1. Development → `alpha` releases (unstable, frequent changes)
2. Feature complete → `beta` releases (testing, bug fixes)
3. Production ready → `rc` releases (final validation)
4. Stable → Official release

## Ultra-Fast Tagging Philosophy

**Tagit is designed for speed and simplicity.** The core principle is that creating a tag should be as fast as typing a single letter.

### Default Behavior

- Running `t` or `tagit` with no arguments **immediately creates a tag** on the current commit
- No confirmation prompts, no interactive menus (unless explicitly requested)
- Tag name is generated instantly using the default pattern
- Perfect for quick checkpoints, experiments, and rapid iteration

### Speed Optimizations

- **Single-letter alias**: `t` is the fastest way to tag
- **Smart defaults**: Pre-configured patterns and categories
- **Zero-config**: Works out of the box with sensible defaults
- **Async operations**: Tag creation happens in milliseconds
- **Cached word lists**: No I/O delays during generation

### When to Use

- Quick checkpoints during development
- Marking experimental branches
- Creating memorable references for commits
- Rapid prototyping and iteration
- Fun, creative commit markers

### Tag Naming Convention

```
v{major}.{minor}.{patch}[-{prerelease}.{iteration}][+{metadata}]

Examples:
- v1.0.0-alpha.1
- v1.0.0-beta.2
- v1.0.0-rc.1
- v1.0.0
- v1.0.0+build.123
```

## Testing Strategy

### Unit Tests

- Word list loading and validation
- Tag name generation algorithms
- Version parsing and incrementing
- Configuration validation
- Pattern matching and validation

### Integration Tests

- Git operations (tag creation, deletion, pushing)
- CLI command execution
- Config file loading
- Remote synchronization

### E2E Tests

- Full workflow scenarios
- Cross-platform compatibility
- NPM package installation

## Documentation Requirements

### README.md

- Quick start guide
- Installation instructions
- Basic usage examples
- Feature overview
- Contributing guidelines

### API Documentation

- TypeDoc generated API docs
- Usage examples for each method
- Type definitions

### CLI Documentation

- Command reference
- Option descriptions
- Examples for each command

## Distribution

### NPM Package

- Publish to npmjs.com
- Semantic versioning
- Automated releases via GitHub Actions
- Changelog generation

### GitHub Repository

- MIT License (recommended)
- Issue templates
- PR templates
- Contributing guidelines
- Code of conduct

## Success Metrics

- **Adoption**: NPM downloads, GitHub stars
- **Quality**: Test coverage > 80%, zero critical bugs
- **Performance**: Tag name generation < 100ms, tag creation < 500ms
- **Usability**: Comprehensive documentation, intuitive CLI
- **Reliability**: Zero tag conflicts, safe remote operations

## Timeline Estimate

### Phase 1: Core Development (2-3 weeks)

- Project setup and configuration
- Word list collection and processing
- Core generator implementation
- Basic CLI commands

### Phase 2: Git Integration (1-2 weeks)

- Tag creation and management (lightweight & annotated)
- Version tagging system
- Git repository integration
- Remote push/pull operations

### Phase 3: Advanced Features (2-3 weeks)

- Configuration file support
- Interactive mode
- History and analytics
- Custom word lists

### Phase 4: Polish and Release (1-2 weeks)

- Documentation
- Testing and bug fixes
- CI/CD setup
- NPM publication

**Total Estimated Time**: 6-10 weeks

## Future Enhancements

1. **Web Interface**: Browser-based tag name generator and preview
2. **VS Code Extension**: Generate and create tags from editor
3. **GitHub Action**: Automated tagging in CI/CD workflows
4. **AI Integration**: GPT-powered contextual tag naming based on commits
5. **Multi-language Support**: Internationalization for word lists
6. **Analytics Dashboard**: Tag usage statistics and insights
7. **Team Plans**: Shared configurations and tagging conventions
8. **API Service**: Cloud-based tag generation service
9. **Release Automation**: Auto-generate releases from version tags
10. **Changelog Integration**: Auto-update CHANGELOG.md from tags

## License

Recommended: **MIT License** for maximum adoption and community contribution.

---

**Document Version**: 1.0.0  
**Last Updated**: 2026-02-03  
**Author**: Project Specification  
**Status**: Draft - Ready for Implementation
