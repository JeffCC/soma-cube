@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ========================================
echo   Soma Cube 本地伺服器
echo ========================================
echo.
echo   http://localhost:8765/soma-db.html                (解答資料庫 + 紀錄)
echo   http://localhost:8765/soma-input-minecraft.html   (Minecraft 風輸入)
echo   http://localhost:8765/soma-input.html             (立體擺放輸入)
echo.
echo 紀錄存在本資料夾的 soma-records.json，Dropbox 會同步。
echo 按 Ctrl+C 可停止伺服器。
echo ========================================
echo.
python server.py soma-input-minecraft.html
pause
