// Script para atualizar o numero do WhatsApp no arquivo route.ts
// Execute com: node atualizar-whatsapp.js

const fs = require('fs');

// ============================================
// ALTERE AQUI O NUMERO DO WHATSAPP (com codigo do pais, sem +):
// Exemplo: "555199128542" para (51) 99128-8542
// ============================================
const NOVO_NUMERO = "555199128542";

const filePath = 'app/api/submit/route.ts';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err.message);
        process.exit(1);
    }

    // Procura pelo padrao phone=... dentro do payload da CallMeBot
    const regex = /phone=55\d{10,13}/g;
    const match = data.match(regex);

    if (match) {
        console.log('Numero atual encontrado:', match[0].replace('phone=', ''));

        const novoMatch = `phone=${NOVO_NUMERO}`;
        const newData = data.replace(regex, novoMatch);

        fs.writeFile(filePath, newData, 'utf8', (err2) => {
            if (err2) {
                console.error('Erro ao escrever o arquivo:', err2.message);
                process.exit(1);
            }
            console.log('Numero atualizado para:', NOVO_NUMERO);
            console.log('Arquivo atualizado com sucesso!');
        });
    } else {
        console.log('Nenhum numero de telefone encontrado no padrao phone=55...');
        console.log('Conteudo do arquivo:');
        console.log(data);
    }
});
