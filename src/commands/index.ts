import type * as vscode from "vscode"
import { initTerminalManager } from "../services/terminal"
import { registerCreateCommand } from "./create"
import { registerAppendPathCommand } from "./append-path"
import { registerAttachCommand } from "./attach"
import { registerContinueCommand } from "./continue"

export function registerCommands(context: vscode.ExtensionContext): void {
  initTerminalManager(context)
  context.subscriptions.push(
    registerCreateCommand(context),
    registerAppendPathCommand(context),
    registerAttachCommand(context),
    registerContinueCommand(context),
  )
}

export { registerCreateCommand }
export { registerAppendPathCommand }
export { registerAttachCommand }
export { registerContinueCommand }