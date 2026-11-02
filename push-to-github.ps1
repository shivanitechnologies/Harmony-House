# Harmony-House - Push to GitHub Repository
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  Harmony-House - Push to GitHub Repository" -ForegroundColor Cyan
Write-Host "  Remote: https://github.com/shivanitechnologies/Harmony-House.git" -ForegroundColor Gray
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Initializing git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[1/5] Existing git repository detected." -ForegroundColor Green
}

Write-Host "[2/5] Staging all files..." -ForegroundColor Yellow
git add .

Write-Host "[3/5] Creating commit..." -ForegroundColor Yellow
git commit -m "Initial commit - Complete Harmony House Music Academy platform"

Write-Host "[4/5] Setting branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host "[5/5] Configuring remote origin..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/shivanitechnologies/Harmony-House.git

Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[!] If the push was rejected because the remote contains existing commits, run:" -ForegroundColor Red
    Write-Host "git push -u origin main --force" -ForegroundColor White
} else {
    Write-Host "`n[SUCCESS] Repository published to https://github.com/shivanitechnologies/Harmony-House" -ForegroundColor Green
}

