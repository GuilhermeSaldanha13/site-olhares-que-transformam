const fs = require("fs");
const path = "C:/Users/guisa/OneDrive/Desktop/Mana_site/app/api/submit/route.ts";
const content = `import { NextResponse } from "next/server"

export const runtime = "nodejs"

function buildSubmissionPayload(data: Record<string, unknown>) {
    const nome = (data.nome || data.name || "").toString()
    const email = (data.email || "").toString()
    const whatsapp = (data.whatsapp || data.phone || "").toString()
    const cpf = (data.cpf || "").toString()
    const profissao = (data.profissao || "").toString()
    const cidade = (data.cidade || "").toString()
    const motivacao = (data.motivacao || data.message || "").toString()

    return {
        nome,
        email,
        whatsapp,
        cpf,
        profissao,
        cidade,
        motivacao,
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const payload = buildSubmissionPayload(data)
        const nome = payload.nome
        const email = payload.email

        if (!nome || !email) {
            return NextResponse.json({ error: "nome and email are required" }, { status: 400 })
        }

        // Enviar notificação via CallMeBot (fire-and-forget, não bloqueia resposta)
        const callmebotApikey = "7777129"
        const callmebotPhone = "353832041114"
        const callmebotMessage = [
            "🆕 Nova inscricao - Olhares que Transformam",
            "Nome: " + nome,
            "E-mail: " + email,
            "WhatsApp: " + (payload.whatsapp || "(nao informado)"),
            "CPF: " + (payload.cpf || "(nao informado)"),
            "Profissao: " + (payload.profissao || "(nao informada)"),
            "Cidade: " + (payload.cidade || "(nao informada)"),
            "Motivacao: " + (payload.motivacao || "(nao informada)"),
        ].join("\\n")

        const callmebotUrl = "https://api.callmebot.com/whatsapp.php?phone=" +
            encodeURIComponent(callmebotPhone) +
            "&text=" + encodeURIComponent(callmebotMessage) +
            "&apikey=" + encodeURIComponent(callmebotApikey)

        fetch(callmebotUrl, {
            method: "GET",
        }).catch((err) => {
            console.error("CallMeBot notification failed:", err)
        })

        return NextResponse.json({ ok: true })
    } catch (err: any) {
        console.error("submit error", err)
        const msg = err?.message || String(err)
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}
`;

fs.writeFileSync(path, content, "utf8");
console.log("OK");
