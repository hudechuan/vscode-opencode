import * as vscode from "vscode"

export function registerStartCommand(): vscode.Disposable {
    return vscode.commands.registerCommand("opencode-agent.start", async () => {
        const picks = [
            { label: vscode.l10n.t("Create New OpenCode Session"), command: "opencode-agent.create" },
            { label: vscode.l10n.t("Continue Last OpenCode Session"), command: "opencode-agent.continue" },
            { label: vscode.l10n.t("Attach to Remote OpenCode Session"), command: "opencode-agent.attach" }
        ]
        const selected = await vscode.window.showQuickPick(picks, {
            placeHolder: vscode.l10n.t("Choose OpenCode Startup Type"),
        })
        if (selected?.command) {
            vscode.commands.executeCommand(selected.command)
        }
    })
}