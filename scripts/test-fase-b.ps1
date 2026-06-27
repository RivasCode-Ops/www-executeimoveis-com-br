param(
  [string]$Secret = $env:CRM_LEADS_WEBHOOK_SECRET
)

if (-not $Secret) {
  Write-Error "Defina CRM_LEADS_WEBHOOK_SECRET ou passe -Secret"
  exit 1
}

$crmBody = @{
  nome     = 'Teste Site'
  telefone = '86994633075'
  servico  = 'Usucapião Judicial'
  origem   = 'site:hero'
} | ConvertTo-Json -Compress

Write-Host "=== CRM /api/publico/leads ==="
$crmHeaders = @{
  Authorization  = "Bearer $Secret"
  'Content-Type' = 'application/json'
}
try {
  $crm = Invoke-RestMethod -Uri 'https://crm-execute.vercel.app/api/publico/leads' -Method POST -Headers $crmHeaders -Body $crmBody
  $crm | ConvertTo-Json -Compress
} catch {
  Write-Host "CRM ERROR: $($_.Exception.Message)"
  if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message }
}

$siteBody = @{
  nome      = 'Teste Integracao'
  telefone  = '86999998888'
  email     = 'teste@example.com'
  servico   = 'Usucapião Judicial'
  mensagem  = 'Teste Fase B automatizado'
  origem    = 'site:hero'
  website   = ''
} | ConvertTo-Json -Compress

Write-Host "`n=== Site /api/contact ==="
try {
  $site = Invoke-RestMethod -Uri 'https://www.executeimoveis.com.br/api/contact' -Method POST -ContentType 'application/json' -Body $siteBody
  $site | ConvertTo-Json -Compress
} catch {
  Write-Host "SITE ERROR: $($_.Exception.Message)"
  if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message }
}
