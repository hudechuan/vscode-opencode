import * as vscode from "vscode"
import { createTerminal } from "../services/terminal"

export function registerCreateCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("opencode-agent.create", async () => {
    createTerminal(context)
  })
}