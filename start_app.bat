@echo off
echo Iniciando la aplicacion INTEGRADA...

start cmd /k "cd backend && npm start"
start cmd /k "cd frontend && npm run dev"

echo La aplicacion INTEGRADA se esta iniciando.
echo El backend se ejecutara en http://localhost:3000
echo El frontend se ejecutara en http://localhost:5173 (o el puerto que Vite asigne)
pause