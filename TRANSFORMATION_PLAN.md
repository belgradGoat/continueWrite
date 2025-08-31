# ContinueWrite Transformation Plan

**Converting Continue.dev (coding assistant) to ContinueWrite (creative writing assistant)**

## Overview

This document outlines the complete transformation of Continue.dev from a coding-focused AI assistant to a creative writing assistant for authors, bloggers, and content creators.

## Project Structure Analysis

### Key Directories:
- `extensions/vscode/` - VS Code extension
- `core/` - Core functionality and logic
- `gui/` - React-based user interface
- `packages/` - Shared packages

### Core Files to Modify:
- `extensions/vscode/package.json` - Extension metadata
- `extensions/vscode/src/commands.ts` - Command definitions
- `core/commands/slash/built-in-legacy/` - Slash commands
- `gui/src/components/ConversationStarters/` - UI prompts

---

## Phase 1: Extension Identity & Branding

### 1.1 VS Code Extension Metadata

**File**: `extensions/vscode/package.json`

**Current Values → New Values:**
```json
{
  "name": "continue" → "continuewrite",
  "displayName": "Continue - open-source AI code agent" → "ContinueWrite - AI Writing Assistant",
  "description": "The leading open-source AI code agent" → "AI-powered creative writing assistant for authors, bloggers, and content creators",
  "publisher": "Continue" → "ContinueWrite",
  "keywords": [
    "chatgpt", "cline", "roo", "github", "copilot", "claude", "mistral", "codestral", "ai"
    →
    "writing", "creative", "authors", "books", "novel", "blog", "content", "ai", "assistant"
  ],
  "categories": [
    "AI", "Chat", "Programming Languages", "Education", "Machine Learning", "Snippets"
    →
    "AI", "Chat", "Other", "Education", "Language Packs"
  ]
}
```

### 1.2 Command Name Updates

**Global Find & Replace Operations:**
```
continue.writeCommentsForCode → continuewrite.improveDialogue
continue.writeDocstringForCode → continuewrite.addDescription
continue.fixCode → continuewrite.improveWriting
continue.optimizeCode → continuewrite.enhanceProse
continue.fixGrammar → continuewrite.fixGrammar
```

### 1.3 New Writing Commands

**Add to `contributes.commands` in package.json:**
```json
{
  "command": "continuewrite.continueScene",
  "category": "ContinueWrite",
  "title": "Continue Scene",
  "group": "ContinueWrite"
},
{
  "command": "continuewrite.brainstormIdeas",
  "category": "ContinueWrite", 
  "title": "Brainstorm Ideas",
  "group": "ContinueWrite"
},
{
  "command": "continuewrite.developCharacter",
  "category": "ContinueWrite",
  "title": "Develop Character",
  "group": "ContinueWrite"
}
```

---

## Phase 2: Core Functionality Transformation

### 2.1 Built-in Slash Commands

**File**: `core/commands/slash/built-in-legacy/index.ts`

**Remove These Commands:**
- `DraftIssueCommand`
- `GenerateTerminalCommand` 
- `ReviewMessageCommand`
- `CommitMessageCommand`

**Add New Writing Commands:**

Create new files in `core/commands/slash/built-in-legacy/`:

#### `continue-scene.ts`
```typescript
import { SlashCommand } from "../../..";

const ContinueSceneCommand: SlashCommand = {
  name: "continue",
  description: "Continue the current scene or paragraph",
  run: async function* (sdk) {
    yield "I'll help you continue this scene. Please provide the text you'd like me to continue, and I'll maintain the same style and tone.\n\n";
  }
};

export default ContinueSceneCommand;
```

#### `brainstorm.ts`
```typescript
import { SlashCommand } from "../../..";

const BrainstormCommand: SlashCommand = {
  name: "brainstorm", 
  description: "Generate creative ideas for your writing",
  run: async function* (sdk) {
    yield "I'll help you brainstorm creative ideas! What would you like to explore?\n\n";
    yield "- Plot ideas and story concepts\n";
    yield "- Character backgrounds and motivations\n";
    yield "- Setting and world-building\n";
    yield "- Conflict and tension\n";
    yield "- Themes and symbolism\n\n";
    yield "Just tell me what you're working on and what kind of ideas you need!";
  }
};

export default BrainstormCommand;
```

