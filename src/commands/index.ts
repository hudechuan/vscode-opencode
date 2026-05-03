import type * as vscode from "vscode"
import { initTerminalManager } from "../services/terminal"
import { registerAppendFileCommand } from "./append-file"
import { registerAppendSelectionCommand } from './append-selection'
import { registerAttachCommand } from "./attach"
import { registerContinueCommand } from "./continue"
import { registerCreateCommand } from "./create"
import { registerReviewSelectionCommand } from "./review-selection"
import { registerStartCommand } from "./start"
import { registerChooseCommand } from "./choose"

export function registerCommands(context: vscode.ExtensionContext): void {
  initTerminalManager(context)
  context.subscriptions.push(
    registerStartCommand(),
    registerCreateCommand(context),
    registerAppendFileCommand(),
    registerAppendSelectionCommand(),
    registerAttachCommand(context),
    registerChooseCommand(context),
    registerContinueCommand(context),
    registerReviewSelectionCommand()
  )
}

export { registerStartCommand, registerAppendFileCommand, registerAppendSelectionCommand, registerAttachCommand, registerContinueCommand, registerCreateCommand, registerReviewSelectionCommand, registerChooseCommand as registerChooseSessionCommand }

