// Teste do endpoint de submissao
// Para executar: node test-submit-clean.js

const http = require('http');

const data = JSON.stringify({
    nome: "Teste Shirley",
    email: "teste@teste.com",
    whatsapp: "51999999999",
    cpf: "12345678900",
    profissao: "Professora",
    cidade: "Porto Alegre",
    motivacao: "Testando o robo do formulario"
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/submit',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Resposta:', body);
        if (res.statusCode === 200) {
            console.log('Robo funcionando! Formulario enviado com sucesso.');
        } else {
            console.log('Robo retornou erro.');
        }
    });
});

req.on('error', (e) => {
    console.error('ERRO - O servidor Next.js esta rodando? Execute: npm run dev');
    console.error('Detalhe:', e.message);
});

req.write(data);
req.end();