#### `character.ts`
```typescript
import { SlashCommand } from "../../..";

const CharacterCommand: SlashCommand = {
  name: "character",
  description: "Develop character backstories and personalities", 
  run: async function* (sdk) {
    yield "I'll help you develop compelling characters! I can assist with:\n\n";
    yield "- Character backstories and motivations\n";
    yield "- Personality traits and quirks\n";
    yield "- Character arcs and development\n";
    yield "- Dialogue voice and speech patterns\n";
    yield "- Relationships and conflicts\n\n";
    yield "Share details about your character and I'll help bring them to life!";
  }
};

export default CharacterCommand;
```

### 2.2 Command Handler Updates

**File**: `extensions/vscode/src/commands.ts`

**Update `streamInlineEdit` prompts:**
```typescript
const writingPrompts = {
  improveDialogue: "Improve the dialogue in this text to make it more natural, engaging, and true to each character's voice. Focus on subtext, rhythm, and authentic speech patterns.",
  
  addDescription: "Add vivid, sensory descriptions to enhance this scene. Include details that engage multiple senses and create atmosphere without overwriting.",
  
  improveWriting: "Improve this writing to enhance clarity, flow, and engagement. Maintain the author's voice while strengthening prose and narrative impact.",
  
  enhanceProse: "Enhance the prose style of this text. Improve sentence variety, word choice, and literary flow while preserving the author's unique voice.",
  
  continueScene: "Continue this scene in a natural way that maintains the established tone, style, and character voices. Advance the narrative meaningfully.",
  
  fixGrammar: "Fix any grammar, spelling, or punctuation errors in this text. Make minimal changes to preserve the author's style and voice."
};
```

**Update command implementations:**
```typescript
"continuewrite.improveDialogue": async () => {
  captureCommandTelemetry("improveDialogue");
  streamInlineEdit("improveDialogue", writingPrompts.improveDialogue);
},

"continuewrite.addDescription": async () => {
  captureCommandTelemetry("addDescription");
  streamInlineEdit("addDescription", writingPrompts.addDescription);
},

"continuewrite.continueScene": async () => {
  captureCommandTelemetry("continueScene");
  streamInlineEdit("continueScene", writingPrompts.continueScene);
}
```

---

## Phase 3: User Interface Updates

### 3.1 Conversation Starters

**File**: `gui/src/components/ConversationStarters/ConversationStarterCards.tsx`

**Replace with writing-focused prompts:**

Create new conversation starters for creative writing:

```typescript
const writingPrompts = [
  {
    title: "Start a Scene",
    description: "Help me write a compelling opening scene",
    prompt: "I need help writing an engaging opening scene. Here's what I have in mind..."
  },
  {
    title: "Develop Character", 
    description: "Create a detailed character backstory",
    prompt: "I want to develop a character for my story. Help me create their backstory, personality, and motivations..."
  },
  {
    title: "Plot Development",
    description: "Brainstorm plot twists and story directions", 
    prompt: "I'm working on a story and need help with plot development. Here's my current plot..."
  },
  {
    title: "Improve Dialogue",
    description: "Make conversations more natural and engaging",
    prompt: "I have some dialogue that feels stiff. Can you help me make it more natural and engaging?"
  },
  {
    title: "Setting Description",
    description: "Create vivid, immersive settings",
    prompt: "Help me describe a setting in vivid detail. I want to create an immersive scene..."
  }
];
```

### 3.2 Context Menu Integration

**Update `contributes.menus.continue.continueSubMenu` in package.json:**

```json
"continue.continueSubMenu": [
  {
    "command": "continuewrite.continueScene",
    "group": "ContinueWrite",
    "when": "editorHasSelection && !editorReadonly"
  },
  {
    "command": "continuewrite.improveDialogue", 
    "group": "ContinueWrite",
    "when": "editorHasSelection && !editorReadonly"
  },
  {
    "command": "continuewrite.addDescription",
    "group": "ContinueWrite", 
    "when": "editorHasSelection && !editorReadonly"
  },
  {
    "command": "continuewrite.enhanceProse",
    "group": "ContinueWrite",
    "when": "editorHasSelection && !editorReadonly"
  },
  {
    "command": "continuewrite.fixGrammar",
    "group": "ContinueWrite",
    "when": "editorHasSelection && !editorReadonly"
  }
]
```

---

## Phase 4: Configuration & Models

### 4.1 Default Configuration

**File**: `core/config/default.ts`

Update default config for writing use cases:

