import * as vscode from "vscode"
import { createTerminalWithArgs } from "../services/terminal"

export function registerContinueCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("opencode-agent.continue", async () => {
    const port = Math.floor(Math.random() * 50000) + 10000
    createTerminalWithArgs(context, ['--continue', '--port', String(port)], port)
  })
}