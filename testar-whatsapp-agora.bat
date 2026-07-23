@echo off
title TESTE WHATSAPP - CallMeBot
cls
echo ========================================
echo  TESTANDO WHATSAPP - CallMeBot
echo ========================================
echo.
echo Telefone: 555199128542
echo API Key: 5699567
echo.
echo IMPORTANTE:
echo Antes de testar, mande "I authorize callmebot"
echo para +55 11 99999-2747 no WhatsApp
echo.
echo ========================================
echo.
node "c:\Users\guisa\OneDrive\Desktop\Mana_site\testar-whatsapp-direto.js"
echo.
echo ========================================
if %errorlevel% equ 0 (
    echo Resultado acima
) else (
    echo ERRO ao executar o teste
)
echo.
pause
