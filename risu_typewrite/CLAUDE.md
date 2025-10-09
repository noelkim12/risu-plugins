# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Risu Typewrite is a typing practice game plugin for RISU AI. It displays as a WinBox modal within the RISU AI interface, allowing users to practice typing with text from their chat conversations or predefined paragraphs. The plugin tracks typing statistics (WPM, CPM, accuracy) and stores them in IndexedDB.

## Build Commands

**Development (watch mode):**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
```

**Development build (unminified):**
```bash
npm run build:dev
```

All builds output to `dist/risu_typewrite.js` with Webpack bundling. The banner includes plugin metadata (@name, @version, @description) required by RISU AI's plugin system.

## Architecture

### Entry Point & Plugin Lifecycle

- **Entry**: `src/index.js` exports `RisuTypewrite` class
- **Initialization**: Accesses `globalThis.__pluginApis__` for RISU AI integration
- **Plugin API (`RisuAPI`)**: Wrapper around `globalThis.__pluginApis__` providing access to:
  - `risuFetch/nativeFetch`: Network requests
  - `getChar/setChar`: Character data access
  - `getDatabase`: Database access (eval-based injection)
  - `onUnload`: Cleanup callback registration

### UI Architecture

**Hash-based SPA routing** within WinBox modal:
- `#/game` or `#/` → Typing game (`<rt-typing-game>`)
- `#/stats` → Statistics view (`<rt-typing-stats>`)

**UI Integration**:
- Injects menu button into RISU AI's burger menu (`.absolute.right-2.bottom-16...`)
- Uses MutationObserver to re-attach button when DOM changes
- WinBox modal for responsive mobile/desktop UI

### Core Components

**TypingEngine** (`src/core/typing-engine.js`):
- Main game logic: character-by-character typing validation
- Handles Korean IME composition events (`compositionstart/update/end`)
- Key repeat prevention (100ms threshold)
- Real-time WPM/CPM calculation
- Text source priority: 80% from chat messages (role="char"), 20% from predefined paragraphs

**TypeStorage** (`src/core/type-storage.js`):
- IndexedDB schema with two stores:
  - `daily-stats`: Per-day statistics (keyPath: date as YYYY-MM-DD)
  - `total-stats`: Lifetime aggregates (single row with id='total')
- Point system: 1 character typed = 1 point
- Averages recalculated from all session data on each update

**Custom Elements**:
- `<rt-typing-game>`: Game UI with TypingEngine integration
- `<rt-typing-stats>`: Statistics dashboard (daily/total views)
- `<rt-menu-button>`: Burger menu integration

### Text Source Logic

**Priority (in `TypingEngine.determineTargetText`):**
1. If no chat messages or empty → use `getRandomParagraph()`
2. Filter messages with `role === "char"`
3. 80% probability: Use `pickRandomSentence()` from random char message
4. 20% probability: Use `getRandomParagraph()` from predefined set

**Sentence extraction** (`chatGetter.js`):
- Splits on sentence boundaries (`.?!` + whitespace/newlines)
- Filters: 4-120 chars, 2+ words, no excessive special characters
- Prefers quoted sentences when available

### External Dependencies

**CDN-loaded via script injection** (`src/utils/script-injector.js`):
- `idb@8`: IndexedDB wrapper for TypeStorage
- `winbox@0.2.82`: Modal window library

**Build dependencies**: webpack, terser-webpack-plugin

## Development Notes

**Korean input handling:**
- CRITICAL: Always check `isComposing` state before processing input
- Use `compositionstart/update/end` events to prevent double character counting
- `isTransitioning` state prevents input during paragraph transitions

**State management:**
- `charIndex`: Current typing position (0-based)
- `isTyping`: Whether user has started typing (for timer start)
- `isComposing`: Korean IME composition in progress
- `isTransitioning`: Paragraph switch in progress

**Database schema changes:**
- Update `DB_VERSION` in `type-storage.js`
- Modify `initDB()` upgrade function
- Averages are always recalculated from raw session data (no incremental averaging)

**Plugin metadata:**
- Version defined in `src/constants.js` (PLUGIN_NAME, PLUGIN_VERSION)
- Webpack banner auto-generates RISU AI plugin headers

**RISU AI integration:**
- Always use `globalThis.__pluginApis__` for host app interaction
- Button injection requires exact CSS selector match (burger menu location)
- `onUnload` callback required for proper cleanup
