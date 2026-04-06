@echo off
chcp 65001 >nul
cd /d "C:\Users\Luis\Downloads\CLAUDE\prc"

echo.
echo ══════════════════════════════════════
echo   PRC Data ^& Intelligence - Deploy
echo ══════════════════════════════════════
echo.

git add .

git status --short
echo.

set /p MSG="Mensaje de commit (ENTER para auto): "

if "%MSG%"=="" (
    for /f "tokens=1-5 delims=/:. " %%a in ("%date% %time%") do set MSG=update %%a-%%b-%%c %%d:%%e
)

git commit -m "%MSG%"

if %errorlevel% neq 0 (
    echo.
    echo No hay cambios que subir.
    pause
    exit /b
)

git push origin main

echo.
echo ══════════════════════════════════════
echo   Deploy completado
echo ══════════════════════════════════════
echo.
pause