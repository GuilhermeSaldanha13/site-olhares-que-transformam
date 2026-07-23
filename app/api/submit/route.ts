import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json()
        console.log("Dados recebidos:", JSON.stringify(data).slice(0, 300))
        const adminPhone = "555199128542"
        const apikey = process.env.CALLMEBOT_APIKEY || "5699567"
        const nome = data.nome || data.name || "(não informado)"
        const whatsapp = data.whatsapp || "(não informado)"
        const email = data.email || "(não informado)"
        const cpf = data.cpf || "(não informado)"
        const profissao = data.profissao || "(não informada)"
        const cidade = data.cidade || "(não informada)"
        const motivacao = data.motivacao || "(não informada)"
        const lines = [
            "📋 *Nova inscrição - Olhares que Transformam*",
            "",
            "👤 *Nome:* " + nome,
            "📧 *E-mail:* " + email,
            "📱 *WhatsApp:* " + whatsapp,
            "🪪 *CPF:* " + cpf,
            "💼 *Profissão:* " + profissao,
            "🏙️ *Cidade:* " + cidade,
            "💬 *Motivação:* " + motivacao,
        ]
        const texto = lines.join("\n")
        console.log("Texto para WhatsApp:", texto.slice(0, 200))
        const params = new URLSearchParams()
        params.append("phone", adminPhone)
        params.append("text", texto)
        params.append("apikey", apikey)
        const callmebotUrl = "https://api.callmebot.com/whatsapp.php?" + params.toString()
        console.log("Chamando CallMeBot... URL (sem apikey):", callmebotUrl.replace(apikey, "***"))
        let callmebotStatus = 0
        let callmebotResposta = "nao chamado"
        try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 15000)
            const callmebotRes = await fetch(callmebotUrl, { signal: controller.signal })
            clearTimeout(timeout)
            callmebotStatus = callmebotRes.status
            callmebotResposta = (await callmebotRes.text()).slice(0, 500)
            console.log("CallMeBot Status:", callmebotStatus)
            console.log("CallMeBot Resposta:", callmebotResposta)
        } catch (e: any) {
            console.error("CallMeBot erro (nao critico):", e?.message || String(e))
            callmebotResposta = "erro: " + (e?.message || String(e)).slice(0, 200)
        }
        return NextResponse.json({
            success: true,
            callmebotStatus,
            callmebotResposta,
        })
    } catch (error) {
        console.error("Erro no submit:", error)
        const msg = error instanceof Error ? error.message : String(error)
        return NextResponse.json({ error: "Erro interno", detalhe: msg.slice(0, 500) }, { status: 500 })
    }
}
