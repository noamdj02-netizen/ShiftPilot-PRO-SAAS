# Script pour corriger les imports incorrects
# Remplace ../../../components/components/ par @/components/

Write-Host "Correction des imports incorrects..." -ForegroundColor Cyan

# Trouver tous les fichiers .tsx et .ts dans app/
$files = Get-ChildItem -Path app -Recurse -Include *.tsx,*.ts -File

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Remplacer les imports incorrects
    $content = $content -replace '\.\.\/\.\.\/\.\.\/components\/components\/', '@/components/'
    $content = $content -replace '\.\.\/\.\.\/components\/components\/', '@/components/'
    $content = $content -replace '\.\.\/components\/components\/', '@/components/'
    # Corriger les imports stores et lib
    $content = $content -replace '\.\.\/\.\.\/\.\.\/components\/stores\/', '@/stores/'
    $content = $content -replace '\.\.\/\.\.\/\.\.\/components\/lib\/', '@/lib/'
    $content = $content -replace '\.\.\/\.\.\/stores\/', '@/stores/'
    $content = $content -replace '\.\.\/\.\.\/lib\/', '@/lib/'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  Corrige: $($file.FullName)" -ForegroundColor Green
        $count++
    }
}

Write-Host "`n$count fichiers corriges!" -ForegroundColor Green

