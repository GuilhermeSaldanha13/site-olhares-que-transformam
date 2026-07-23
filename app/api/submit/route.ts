import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json()
        console.log("Dados recebidos:", JSON.stringify(data).slice(0, 300))

        const adminPhone = "555199128542"
        const apikey = process.env.CALLMEBOT_APIKEY || "5699567"

        // Mensagem em formato mais simples (sem quebras de linha complexas)
        const nome = data.nome || data.name || "(nao informado)"
        const whatsapp = data.whatsapp || "(nao informado)"
        const email = data.email || "(nao informado)"
        const cpf = data.cpf || "(nao informado)"
        const profissao = data.profissao || "(nao informado)"
        const cidade = data.cidade || "(nao informado)"
        const motivacao = data.motivacao || "(nao informado)"

        const texto = `Nova inscricao - Nome: ${nome}, WhatsApp: ${whatsapp}, Email: ${email}, CPF: ${cpf}, Profissao: ${profissao}, Cidade: ${cidade}, Motivacao: ${motivacao}`

        console.log("Texto para WhatsApp:", texto.slice(0, 200))

        // Usa URLSearchParams para construir a URL corretamente
        const params = new URLSearchParams()
        params.append("phone", adminPhone)
        params.append("text", texto)
        params.append("apikey", apikey)

        const callmebotUrl = `https://api.callmebot.com/whatsapp.php?${params.toString()}`

        console.log("Chamando CallMeBot... URL (sem apikey):", callmebotUrl.replace(apikey, "***"))

        // Fire-and-forget: tenta enviar, mas não trava o formulário se falhar
        let callmebotStatus = 0
        let callmebotResposta = "nao chamado"
        try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

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

        // Retorna sucesso independente do WhatsApp
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
