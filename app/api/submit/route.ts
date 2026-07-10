import { NextResponse } from "next/server"
import { google } from "googleapis"

export const runtime = "nodejs"

// Spreadsheet ID (default to the one provided by the user)
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "1FdT0BsJ37IVQkdaWagCC9Qs2Z3I-ADw4u-7gmbvnk08"

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

export async function POST(req: Request) {
    try {
        const data = await req.json()
        // Accept both English and Portuguese keys
        const nome = (data.nome || data.name || "").toString()
        const email = (data.email || "").toString()
        const whatsapp = (data.whatsapp || data.phone || "").toString()
        const cpf = (data.cpf || "").toString()
        const profissao = (data.profissao || "").toString()
        const cidade = (data.cidade || "").toString()
        const motivacao = (data.motivacao || data.message || "").toString()
        const indicacao = (data.indicacao || "").toString()

        if (!nome || !email) {
            return NextResponse.json({ error: "nome and email are required" }, { status: 400 })
        }

        let sheets
        try {
            sheets = await getSheetsClient()
        } catch (e: any) {
            const msg = e?.message || String(e)
            if (msg.includes('Missing GOOGLE_SERVICE_ACCOUNT_JSON')) {
                return NextResponse.json({
                    error:
                        'GOOGLE_SERVICE_ACCOUNT_JSON is not set. Either set GOOGLE_SERVICE_ACCOUNT_JSON to use server-side Sheets access, or deploy a Google Apps Script Web App and set NEXT_PUBLIC_SUBMIT_URL in your .env to point the client directly to it.'
                }, { status: 400 })
            }
            throw e
        }

        // Order: Data, Nome, E-mail, WhatsApp, CPF, Profissão, Cidade, Motivação, Como conheceu
        const values = [[new Date().toISOString(), nome, email, whatsapp, cpf, profissao, cidade, motivacao, indicacao]]

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
            console.warn('Could not read existing emails for duplicate check', e)
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
