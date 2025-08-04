@echo off
echo Iniciando la aplicacion INTEGRADA...

REM Limpiar logs anteriores
del backend_log.txt 2>nul
del frontend_log.txt 2>nul

echo Iniciando servidor backend en segundo plano...
start "Backend" cmd /c "cd backend && npm start > ..\backend_log.txt 2>&1"

echo Iniciando servidor frontend en segundo plano...
start "Frontend" cmd /c "cd frontend && npm run dev > ..\frontend_log.txt 2>&1"

echo.
echo Esperando a que los servidores se inicien (10 segundos)...
timeout /t 10 > nul

echo.
echo =================================================================
echo      La aplicacion INTEGRADA deberia estar en ejecucion.
echo =================================================================
echo.
echo  - Backend: http://localhost:3000
echo  - Frontend: http://localhost:5173 (o el puerto que Vite asigne)
echo.
echo  - Logs del Backend: backend_log.txt
echo  - Logs del Frontend: frontend_log.txt
echo.
echo Esta ventana se puede cerrar. Los servidores seguiran corriendo en segundo plano.
echo.
pause