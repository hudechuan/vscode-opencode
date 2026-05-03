import * as vscode from "vscode"
import { appendTuiPrompt, resolveOpenCodeBinary, showTuiToast, TUIEndpoint } from "./opencode"

const TERMINAL_TITLE: string = 'OpenCode'
const terminals: Map<string, vscode.Terminal> = new Map()

export function initTerminalManager(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.window.onDidCloseTerminal((t) => terminals.delete(t.name)),
    vscode.window.onDidOpenTerminal((t) => t.name.startsWith(TERMINAL_TITLE) ? terminals.set(t.name, t) : null)
  )
}

export function createTerminal(context: vscode.ExtensionContext): vscode.Terminal {
  const port = Math.floor(Math.random() * 50000) + 10000
  const viewColumn = findOpenCodeColumn() ?? findUnusedColumn() ?? vscode.ViewColumn.Beside
  const options: vscode.TerminalOptions = {
    name: `${TERMINAL_TITLE}[${port}]`,
    shellPath: resolveOpenCodeBinary(),
    shellArgs: ['--port', String(port)],
    location: { viewColumn },
    isTransient: true,
    cwd: vscode.workspace.workspaceFolders?.[0]?.uri.fsPath,
    env: {
      OPENCODE_CALLER: "vscode",
      OPENCODE_EXTENSION_PROTOCOL: 'http:',
      OPENCODE_EXTENSION_HOSTNAME: 'localhost',
      OPENCODE_EXTENSION_PORT: String(port),
    },
    iconPath: {
      light: vscode.Uri.file(context.asAbsolutePath("resources/logo-light.svg")),
      dark: vscode.Uri.file(context.asAbsolutePath("resources/logo-dark.svg")),
    }
  }
  const terminal = vscode.window.createTerminal(options)
  void vscode.commands.executeCommand("workbench.action.lockEditorGroup");
  return terminal
}


export function attachTerminal(context: vscode.ExtensionContext, remoteUrl: URL): vscode.Terminal {
  const cwd = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
  const viewColumn = findOpenCodeColumn() ?? findUnusedColumn() ?? vscode.ViewColumn.Beside
  let remotePwd: string = ''
  if (remoteUrl.searchParams) {
    remotePwd = remoteUrl.searchParams.get("pwd") ?? ''
  }
  const options: vscode.TerminalOptions = {
    name: `${TERMINAL_TITLE}[${remoteUrl.host}]`,
    shellPath: resolveOpenCodeBinary(),
    shellArgs: ['attach', `${remoteUrl.protocol}//${remoteUrl.hostname}:${remoteUrl.port}`, '--dir', cwd!],
    location: { viewColumn },
    isTransient: true,
    cwd: cwd,
    env: {
      OPENCODE_CALLER: "vscode",
      OPENCODE_EXTENSION_PROTOCOL: remoteUrl.protocol,
      OPENCODE_EXTENSION_HOSTNAME: remoteUrl.hostname,
      OPENCODE_EXTENSION_PORT: String(remoteUrl.port),
      OPENCODE_SERVER_PASSWORD: String(remotePwd)
    },
    iconPath: {
      light: vscode.Uri.file(context.asAbsolutePath("resources/logo-light.svg")),
      dark: vscode.Uri.file(context.asAbsolutePath("resources/logo-dark.svg")),
    }
  }
  const terminal = vscode.window.createTerminal(options)
  // terminal.sendText(`opencode attach ${remoteUrl.protocol}//${remoteUrl.hostname}:${remoteUrl.port} --dir ${cwd}`)
  void vscode.commands.executeCommand("workbench.action.lockEditorGroup");
  return terminal
}


function findOpenCodeColumn(): vscode.ViewColumn | undefined {
  for (const group of vscode.window.tabGroups.all) {
    for (const tab of group.tabs) {
      if (tab.input instanceof vscode.TabInputTerminal && tab.label.startsWith(TERMINAL_TITLE)) {
        return group.viewColumn
      }
    }
  }
  return undefined
}

function findUnusedColumn(): vscode.ViewColumn | undefined {
  const used = new Set<vscode.ViewColumn>()
  for (const group of vscode.window.tabGroups.all) {
    if (group.viewColumn !== undefined) used.add(group.viewColumn)
  }
  for (let column = vscode.ViewColumn.One; column <= vscode.ViewColumn.Nine; column++) {
    if (!used.has(column)) return column
  }
  return undefined
}

export function getTerminals(): Map<string, vscode.Terminal> {
  return terminals
}

function getTerminal(terminalName?: string): vscode.Terminal | undefined {
  if (!terminalName) return
  return terminals.get(terminalName)
}

function getTerminalEndpoint(terminal: vscode.Terminal): TUIEndpoint {
  return {
    // @ts-ignore
    protocol: terminal.creationOptions.env?.["OPENCODE_EXTENSION_PROTOCOL"],
    // @ts-ignore
    hostname: terminal.creationOptions.env?.["OPENCODE_EXTENSION_HOSTNAME"],
    // @ts-ignore
    port: terminal.creationOptions.env?.["OPENCODE_EXTENSION_PORT"],
    // @ts-ignore
    password: terminal.creationOptions.env?.["OPENCODE_SERVER_PASSWORD"],
  }
}

export async function appendPrompt(text?: string, terminalName?: string): Promise<void> {
  if (!terminalName || !text) return
  const target = getTerminal(terminalName)
  if (target) {
    const endpoint = getTerminalEndpoint(target);
    await appendTuiPrompt(endpoint, { text }).then(() => {
      showTuiToast(endpoint, { title: 'VSCode Extension', message: 'Apppend prompt successful', variant: 'info' })
      target.show()
    })
  }
}

export async function showToast(title: string, message: string, variant: "info" | "success" | "warning" | "error", terminalName?: string): Promise<void> {
  const target = getTerminal(terminalName)
  if (target) {
    const endpoint = getTerminalEndpoint(target);
    await showTuiToast(endpoint, { title, message, variant })
    target.show()
  }
}