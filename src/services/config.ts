import * as vscode from "vscode"

const CONFIG_KEY = "opencode-agent"

export function getCliPath(): string | undefined {
  return vscode.workspace.getConfiguration(CONFIG_KEY).get<string>("cliPath")
}