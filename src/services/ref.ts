import * as vscode from "vscode"


export function getRef(uri?: vscode.Uri): string | undefined {
  const activeEditor = vscode.window.activeTextEditor
  if (activeEditor) {
    const fileRef = getFileRef(activeEditor.document.uri)
    const selection = activeEditor.selection
    if (!selection.isEmpty) {
      const startLine = selection.start.line + 1
      const endLine = selection.end.line + 1
      return startLine === endLine ? `${fileRef}#L${startLine}` : `${fileRef}#L${startLine}-${endLine}`
    }
    return fileRef
  }
  return uri ? getFileRef(uri) : undefined
}

export function getFileRef(uri: vscode.Uri): string | undefined {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
  if (!workspaceFolder) {
    return
  }
  return `@${vscode.workspace.asRelativePath(uri)}`
}