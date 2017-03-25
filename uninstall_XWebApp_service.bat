@echo off
@setlocal enableextensions
@cd /d "%~dp0"

echo Uninstalling Node Service ...
set skip=false
goto check_Permissions

:uninstall_svc
start /wait node uninstall_svc.js >nul 2>&1
if not %errorlevel% == 0 (
	REM este check es un workaround por el bug de node-windows
	if not %errorlevel% == 1 (
		set skip=true
	)	
)
if %skip% == true goto error_exit
echo XWebApp service uninstalled.
pause
REM parte del workaround para borrar archivos que sobran
@cd daemon
del xwebappservice.exe xwebappservice.exe.config
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
	goto uninstall_svc
) else (
	echo Failure: Current permissions inadequate.
	goto error_exit
)