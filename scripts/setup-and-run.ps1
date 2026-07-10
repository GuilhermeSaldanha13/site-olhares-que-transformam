<#
Simple helper: cria .env.local com NEXT_PUBLIC_SUBMIT_URL (opcional), instala dependências e inicia o dev server.
Uso: abra PowerShell na pasta do projeto e execute:
  .\scripts\setup-and-run.ps1

Cole a URL do Google Apps Script Web App quando solicitado, ou deixe em branco para usar a rota interna `/api/submit`.
#>

Write-Host "=== Setup e Run — Mana_site ==="

$web = Read-Host "Cole a URL do Google Apps Script Web App (ou ENTER para usar /api/submit)"

$envPath = Join-Path -Path (Get-Location) -ChildPath ".env.local"

$lines = @()
if (![string]::IsNullOrWhiteSpace($web)) {
    $lines += "NEXT_PUBLIC_SUBMIT_URL=$web"
    Write-Host "Escrevendo NEXT_PUBLIC_SUBMIT_URL em .env.local"
} else {
    Write-Host "Nenhuma URL fornecida — o cliente usará /api/submit por padrão."
}

if ($lines.Count -gt 0) {
    $content = $lines -join "`n"
    Set-Content -Path $envPath -Value $content -Encoding UTF8
    Write-Host ".env.local criado/atualizado"
} else {
    if (Test-Path $envPath) {
        Write-Host ".env.local existe — mantendo arquivo atual"
    } else {
        Write-Host "Nenhum .env.local criado."
    }
}

Write-Host "Instalando dependências (npm install)..."
npm install

Write-Host "Iniciando dev server em processo separado (npm run dev)..."
Start-Process -FilePath "npm" -ArgumentList "run","dev"

Start-Sleep -Seconds 2
Write-Host "Abrindo http://localhost:3000 no navegador padrão..."
Start-Process "http://localhost:3000"

Write-Host "Pronto — o servidor está iniciando em outra janela. Verifique o terminal criado pelo npm para logs e erros."
