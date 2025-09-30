# test-api.ps1
# PowerShell script to test the Tourism Rates API

$baseUrl = "http://localhost:3000"

Write-Host "=== 🟢 Health Check ==="
Invoke-RestMethod "$baseUrl/healthz"

Write-Host "`n=== 🟢 Create Supplier ==="
$supplier = Invoke-RestMethod "$baseUrl/suppliers" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"name":"TourismCo","country":"Australia"}'
$supplier
$supplierId = $supplier.data.id

Write-Host "`n=== 🟢 Get All Suppliers ==="
Invoke-RestMethod "$baseUrl/suppliers"

Write-Host "`n=== 🟢 Get Supplier By ID ==="
Invoke-RestMethod "$baseUrl/suppliers/$supplierId"

Write-Host "`n=== 🟢 Update Supplier ==="
Invoke-RestMethod "$baseUrl/suppliers/$supplierId" `
  -Method PUT `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"name":"TourismCo Updated","country":"New Zealand"}'

Write-Host "`n=== 🟢 Create Rate ==="
$rate = Invoke-RestMethod "$baseUrl/rates" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body "{""supplierId"":""$supplierId"",""description"":""Hotel room per night"",""price"":150,""currency"":""AUD""}"
$rate
$rateId = $rate.data.id

Write-Host "`n=== 🟢 Get All Rates ==="
Invoke-RestMethod "$baseUrl/rates"

Write-Host "`n=== 🟢 Update Rate ==="
Invoke-RestMethod "$baseUrl/rates/$rateId" `
  -Method PUT `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"description":"Hotel room per night (Deluxe)","price":200,"currency":"AUD"}'

Write-Host "`n=== 🟢 Delete Rate ==="
Invoke-RestMethod "$baseUrl/rates/$rateId" -Method DELETE

Write-Host "`n=== 🟢 Delete Supplier ==="
Invoke-RestMethod "$baseUrl/suppliers/$supplierId" -Method DELETE
