@echo off
echo Iniciando la aplicación INTEGRADA...

REM Establecer variables de entorno para el backend
REM Asegúrate de reemplazar los valores con tus credenciales reales de MongoDB y un secreto JWT fuerte.
set MONGODB_URI="mongodb+srv://<usuario>:<contraseña>@cluster0.hxltzpx.mongodb.net/integrada_db?retryWrites=true&w=majority&appName=Cluster0"
set JWT_SECRET="tu_secreto_jwt_aqui"

REM Iniciar el backend en una nueva ventana de terminal
start cmd /k "cd backend && npm start"

REM Iniciar el frontend en otra nueva ventana de terminal
start cmd /k "cd frontend && npm run dev"

echo La aplicación INTEGRADA se está iniciando.
echo El backend se ejecutará en http://localhost:3000
echo El frontend se ejecutará en http://localhost:5173 (o el puerto que Vite asigne)
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul