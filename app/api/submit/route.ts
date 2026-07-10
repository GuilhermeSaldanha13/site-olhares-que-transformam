import { NextResponse } from "next/server"
import { google } from "googleapis"

export const runtime = "nodejs"

// Spreadsheet ID (default to the one provided by the user)
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "1FdT0BsJ37IVQkdaWagCC9Qs2Z3I-ADw4u-7gmbvnk08"

function buildSubmissionPayload(data: Record<string, unknown>) {
    const nome = (data.nome || data.name || "").toString()
    const email = (data.email || "").toString()
    const whatsapp = (data.whatsapp || data.phone || "").toString()
    const cpf = (data.cpf || "").toString()
    const profissao = (data.profissao || "").toString()
    const cidade = (data.cidade || "").toString()
    const motivacao = (data.motivacao || data.message || "").toString()
    const indicacao = (data.indicacao || "").toString()

    return {
        nome,
        email,
        whatsapp,
        cpf,
        profissao,
        cidade,
        motivacao,
        indicacao,
        name: nome,
        phone: whatsapp,
        message: motivacao,
    }
}

function parseServiceAccountJson(raw?: string) {
    if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON environment variable")

    let jsonStr = raw.trim()

    // If it looks like base64, try to decode
    const isBase64 = /^[A-Za-z0-9+/=\n\r]+$/.test(jsonStr) && !jsonStr.startsWith("{")
    if (isBase64) {
        try {
            jsonStr = Buffer.from(jsonStr, "base64").toString("utf8")
        } catch (e) {
            // fallthrough to try parsing as-is
        }
    }

    // Some CI/users store JSON with escaped newlines; convert them back
    try {
        const parsed = JSON.parse(jsonStr)
        if (parsed.private_key && typeof parsed.private_key === "string") {
            parsed.private_key = parsed.private_key.replace(/\\n/g, "\n")
        }
        return parsed
    } catch (e) {
        throw new Error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON: " + (e as Error).message)
    }
}

async function getSheetsClient() {
    const keyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    const key = parseServiceAccountJson(keyRaw)

    const auth = new google.auth.JWT({
        email: key.client_email,
        key: key.private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    await auth.authorize()
    return google.sheets({ version: "v4", auth })
}

async function forwardToAppsScript(payload: Record<string, unknown>) {
    const submitUrl = process.env.GOOGLE_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_SUBMIT_URL
    if (!submitUrl) {
        throw new Error("No Google Sheets destination configured. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_APPS_SCRIPT_URL/NEXT_PUBLIC_SUBMIT_URL.")
    }

    const response = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    const text = await response.text()
    let parsed: any = null
    try {
        parsed = JSON.parse(text)
    } catch {
        parsed = null
    }

    if (!response.ok) {
        const detail = parsed?.error || text || response.statusText
        throw new Error(detail || `Google Apps Script request failed with status ${response.status}`)
    }

    return parsed || { ok: true }
}

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const payload = buildSubmissionPayload(data)
        const nome = payload.nome.toString()
        const email = payload.email.toString()

        if (!nome || !email) {
            return NextResponse.json({ error: "nome and email are required" }, { status: 400 })
        }

        let sheets
        try {
            sheets = await getSheetsClient()
        } catch (e: any) {
            const msg = e?.message || String(e)
            console.warn("Google Sheets API unavailable, falling back to Apps Script", msg)
            const fallbackResult = await forwardToAppsScript(payload)
            return NextResponse.json({ ok: true, via: "apps-script", ...fallbackResult })
        }

        // Order: Data, Nome, E-mail, WhatsApp, CPF, Profissão, Cidade, Motivação, Como conheceu
        const values = [[new Date().toISOString(), nome, email, payload.whatsapp, payload.cpf, payload.profissao, payload.cidade, payload.motivacao, payload.indicacao]]

        // Check for duplicate by email (column C). Skip header row (start at C2).
        try {
            const existingRes = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: "Sheet1!C2:C",
            })
            const existingValues: string[] = (existingRes.data.values || []).flat().map((v: any) => (v || "").toString().trim().toLowerCase())
            if (email && existingValues.includes(email.trim().toLowerCase())) {
                return NextResponse.json({ error: "email already registered" }, { status: 409 })
            }
        } catch (e) {
            // ignore read errors and proceed to append
            console.warn("Could not read existing emails for duplicate check", e)
        }

        // Append to sheet columns A:I
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet1!A:I",
            valueInputOption: "RAW",
            requestBody: { values },
        })

        return NextResponse.json({ ok: true })
    } catch (err: any) {
        console.error("submit error", err)
        const msg = err?.message || String(err)
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}
