# Script de test de connexion Supabase
Write-Host "🔍 Test de connexion à Supabase..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Connection directe (port 5432)
Write-Host "Test 1: Connection directe (port 5432)" -ForegroundColor Yellow
$directUrl = "postgresql://postgres:Noamdj20051414%40@db.fapfeqinsxlamoolavnc.supabase.co:5432/postgres"
Write-Host "URL: $directUrl" -ForegroundColor Gray
Write-Host ""

# Test 2: Connection pooler (port 6543)
Write-Host "Test 2: Connection pooler (port 6543) - RECOMMANDÉ" -ForegroundColor Yellow
$poolerUrl = "postgresql://postgres.otuybbxfzjeuxppfihvv:Noamdj20051414%40@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
Write-Host "URL: $poolerUrl" -ForegroundColor Gray
Write-Host ""

Write-Host "⚠️  Si la connexion échoue, vérifiez:" -ForegroundColor Red
Write-Host "1. Settings > Database > Connection pooling est activé" -ForegroundColor White
Write-Host "2. Votre IP n'est pas bloquée par Supabase" -ForegroundColor White
Write-Host "3. Le projet Supabase est actif" -ForegroundColor White
Write-Host ""

Write-Host "💡 Essayez avec le connection pooler:" -ForegroundColor Green
Write-Host "pnpm prisma db push --skip-generate" -ForegroundColor Cyan

