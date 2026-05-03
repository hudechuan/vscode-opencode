import * as vscode from "vscode"
import { getSelectionRef } from "../services/ref"
import { getTerminals, sendPrompt } from "../services/terminal"

export function registerReviewSelectionCommand(): vscode.Disposable {
    return vscode.commands.registerCommand("opencode-agent.review-selection", async (uri?: vscode.Uri) => {
        if (!uri) return

        const text = getSelectionRef(uri)
        const terminals = getTerminals()
        if (terminals.size === 0) {
            vscode.window.showWarningMessage(vscode.l10n.t("No OpenCode Terminal Found"))
            return
        }
        if (terminals.size === 1) {
            await sendPrompt(`/review ${text} `, [...terminals.keys()][0])
            return
        }
        const picks = [...terminals.keys()].map((name) => ({ label: name }))
        const selected = await vscode.window.showQuickPick(picks, {
            placeHolder: vscode.l10n.t("Select OpenCode Terminal"),
        })
        if (selected) {
            await sendPrompt(`/review ${text} `, selected.label)
        }
    })
}