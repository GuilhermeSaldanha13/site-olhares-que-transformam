@echo off
echo ============================================
echo  TESTANDO ROBO DO WHATSAPP - CallMeBot
echo ============================================
echo.
echo 1. Verificando se o servidor Next.js esta rodando...
echo.

powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:3000' -Method GET -UseBasicParsing; if ($r.StatusCode -eq 200) { Write-Host 'Servidor OK!' -ForegroundColor Green } } catch { Write-Host 'Servidor NAO esta rodando!' -ForegroundColor Red; Write-Host 'Execute npm run dev primeiro.'; exit 1 }"

echo.
echo 2. Enviando inscricao de teste...
echo.

node -e "var h=require('http');var d=JSON.stringify({nome:'Teste',email:'teste@teste.com',whatsapp:'51999999999',cpf:'12345678900',profissao:'Professora',cidade:'Porto Alegre',motivacao:'Testando o robo do formulario'});var r=h.request({hostname:'localhost',port:3000,path:'/api/submit',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(d)}},function(res){var b='';res.on('data',function(c){b+=c});res.on('end',function(){console.log('Status:',res.statusCode);console.log('Resposta:',b);if(res.statusCode===200){console.log('');console.log('MENSAGEM ENVIADA PARA O WHATSAPP!');console.log('Verifique seu celular agora.');}else{console.log('ERRO: Status inesperado.')}})});r.on('error',function(e){console.log('');console.log('ERRO DE CONEXAO: O servidor Next.js esta rodando?');console.log('Abra um terminal e execute: npm run dev');});r.write(d);r.end()"

echo.
echo ============================================
pause
