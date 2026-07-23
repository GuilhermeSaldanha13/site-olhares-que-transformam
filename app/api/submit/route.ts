import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json()

        const adminPhone = "555199128542"
        const apikey = process.env.CALLMEBOT_APIKEY || "5699567"

        const message = [
            "📋 *Nova inscrição — Olhares que Transformam*",
            "",
            `👤 *Nome:* ${data.nome || data.name || "(não informado)"}`,
            `📧 *E-mail:* ${data.email || "(não informado)"}`,
            `📱 *WhatsApp:* ${data.whatsapp || "(não informado)"}`,
            `🪪 *CPF:* ${data.cpf || "(não informado)"}`,
            `💼 *Profissão:* ${data.profissao || "(não informada)"}`,
            `🏙️ *Cidade:* ${data.cidade || "(não informada)"}`,
            `💬 *Motivação:* ${data.motivacao || "(não informada)"}`,
        ].join("\n")

        // Envia para o WhatsApp em segundo plano
        fetch(`https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${encodeURIComponent(message)}&apikey=${apikey}`)
            .catch((err) => console.error("Erro CallMeBot:", err))

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Erro interno" }, { status: 500 })
    }
}
