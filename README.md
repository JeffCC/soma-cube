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
