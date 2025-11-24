# Script pour créer le fichier .env.local
$content = @"
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/shiftpilot?schema=public

# NextAuth
NEXTAUTH_SECRET=change-this-to-a-random-secret-min-32-chars-in-production
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
"@

$content | Out-File -FilePath .env.local -Encoding utf8 -NoNewline
Write-Host "Fichier .env.local créé avec succès!" -ForegroundColor Green
Write-Host "N'oubliez pas de modifier DATABASE_URL avec vos vraies informations PostgreSQL" -ForegroundColor Yellow

