@echo off
title Teste do Robo WhatsApp
cd /d "c:\Users\guisa\OneDrive\Desktop\Mana_site"

echo ========================================
echo  TESTE DIRETO DO WHATSAPP (CallMeBot)
echo ========================================
echo.
echo 1. Iniciando servidor...
echo.

start "" cmd /c "npm run dev"

echo Aguardando servidor iniciar...
timeout /t 8 /nobreak >nul

echo.
echo 2. Enviando inscricao de teste...
echo.

node -e "
const fetch = require('node-fetch');
fetch('http://localhost:3000/api/submit', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    nome:'Teste Manual', email:'teste@teste.com', whatsapp:'51999999999',
    cpf:'12345678900', profissao:'Professora',
    cidade:'Porto Alegre', motivacao:'Teste do robo'
  })
}).then(r => r.text()).then(console.log).catch(console.error);
"

echo.
echo 3. Pronto! Verifique se a mensagem chegou no WhatsApp.
echo.
pause
</｜｜DSML｜｜parameter>
</｜｜DSML｜｜invoke>
</｜｜DSML｜｜tool_calls>
