@echo off
echo Iniciando la aplicacion INTEGRADA...

REM Iniciar el backend y redirigir la salida a un archivo de log en la raiz del proyecto
cd backend
call npm start > ..\backend_log.txt 2>&1
cd ..

REM Iniciar el frontend y redirigir la salida a un archivo de log en la raiz del proyecto
cd frontend
call npm run dev > ..\frontend_log.txt 2>&1
cd ..

timeout /t 10 > nul

echo La aplicacion INTEGRADA se esta iniciando.
echo El backend se ejecutara en http://localhost:3000
echo El frontend se ejecutara en http://localhost:5173 (o el puerto que Vite asigne)
pause