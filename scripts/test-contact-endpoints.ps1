$body = '{"nome":"T","telefone":"86988887777","origem":"site:hero","website":""}'
$urls = @(
  'https://execute-imoveis-site-imf2rkkcc.vercel.app/api/contact',
  'https://execute-imoveis-site-n7riu972p.vercel.app/api/contact',
  'https://executeimoveis.com.br/api/contact'
)
foreach ($url in $urls) {
  Write-Host "=== $url ==="
  try {
    $resp = Invoke-WebRequest -Uri $url -Method POST -ContentType 'application/json' -Body $body -UseBasicParsing
    Write-Host "STATUS $($resp.StatusCode)"
    $text = $resp.Content
    if ($text.Length -gt 200) { $text = $text.Substring(0, 200) + '...' }
    Write-Host $text
  } catch {
    $code = $_.Exception.Response.StatusCode.value__
    Write-Host "STATUS $code"
    if ($_.ErrorDetails.Message) {
      $m = $_.ErrorDetails.Message
      if ($m.Length -gt 200) { $m = $m.Substring(0, 200) + '...' }
      Write-Host $m
    }
  }
}
