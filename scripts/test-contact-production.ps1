$body = '{"nome":"Teste Pos Deploy","telefone":"86977776666","origem":"site:hero","website":""}'
$url = 'https://executeimoveis.com.br/api/contact'
Write-Host "=== $url ==="
try {
  $resp = Invoke-WebRequest -Uri $url -Method POST -ContentType 'application/json' -Body $body -UseBasicParsing
  Write-Host "STATUS $($resp.StatusCode)"
  Write-Host $resp.Content
} catch {
  Write-Host "STATUS $($_.Exception.Response.StatusCode.value__)"
  Write-Host $_.ErrorDetails.Message
}
