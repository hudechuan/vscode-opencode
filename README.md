# OpenCode Agent

A VS Code extension that integrates [OpenCode](https://opencode.ai) terminal into your editor, enabling seamless AI-assisted development workflows.

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-v0.0.3-blue)](https://marketplace.visualstudio.com/items?itemName=wenzewoo.opencode-agent)
[![License MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Features

### Terminal Integration
- **Create OpenCode Terminal** — Launch the OpenCode terminal directly from VS Code with intelligent tab placement
- **Multiple Terminals** — Support for multiple concurrent OpenCode terminals with easy switching
- **Smart Tab Placement** — Automatically finds existing OpenCode tabs or opens in a new column

### File Reference
- **Append to Chat** — Send file paths, selections, or editor content to OpenCode for discussion
- **Attach to Terminal** — Attach current file or selection to a running terminal session
- **Context Menus** — Right-click on files or editor to access OpenCode Terminal options
- **Editor Title Bar** — Quick access button in the editor title bar

## Requirements

- [OpenCode](https://opencode.ai) installed on your system
- VS Code version 1.94.0 or higher

## Installation

1. Open VS Code
2. Press `Cmd/Ctrl + P` and type `ext install wenzewoo.opencode-agent`
3. Reload VS Code after installation

Or install via [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=wenzewoo.opencode-agent)

## Usage

### Commands

| Command | Description |
|---------|-------------|
| `OpenCode Agent: Create` | Create new OpenCode terminal |
| `OpenCode Agent: Continue` | Continue the last session |
| `OpenCode Agent: Append to Chat` | Send file/selection to chat |
| `OpenCode Agent: Attach` | Attach file/selection to terminal |

### Context Menus

Right-click on files in Explorer or editor to access:
- **Create OpenCode Terminal** — Open a new terminal
- **Append to OpenCode Chat** — Send file path to existing terminal
- **Attach to OpenCode Terminal** — Attach file to running terminal

### Editor Title Bar

Click the OpenCode icon in the editor title bar to quickly create a terminal.

### Configuration

```json
{
  "opencode-agent.cliPath": "/custom/path/to/opencode"
}
```

- `opencode-agent.cliPath` — Custom path to the opencode CLI executable (optional)

## License

MIT
