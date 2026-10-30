# Soma Cube 解答資料庫

本地網頁工具，用來辨識、記錄並比較 Soma cube 的 240 組解。

| 檔案 | 用途 |
|---|---|
| `soma-db.html` | 240 組解答資料庫：辨識編號、存入紀錄（發現者、日期時間、備註）、解答列表、兩組解比較 |
| `soma-input-minecraft.html` | Minecraft 風格的格子輸入 |
| `soma-input.html` | 立體擺放輸入 |
| `server.py` | 本地伺服器：提供網頁，並把紀錄讀寫到 `soma-records.json` |
| `start-server.bat` | Windows 一鍵啟動 `server.py`（port 8765） |

## 使用方式

雙擊 `start-server.bat`（需安裝 Python），再用瀏覽器開啟 `http://localhost:8765/soma-db.html`。

紀錄存在同資料夾的 `soma-records.json`。資料夾放在 Dropbox 裡，多台電腦就會共用同一份紀錄。每次寫入前，上一版會留在 `soma-records.bak.json`。

若沒透過伺服器開啟（例如直接雙擊 html），頁面會提示紀錄只暫存在瀏覽器裡。

---

# Soma Cube Solution Database (English)

A local web tool for identifying, recording, and comparing the 240 Soma cube solutions.

| File | Purpose |
|---|---|
| `soma-db.html` | 240-solution database: identify by number, save records (solver, date/time, notes), browse solutions, compare two solutions |
| `soma-input-minecraft.html` | Minecraft-style grid input |
| `soma-input.html` | 3D placement input |
| `server.py` | Local server: serves the pages and reads/writes records to `soma-records.json` |
| `start-server.bat` | One-click launcher for `server.py` on Windows (port 8765) |
| `i18n.js` | Auto-switches the UI to English for non-Chinese browsers (toggle in the top-right corner) |

## Usage

Double-click `start-server.bat` (Python required), then open `http://localhost:8765/soma-db.html` in your browser.

Records are stored in `soma-records.json` in the same folder. Putting the folder in Dropbox lets multiple computers share the same records. Each write backs up the previous version to `soma-records.bak.json`.

If opened without the server (e.g., by double-clicking the HTML directly), the page will warn that records are only kept in the browser.

## Language

The pages auto-detect the browser language: Chinese (`zh-*`) locales see the Chinese UI; everything else sees English. A small `EN` / `中` button in the top-right corner lets you switch manually (the choice is remembered via `localStorage`). You can also append `?lang=en` or `?lang=zh` to any URL.
