@echo off
@setlocal enableextensions
@cd /d "%~dp0/daemon"

echo Starting XWebApp Service ...
goto check_Permissions

:start_svc
xwebappservice.exe start >nul 2>&1
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
	goto start_svc
) else (
	echo Failure: Current permissions inadequate.
	goto error_exit
)