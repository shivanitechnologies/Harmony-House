@echo off
setlocal
echo =========================================================
echo   Harmony-House - Push to GitHub Repository
echo   Remote: https://github.com/shivanitechnologies/Harmony-House.git
echo =========================================================
echo.

:: 1. Initialize Git repository if not already initialized
if not exist ".git" (
    echo [1/5] Initializing git repository...
    git init
    if errorlevel 1 (
        echo [ERROR] Git command failed. Please verify Git is installed and in your PATH.
        goto :END
    )
) else (
    echo [1/5] Existing git repository detected.
)

:: 2. Stage all project files (not just README)
echo [2/5] Staging all project files...
git add .

:: 3. Commit files
echo [3/5] Creating commit...
git commit -m "Initial commit - Complete Harmony House Music Academy platform" 2>nul || (
    echo Note: Working tree clean or commit already made.
)

:: 4. Ensure branch is main
echo [4/5] Setting branch to main...
git branch -M main

:: 5. Set up remote origin & push
echo [5/5] Configuring remote origin and pushing to GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/shivanitechnologies/Harmony-House.git

echo.
echo Pushing to main branch on GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo [!] Push failed. If the GitHub repository already contains a README or license:
    echo     Run this command to force push:
    echo     git push -u origin main --force
) else (
    echo.
    echo [SUCCESS] Your repository is live at:
    echo https://github.com/shivanitechnologies/Harmony-House
)

:END
echo.
pause

