import type * as vscode from "vscode"
import { initTerminalManager } from "../services/terminal"
import { registerCreateCommand } from "./create"
import { registerAppendPathCommand } from "./append-path"
import { registerAttachCommand } from "./attach"

export function registerCommands(context: vscode.ExtensionContext): void {
  initTerminalManager(context)
  context.subscriptions.push(
    registerCreateCommand(context),
    registerAppendPathCommand(context),
    registerAttachCommand(context),
  )
}

export { registerCreateCommand }
export { registerAppendPathCommand }
export { registerAttachCommand }