import {execSync} from "node:child_process"
import {getCliPath} from "./config"

export interface TUIEndpoint {
    protocol: 'http:' | 'https:'
    hostname: string
    port: string
    password?: string
}

export interface TUIAppendPrompt {
    text: string
}

export interface TUIShowToast {
    title: string
    message: string
    variant: "info" | "success" | "warning" | "error"
}

export async function appendTuiPrompt(endpoint: TUIEndpoint, payload: TUIAppendPrompt): Promise<Response> {
    return fetch(`${endpoint.protocol}//${endpoint.hostname}:${endpoint.port}/tui/append-prompt`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    })
}

export async function showTuiToast(endpoint: TUIEndpoint, payload: TUIShowToast): Promise<Response> {
    return fetch(`${endpoint.protocol}//${endpoint.hostname}:${endpoint.port}/tui/show-toast`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    })
}

export function resolveOpenCodeBinary(): string {
    const configPath = getCliPath()
    if (configPath) return configPath

    const result = which("opencode")
    return result || "opencode"
}

function execCommand(cmd: string): string {
    try {
        return execSync(cmd, {encoding: "utf8", timeout: 5000}).trim()
    } catch {
        return ""
    }
}

const WIN_EXECUTABLE_EXTENSIONS = [".cmd", ".exe", ".ps1"]

function which(name: string): string {
    const isWin = process.platform === "win32"
    const ext = isWin ? WIN_EXECUTABLE_EXTENSIONS : [""]
    for (const e of ext) {
        const result = execCommand(`which ${name}${e}`)
        if (result) return result
        const winResult = execCommand(`where ${name}${e}`)
        if (winResult) return winResult.split(/\r?\n/)[0]
    }
    return ""
}