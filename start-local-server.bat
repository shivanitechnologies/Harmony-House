@echo off
title Harmony House Music Academy - Local Server
cd /d "%~dp0"
echo ========================================================
echo   Harmony House Music Academy - Local Web Server
echo ========================================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting local web server with Python...
    python "%~dp0server.py"
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting local web server with Python (py)...
    py "%~dp0server.py"
    goto end
)

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting local web server with Node.js...
    node "%~dp0server.js"
    goto end
)

echo Neither Python nor Node.js was found in PATH.
echo Opening directly in default browser...
start "" "%~dp0index.html"

:end
pause

