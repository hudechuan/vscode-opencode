import * as vscode from "vscode"
import { registerCommands } from "./commands"

export function deactivate() {}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  registerCommands(context)
}