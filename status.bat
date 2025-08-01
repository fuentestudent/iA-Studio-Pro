@echo off
setlocal

set "PROJECT_DIR=C:\www\Optimización de Proyectos con IA"
pushd %PROJECT_DIR%

echo ==================================================
echo      ESTADO DEL PROYECTO: Optimización de Proyectos con IA
echo ==================================================
echo.

echo --- Resumen del README.md ---
type "README.md"
echo.
echo.

echo --- Progreso Actual (PROJECT_PROGRESS.md) ---
if exist "PROJECT_PROGRESS.md" (
    type "PROJECT_PROGRESS.md"
) else (
    echo No se encontro PROJECT_PROGRESS.md
)
echo.
echo.

echo --- Ultimo Cambio Registrado (Git) ---
git log -n 1 --pretty=format:"%%h - %%s (%%ar)"
echo.

popd
endlocal