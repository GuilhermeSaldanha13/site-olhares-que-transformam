// TESTE DIRETO DA CALLMEBOT
// Para rodar: node testar-whatsapp-direto.js
// 
// IMPORTANTE: Antes de testar, mande "I authorize callmebot"
// para +55 11 99999-2747 no WhatsApp (isso ativa o serviço)

const https = require("https")

const PHONE = "555199128542"
const APIKEY = "5699567"

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = ""
            res.on("data", (chunk) => (data += chunk))
            res.on("end", () => resolve({ status: res.statusCode, body: data }))
        }).on("error", (err) => reject(err))
    })
}

async function testar() {
    console.log("========================================")
    console.log("  TESTE DIRETO DA CALLMEBOT API")
    console.log("========================================")
    console.log("")
    console.log("Telefone admin:", PHONE)
    console.log("API Key:", APIKEY)
    console.log("")

    const msg = encodeURIComponent("Teste automatico Olhares que Transformam - " + new Date().toLocaleString("pt-BR"))
    const url = `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${msg}&apikey=${APIKEY}`

    console.log("URL completa:", url)
    console.log("")
    console.log("Enviando requisicao...")
    console.log("")

    try {
        const res = await fetchUrl(url)

        console.log("Status HTTP:", res.status)
        console.log("Resposta bruta:", res.body)
        console.log("")

        if (res.status === 200) {
            if (res.body.includes("Message queued")) {
                console.log("✅ SUCESSO! CallMeBot funcionando!")
                console.log("   Mensagem enviada para seu WhatsApp!")
                console.log("   Verifique se chegou no seu celular!")
            } else {
                console.log("⚠️  Resposta inesperada (status 200):", res.body)
            }
        } else {
            console.log("❌ ERRO!")
            console.log("")
            if (res.body.includes("API key") || res.body.includes("apikey")) {
                console.log("   Causa: Chave API invalida")
                console.log("   Solucao: Verifique sua chave em https://www.callmebot.com/blog/free-api-whatsapp-messages/")
            } else if (res.body.includes("authorize") || res.body.includes("not authorized")) {
                console.log("   Causa: Servico nao ativado!")
                console.log("   Solucao: Mande 'I authorize callmebot' para +55 11 99999-2747 no WhatsApp")
                console.log("   Depois aguarde 1 minuto e tente novamente")
            } else if (res.body.includes("phone") || res.body.includes("number")) {
                console.log("   Causa: Numero de telefone invalido")
                console.log("   Formato esperado: 55[DDD][numero] (ex: 555199128542)")
            } else {
                console.log("   Resposta do servidor:", res.body)
            }
        }
    } catch (err) {
        console.error("❌ ERRO DE CONEXAO:", err.message)
        console.log("   Verifique sua internet ou firewall")
    }

    console.log("")
    console.log("========================================")
    console.log("INSTRUCOES:")
    console.log("1) Salve +55 11 99999-2747 no seu WhatsApp")
    console.log("2) Envie: I authorize callmebot")
    console.log("3) Aguarde a confirmacao")
    console.log("4) Rode este teste novamente")
    console.log("========================================")
}

testar()
