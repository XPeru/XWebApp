@echo off
@setlocal enableextensions
@cd /d "%~dp0"

echo Installing Node Service ...
goto check_Permissions

:install_svc
start /wait node install_svc.js
if not %errorlevel% == 0 goto error_exit
echo XWebApp service installed.
pause
SC CONFIG xwebappservice.exe START=demand
if not %errorlevel% == 0 goto error_exit
exit 0

:error_exit
echo **************************** ERROR ****************************
echo Ejecutar como administrador o verificar el error de nivel %errorlevel%
echo ***************************************************************
pause
exit %errorlevel%

:check_Permissions
echo Administrative permissions required. Detecting permissions ...
net session >nul 2>&1
if %errorLevel% == 0 (
	echo Success: Administrative permissions confirmed.
	goto install_svc
) else (
	echo Failure: Current permissions inadequate.
	goto error_exit
)