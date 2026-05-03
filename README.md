# OpenCode Agent

A VS Code extension that integrates [OpenCode](https://opencode.ai) terminal into your editor, enabling seamless AI-assisted development workflows.

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-v0.0.3-blue)](https://marketplace.visualstudio.com/items?itemName=wenzewoo.opencode-agent)
[![License MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Features

### Terminal Integration
- **Create OpenCode Terminal** — Launch the OpenCode terminal directly from VS Code with intelligent tab placement
- **Multiple Terminals** — Support for multiple concurrent OpenCode terminals with easy switching
- **Smart Tab Placement** — Automatically finds existing OpenCode tabs or opens in a new column

### File & Selection Management
- **Add File to Session** — Send files to OpenCode session
- **Add Selection to Session** — Send selected code/text to OpenCode
- **Review Selection** — Review selected code in OpenCode session

### Session Management
- **Create New Session** — Start a fresh OpenCode session
- **Continue Last Session** — Resume previous session
- **Attach to Remote** — Connect to remote OpenCode session

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
| `OpenCode Agent: Start` | Start OpenCode |
| `OpenCode Agent: Create` | Create new OpenCode session |
| `OpenCode Agent: Continue` | Continue last session |
| `OpenCode Agent: Attach` | Attach to remote session |
| `OpenCode Agent: Append File` | Add file to session |
| `OpenCode Agent: Append Selection` | Add selection to session |
| `OpenCode Agent: Review Selection` | Review selection in session |

### Context Menus

Right-click on files in Explorer or editor to access:
- **Add File to OpenCode Session** — Send file to session
- **Add Selection to OpenCode Session** — Send selected code to session
- **Review Selection** — Review selected code in session

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
