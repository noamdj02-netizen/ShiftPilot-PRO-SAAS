# Test de connexion à Supabase
$password = "Noamdj20051414@"
$encodedPassword = [System.Web.HttpUtility]::UrlEncode($password)
$connectionString = "postgresql://postgres:$encodedPassword@db.fapfeqinsxlamoolavnc.supabase.co:5432/postgres"

Write-Host "Connection string encodée:" -ForegroundColor Cyan
Write-Host $connectionString
Write-Host ""

# Mettre à jour .env.local
$envContent = @"
# Database - Supabase PostgreSQL
DATABASE_URL=$connectionString

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://otuybbxfzjeuxppfihvv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY

# NextAuth
NEXTAUTH_SECRET=change-this-to-a-random-secret-min-32-chars-in-production
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
"@

$envContent | Out-File -FilePath .env.local -Encoding utf8
Write-Host "✅ .env.local mis à jour avec mot de passe encodé!" -ForegroundColor Green

