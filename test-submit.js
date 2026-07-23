// Teste do endpoint de submissão
// Para executar: node test-submit.js

const http = require('http');

const data = JSON.stringify({
    nome: "Teste Shirley",
    email: "teste@teste.com",
    whatsapp: "51999999999",
    cpf: "12345678900",
    profissao: "Professora",
    cidade: "Porto Alegre",
    motivacao: "Testando o robô do formulário"
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
            console.log('\n✅ Robô funcionando! Formulário enviado com sucesso.');
        } else {
            console.log('\n❌ Robô retornou erro.');
        }
    });
});

req.on('error', (e) => {
    console.error('❌ ERRO - O servidor Next.js está rodando?');
    console.error('Detalhe:', e.message);
    console.error('\nExecute primeiro: npm run dev');
});

req.write(data);
req.end();
</｜｜DSML｜｜parameter >
</create_file >