```typescript
export const defaultConfig: ConfigYaml = {
  name: "Creative Writing Assistant",
  version: "1.0.0", 
  schema: "v1",
  models: [
    // Suggest popular creative writing models
    {
      title: "Claude 3.5 Sonnet",
      provider: "anthropic",
      model: "claude-3-5-sonnet-20241022"
    }
  ],
  contextProviders: [
    { name: "file" },
    { name: "folder" },
    { name: "search" }
  ],
  slashCommands: [
    { name: "continue", description: "Continue the current scene" },
    { name: "brainstorm", description: "Generate creative ideas" },
    { name: "character", description: "Develop characters" }
  ]
};
```

### 4.2 Model Recommendations

Create writing-specific model suggestions:
- **Creative Writing**: Claude 3.5 Sonnet, GPT-4, Gemini Pro
- **Technical Writing**: GPT-4, Claude 3.5 Sonnet
- **Blog Posts**: GPT-3.5 Turbo, Claude 3 Haiku
- **Fiction**: Claude 3.5 Sonnet, GPT-4 (best for creative tasks)

---

## Phase 5: Testing & Quality Assurance

### 5.1 Core Functionality Tests

**Test Cases:**
1. **Right-click context menu** shows writing commands
2. **Slash commands** work for `/continue`, `/brainstorm`, `/character`
3. **LM Studio integration** works with creative writing models
4. **Conversation starters** show writing prompts
5. **Command execution** produces appropriate writing assistance

### 5.2 User Experience Tests

**Scenarios:**
1. **New user onboarding** - Does it clearly explain writing features?
2. **Creative writing workflow** - Select text → right-click → improve dialogue
3. **Scene continuation** - Use `/continue` command to extend a scene
4. **Character development** - Use `/character` to develop a character profile

### 5.3 Model Integration Tests

**With LM Studio:**
1. Test with creative writing models (Claude, GPT-4)
2. Verify prompts produce quality creative content
3. Test different writing styles and genres
4. Ensure consistent creative output

---

## Implementation Checklist

### Phase 1: Branding ✅
- [ ] Update `extensions/vscode/package.json`
- [ ] Global find/replace command names
- [ ] Update extension metadata
- [ ] Test extension loads correctly

### Phase 2: Core Functions ✅  
- [ ] Create new slash commands in `core/commands/slash/built-in-legacy/`
- [ ] Update command handlers in `extensions/vscode/src/commands.ts`
- [ ] Update prompt templates for writing
- [ ] Test slash commands work

### Phase 3: UI Updates ✅
- [ ] Update conversation starters
- [ ] Modify empty chat body
- [ ] Update context menu items
- [ ] Test UI shows writing prompts

### Phase 4: Configuration ✅
- [ ] Update default config for writing
- [ ] Test LM Studio integration
- [ ] Verify model compatibility
- [ ] Test end-to-end workflow

### Phase 5: Polish ✅
- [ ] Update documentation
- [ ] Create writing examples
- [ ] Test with real creative writing tasks
- [ ] Gather feedback and iterate

---

## File Priority Order

**Start with these files first:**

1. **`extensions/vscode/package.json`** - Extension identity
2. **`extensions/vscode/src/commands.ts`** - Core command logic  
3. **`core/commands/slash/built-in-legacy/index.ts`** - Slash commands
4. **`gui/src/components/ConversationStarters/`** - UI prompts

**Then move to:**

5. **`core/config/default.ts`** - Default configuration
6. **UI components** - Polish the interface
7. **Documentation** - Update README and docs

---

## Development Commands

**Build and test:**
```bash
# Install dependencies
npm install

# Build the extension  
npm run esbuild

# Watch for changes
npm run esbuild-watch

# Package for testing
npm run package
```

**Testing:**
```bash
# Open in VS Code for testing
code --install-extension continue.vsix

# Test with LM Studio
# 1. Start LM Studio server
# 2. Load a creative writing model 
# 3. Test ContinueWrite commands
```

---

## Success Criteria

**ContinueWrite is ready when:**
- ✅ Extension loads as "ContinueWrite - AI Writing Assistant"
- ✅ Right-click menu shows writing commands (not coding commands)
- ✅ Slash commands work for `/continue`, `/brainstorm`, `/character`  
- ✅ Conversation starters show writing prompts
- ✅ LM Studio integration works with creative models
- ✅ Writing assistance produces quality creative content

---

**Ready to start coding! 🚀**
