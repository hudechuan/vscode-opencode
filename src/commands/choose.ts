import * as vscode from "vscode"
import { createTerminalWithArgs } from "../services/terminal"
import { listWorkspaceSessions } from "../services/opencode"

export function registerChooseCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("opencode-agent.choose", async () => {

    const workspaceSessions = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: vscode.l10n.t("Loading sessions..."),
      cancellable: false
    }, async () => listWorkspaceSessions())
    if (workspaceSessions.length === 0) {
      vscode.window.showWarningMessage(vscode.l10n.t("No sessions found in current workspace"))
      return
    }
    const sessionPick = workspaceSessions.map(s => ({
      label: s.title,
      description: formatDate(s.updated),
      session: s
    }))
    const selectedSession = await vscode.window.showQuickPick(sessionPick, {
      placeHolder: vscode.l10n.t("Choose History OpenCode Session")
    })
    if (selectedSession) {
      const port = Math.floor(Math.random() * 50000) + 10000
      createTerminalWithArgs(context, ['--session', selectedSession?.session.id, '--port', String(port)], port)
    }
  })
}

function formatDate(ts: number): string {
    return new Date(ts).toLocaleString()
}