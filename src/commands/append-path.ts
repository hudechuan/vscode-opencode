import * as vscode from "vscode"
import { appendPrompt } from "../services/terminal"
import { getRef } from "../services/ref"
import { getTerminals } from "../services/terminal"

export function registerAppendPathCommand(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand("opencode-agent.append-path", async (uri?: vscode.Uri) => {
    const text = getRef(uri)
    const terminals = getTerminals()
    if (terminals.size === 0) {
      return
    }
    if (terminals.size === 1) {
      await appendPrompt(text, [...terminals.keys()][0])
      return
    }
    const picks = [...terminals.keys()].map((name) => ({ label: name }))
    const selected = await vscode.window.showQuickPick(picks, {
      placeHolder: vscode.l10n.t("Select terminal to send path"),
    })
    if (selected) {
      await appendPrompt(text, selected.label)
    }
  })
}