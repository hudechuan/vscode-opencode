import * as vscode from "vscode"

export function registerStartCommand(): vscode.Disposable {
    return vscode.commands.registerCommand("opencode-agent.start", async () => {
        const picks = [
            { label: "$(add) " + vscode.l10n.t("Create New OpenCode Session"), command: "opencode-agent.create" },
            { label: "$(debug-continue) " + vscode.l10n.t("Continue Last OpenCode Session"), command: "opencode-agent.continue" },
            { label: "$(list-selection) " + vscode.l10n.t("Choose History OpenCode Session"), command: "opencode-agent.choose" },
            { label: "$(remote) " + vscode.l10n.t("Attach to Remote OpenCode Session"), command: "opencode-agent.attach" }
        ]
        const selected = await vscode.window.showQuickPick(picks, {
            placeHolder: vscode.l10n.t("Choose OpenCode Startup Type"),
        })
        if (selected) {
            vscode.commands.executeCommand(selected.command)
        }
    })
}