import * as vscode from "vscode"
import { attachTerminal, createTerminalWithArgs } from "../services/terminal"
import { listWorkspaceSessions } from "../services/opencode"

export function registerAttachCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("opencode-agent.attach", async () => {
    const input = await vscode.window.showInputBox({
      prompt: vscode.l10n.t("Enter OpenCode server URL"),
      placeHolder: "http://localhost:4096 or http://10.20.30.40:4096?pwd=xxx",
    })

    if (!input?.trim()) {
      return
    }
    let remoteUrl: URL
    try {
      remoteUrl = new URL(input)
    } catch {
      await vscode.window.showErrorMessage("Invalid URL format. Example: http://10.20.30.40:4096")
      return
    }
    if (!["http:", "https:"].includes(remoteUrl.protocol)) {
      await vscode.window.showErrorMessage(vscode.l10n.t("Protocol must be http or https"))
      return
    }
    attachTerminal(context, remoteUrl)
  })
}