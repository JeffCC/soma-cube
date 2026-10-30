// i18n for Soma Cube pages.
// Auto-switch by navigator.language: non-zh browsers get English.
// Users can override with ?lang=zh or ?lang=en, or by setting localStorage.somaLang.
(function () {
  function detectLang() {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q) return q.toLowerCase().startsWith('zh') ? 'zh' : 'en';
      const ls = localStorage.getItem('somaLang');
      if (ls) return ls === 'zh' ? 'zh' : 'en';
    } catch (e) {}
    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.startsWith('zh') ? 'zh' : 'en';
  }
  const LANG = detectLang();

  // Expose for other scripts (e.g. page JS that wants to format dates/weekdays).
  window.__somaLang = LANG;

  // Add a tiny language toggle in the corner.
  function addToggle() {
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:6px;right:8px;z-index:9999;font:600 11px -apple-system,"Segoe UI",sans-serif;background:rgba(255,255,255,0.85);border:1px solid #ccc;border-radius:4px;padding:2px 6px;cursor:pointer;color:#333';
    bar.textContent = LANG === 'zh' ? 'EN' : '中';
    bar.title = LANG === 'zh' ? 'Switch to English' : '切換為中文';
    bar.onclick = () => {
      try { localStorage.setItem('somaLang', LANG === 'zh' ? 'en' : 'zh'); } catch (e) {}
      location.reload();
    };
    document.body.appendChild(bar);
  }

  if (LANG === 'zh') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addToggle);
    else addToggle();
    return; // No translation for zh.
  }

  // ---------- Dictionary: exact string → English ----------
  const DICT = {
    // soma-db header & tabs
    'Soma Cube 解答資料庫': 'Soma Cube Solution Database',
    '240 組解答 · 樹狀編號 · 本機儲存': '240 solutions · Tree numbering · Local storage',
    '輸入解答': 'Input',
    '所有解答 (240)': 'All solutions (240)',
    '我的紀錄': 'My records',
    '比較兩組': 'Compare',
    '說明': 'Help',
    // input page
    '輸入你的解答': 'Enter your solution',
    '點選下面調色盤選一個 piece，再點格子填入。或在文字框輸入 27 個英文字母（V/L/T/Z/A/B/P）。':
      'Pick a piece from the palette, then click cells to fill. Or type a 27-letter string (V/L/T/Z/A/B/P) in the text box.',
    '底層 (z=0)': 'Bottom (z=0)',
    '中層 (z=1)': 'Middle (z=1)',
    '頂層 (z=2)': 'Top (z=2)',
    '清': 'Clr',
    '文字輸入：': 'Text input:',
    '載入': 'Load',
    '識別編號': 'Identify',
    '全部清除': 'Clear all',
    '3D 視圖（滑鼠拖曳旋轉）': '3D view (drag to rotate)',
    '標準擺放文字格式 (3×3×3)': 'Canonical text format (3×3×3)',
    '發現者：': 'Solver:',
    '預存': 'Preset',
    '填入上次存過的名字': 'Fill in last saved name',
    '備註：': 'Notes:',
    '存入紀錄': 'Save record',
    '所有 240 組解答': 'All 240 solutions',
    '綠色邊框 = 我已解出': 'Green border = solved',
    '讀取紀錄中…': 'Loading records…',
    '匯出 JSON': 'Export JSON',
    '匯入 JSON': 'Import JSON',
    '清除所有紀錄': 'Clear all records',
    '#': '#',
    '編號': '#',
    '日期時間': 'Date / Time',
    '備註': 'Notes',
    '發現者': 'Solver',
    '兩組解答平行對比': 'Compare two solutions',
    '左：#': 'Left: #',
    '右：#': 'Right: #',
    '比較': 'Compare',
    '（雙邊視角自動同步旋轉）': '(Both views rotate in sync)',
    '同格相同顏色：原色正常顯示；同格不同顏色：以反白粗體 (★) 標示；滑鼠在任一邊 3D 視圖拖曳可旋轉（視角同步時雙邊同時轉）。':
      'Same cell / same color: shown as-is. Different: highlighted bold (★). Dragging either 3D view rotates both in sync.',
    '七個 Soma Piece': 'The Seven Soma Pieces',
    '3 方塊 L 形 (tricube)': '3-cube L-shape (tricube)',
    '4 方塊 L 形': '4-cube L-shape',
    '4 方塊 T 形': '4-cube T-shape',
    '4 方塊 S/Z 形': '4-cube S/Z-shape',
    '4 方塊 左手螺旋 (chiral)': '4-cube left-hand helix (chiral)',
    '4 方塊 右手螺旋 (A 的鏡像)': '4-cube right-hand helix (mirror of A)',
    '4 方塊 三角架 (branch/tripod)': '4-cube tripod (branch)',
    '座標系': 'Coordinates',
    'x: 0=左, 2=右': 'x: 0=left, 2=right',
    'y: 0=上 (後方), 2=下 (前方) — 這是你從上面看每一層的視角':
      'y: 0=top (back), 2=bottom (front) — the top-down view of each layer',
    'z: 0=底層, 2=頂層': 'z: 0=bottom, 2=top',
    '格子索引 = z×9 + y×3 + x，從 0 (左上角底層) 到 26 (右下角頂層)':
      'Cell index = z×9 + y×3 + x, from 0 (top-left bottom) to 26 (bottom-right top)',
    '編號規則': 'Numbering',
    '共 240 組不重覆解答 (把 24 旋轉 + 鏡射且 A↔B 互換 視為同一組)':
      '240 unique solutions (24 rotations + mirror with A↔B swap are counted as one)',
    '第 1 層分組：按位置 0 (0,0,0) 的 piece 分組，頻率高者排前；平手由上述字母順序決定':
      'Level 1 group: by the piece at position 0 (0,0,0); more frequent first; ties by letter order',
    '第 2 層：同組內看位置 1 (1,0,0)，同樣規則': 'Level 2: within group, look at position 1 (1,0,0); same rule',
    '依此遞迴到唯一': 'Recurse until unique',
    '結果：編號 1~207 都是 V 在 (0,0,0)，208~240 是 L 在 (0,0,0)':
      'Result: #1–207 have V at (0,0,0); #208–240 have L at (0,0,0)',
    '資料儲存': 'Data storage',

    // input/minecraft shared
    '選擇方塊': 'Pick a piece',
    '已擺放': 'Placed',
    '已填格': 'Filled',
    'Z 層切換': 'Z layer',
    '頂層 Z=2': 'Top Z=2',
    '中層 Z=1': 'Middle Z=1',
    '底層 Z=0': 'Bottom Z=0',
    'Z 代表方塊「最底格」的 Z 值。非平面方塊 (A/B/P) 若放 Z=2 會往上凸出。':
      'Z is the piece\'s lowest-cell Z. Non-planar pieces (A/B/P) placed at Z=2 will stick above.',
    '操作': 'Controls',
    '點選': 'Click',
    '上方調色盤選一塊': 'the palette above to pick a piece',
    '旋轉 X/Y/Z 軸': 'rotate X/Y/Z axis',
    '滑鼠': 'Mouse',
    '水平移動定位': 'horizontal positioning',
    '滾輪': 'Wheel',
    '或': 'or',
    '或左側 Z 按鈕': 'or Z buttons at left',
    '切換層': 'switch layer',
    '左鍵': 'Left click',
    '擺入（綠色＝可放，紅色＝不可）': 'place (green=OK, red=blocked)',
    '取消目前這塊': 'cancel current piece',
    '復原上一步': 'Undo',
    '右鍵拖曳': 'Right-drag',
    '旋轉視角': 'rotate view',
    '復原上一步 (U)': 'Undo (U)',
    '輸出 27 字文字': 'Export 27-char text',
    '尚未選擇': 'None selected',
    '右鍵拖曳＝旋轉視角 · 滾輪＝切換 Z 層（Shift+滾輪＝縮放）':
      'Right-drag = rotate view · Wheel = switch Z (Shift+Wheel = zoom)',
    '點選方塊 · A/S/D 旋轉 · 滑鼠移動定位 · 點擊擺入':
      'Pick a piece · A/S/D to rotate · move mouse to position · click to place',
    'Soma Cube 立體擺放輸入': 'Soma Cube 3D Placement Input',
    '立體擺放': '3D Placement',
    '輸入': 'Input',
    'Soma Cube 格子輸入 (Minecraft 風)': 'Soma Cube Grid Input (Minecraft style)',
    '格子': 'Grid',
    '選顏色後，直接點格子逐塊堆積（Minecraft 風格）· 自動存草稿':
      'Pick a color, then click cells to stack blocks (Minecraft style) · Draft auto-saved',
    '選顏色（哪個 piece）': 'Pick color (which piece)',
    '右鍵也可以擦除': 'Right-click also erases',
    '擦': 'Era',
    '草稿自動存在瀏覽器 · 下次打開會自動還原': 'Draft auto-saved to browser · auto-restored next time',
    '總格數': 'Total cells',
    '目標': 'Target',
    'V=3 其餘=4': 'V=3, others=4',
    '左鍵點擊': 'Left click',
    '加方塊（顏色＝目前選的 piece）': 'add block (color = selected piece)',
    '右鍵點擊': 'Right click',
    '刪除方塊 （或選「擦」+左鍵）': 'delete block (or pick "Era" + left-click)',
    '點方塊的「某一面」會貼在那面之外的格子': 'Clicking a face of a block attaches to the cell outside that face',
    '點背景透明壁面可以在那面直接畫': 'Click the transparent wall to draw directly on that face',
    '左鍵拖曳': 'Left-drag',
    '中鍵拖曳': 'Middle-drag',
    '滾輪 縮放': 'Wheel = zoom',
    '快速切色': 'quick color switch',
    '擦除': 'erase',
    '另存命名草稿': 'Save named draft',
    '載入命名草稿': 'Load named draft',
    '輸出 / 驗證': 'Export / Validate',
    '左鍵加 · 右鍵刪 · 中鍵/空白右拖＝旋轉': 'Left=add · Right=delete · Middle/right-drag=rotate',
    '擦除模式': 'Erase mode',
    '尚未完成': 'Incomplete',
    '複製': 'Copy',
    '已複製': 'Copied',
    '在資料庫識別': 'Identify in DB',

    // common
    '名字': 'Name',
    '刪除': 'Delete',
    '目前沒有紀錄': 'No records yet',
  };

  // ---------- Pattern replacements (for dynamic / templated strings) ----------
  const PATTERNS = [
    [/^識別成功！這是編號\s*/, 'Identified! This is '],
    [/^這不是合法的 Soma Cube 解答（方塊必須構成七個指定形狀）$/, 'Not a valid Soma Cube solution (pieces must form the seven required shapes)'],
    [/^方塊數不正確：/, 'Wrong piece counts: '],
    [/應該有\s*(\d+)\s*個/g, 'should have $1'],
    [/^還有空格未填$/, 'Some cells are still empty'],
    [/^文字長度應為 27 個字元，目前\s*(\d+)$/, 'Text must be 27 characters; got $1'],
    [/^已載入$/, 'Loaded'],
    [/^請輸入發現者名字$/, 'Please enter the solver\'s name'],
    [/^刪除這筆紀錄？$/, 'Delete this record?'],
    [/^目前沒有紀錄$/, 'No records yet'],
    [/^確定清除全部紀錄？不可復原$/, 'Clear all records? This cannot be undone.'],
    [/^全部清除？$/, 'Clear all?'],
    [/^全部清除？草稿也會被清空。$/, 'Clear all? The draft will also be cleared.'],
    [/^匯入完成，目前共\s*(\d+)\s*筆$/, 'Import complete. $1 records total.'],
    [/^匯入失敗：/, 'Import failed: '],
    [/^不是陣列$/, 'Not an array'],
    [/^編號\s*#(\d+)$/, '#$1'],
    [/^已存入紀錄：發現者=(.+?)，編號 #(\d+)，時間 (.+)$/, 'Saved: solver=$1, #$2, time $3'],
    [/^預存：/, 'Preset: '],
    [/點一下填入「(.+?)」/, 'Click to fill in "$1"'],
    [/^還沒有存過名字，存入一筆紀錄後就會記住$/, 'No name saved yet — it will be remembered after you save a record'],
    [/^差異格數：(\d+)\s*\/\s*27$/, 'Diff cells: $1 / 27'],
    [/已存到 <b>soma-records\.json<\/b>（共\s*(\d+)\s*筆，Dropbox 會同步到其他電腦）/,
      'Saved to <b>soma-records.json</b> ($1 records; Dropbox will sync to other machines)'],
    [/寫入 soma-records\.json 失敗：(.+?)。這次的變更暫存在瀏覽器裡。/,
      'Failed to write soma-records.json: $1. This change is only in the browser.'],
    [/紀錄存在 <b>soma-records\.json<\/b>（共\s*(\d+)\s*筆，Dropbox 會同步到其他電腦）/,
      'Records stored in <b>soma-records.json</b> ($1 records; Dropbox will sync to other machines)'],
    [/沒有連上本地伺服器，紀錄只存在這個瀏覽器裡。請用 <b>start-server\.bat<\/b> 開啟本頁。/,
      'Not connected to the local server; records only live in this browser. Please open the page via <b>start-server.bat</b>.'],
    [/^✓ 可放$/, '✓ Valid'],
    [/^✗ 不可放$/, '✗ Invalid'],
    [/^✗ 這個位置不能放$/, '✗ Cannot place here'],
    [/^✓ 7 塊已擺齊$/, '✓ All 7 placed'],
    [/^尚未完成（(\d+)\/7 塊）$/, 'Not complete ($1/7 pieces)'],
    [/^Z = (\d|—)$/, 'Z = $1'],
    [/^(V|L|T|Z|A|B|P) 擺放中$/, 'Placing $1'],
    [/^目前顏色：(.+)$/, 'Current color: $1'],
    [/^cell \((\d),(\d),(\d)\)$/, 'cell ($1,$2,$3)'],
    [/^✓ 合法 Soma 解答（(\d+)\/27，所有方塊形狀正確）$/, '✓ Valid Soma solution ($1/27, all piece shapes correct)'],
    [/^尚未完成 \/ 不合法（(\d+)\/27）：/, 'Incomplete / invalid ($1/27): '],
    [/^(V|L|T|Z|A|B|P)：還沒放$/, '$1: not placed yet'],
    [/^(V|L|T|Z|A|B|P)：有\s*(\d+)\s*格（應為\s*(\d+)）$/, '$1: has $2 cells (should be $3)'],
    [/^(V|L|T|Z|A|B|P)：方塊不相連$/, '$1: cells are not connected'],
    [/^(V|L|T|Z|A|B|P)：形狀不符合（應為標準\s*(V|L|T|Z|A|B|P)\s*形的某個旋轉）$/, '$1: wrong shape (should be some rotation of standard $2 shape)'],
    [/^看起來可能是 A、B 顏色相反（手性弄反）。按下方按鈕一鍵互換試試：$/,
      'Looks like A and B colors may be swapped (chirality reversed). Click to swap:'],
    [/^A ↔ B 互換$/, 'Swap A ↔ B'],
    [/^27 字格式：$/, '27-char format:'],
    [/^輸入命名草稿名稱：$/, 'Enter a name for the draft:'],
    [/^已存為「(.+?)」$/, 'Saved as "$1"'],
    [/^存檔失敗：/, 'Save failed: '],
    [/^沒有命名草稿$/, 'No named drafts'],
    [/^選擇要載入的草稿編號：/, 'Pick a draft number to load:'],
    [/^載入失敗：/, 'Load failed: '],
    [/^目前還不是合法解答，資料庫會告訴你「無法識別」。繼續嗎？$/,
      'Not a valid solution yet; the database will say "cannot identify". Continue?'],
    [/^解出這組解時想記下的事（可空白）$/, 'Anything you want to note (optional)'],
    // weekday chars in formatDate: 日一二三四五六
    [/（([日一二三四五六])）/, (_, w) => '(' + ({'日':'Sun','一':'Mon','二':'Tue','三':'Wed','四':'Thu','五':'Fri','六':'Sat'}[w]) + ')'],
  ];

  function translate(s) {
    if (!s) return s;
    const trimmed = s.trim();
    if (!trimmed) return s;
    // Full-string dictionary match (trim-insensitive).
    if (DICT[trimmed] !== undefined) {
      return s.replace(trimmed, DICT[trimmed]);
    }
    // Pattern replacements (apply all that match).
    let out = s;
    for (const [re, repl] of PATTERNS) {
      out = out.replace(re, repl);
    }
    // Fallback: substring replacements for strings that embed a known key.
    if (out === s) {
      for (const k of Object.keys(DICT)) {
        if (s.indexOf(k) !== -1) out = out.split(k).join(DICT[k]);
      }
    }
    return out;
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      const v = node.nodeValue;
      const t = translate(v);
      if (t !== v) node.nodeValue = t;
      return;
    }
    if (node.nodeType !== 1) return;
    // Skip script/style
    const tag = node.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE') return;
    // Attributes we want to translate
    for (const attr of ['placeholder', 'title', 'value']) {
      if (node.hasAttribute && node.hasAttribute(attr)) {
        const v = node.getAttribute(attr);
        if (tag === 'INPUT' && attr === 'value') {
          const type = (node.getAttribute('type') || 'text').toLowerCase();
          if (type !== 'button' && type !== 'submit' && type !== 'reset') continue;
        }
        const t = translate(v);
        if (t !== v) node.setAttribute(attr, t);
      }
    }
    // Recurse children
    const kids = node.childNodes;
    for (let i = 0; i < kids.length; i++) walk(kids[i]);
  }

  function translateDocument() {
    walk(document.body);
    if (document.title) document.title = translate(document.title);
    document.documentElement.setAttribute('lang', 'en');
  }

  // Wrap alert/confirm/prompt so dynamic messages also translate.
  const _alert = window.alert, _confirm = window.confirm, _prompt = window.prompt;
  window.alert = function (msg) { return _alert.call(window, typeof msg === 'string' ? translate(msg) : msg); };
  window.confirm = function (msg) { return _confirm.call(window, typeof msg === 'string' ? translate(msg) : msg); };
  window.prompt = function (msg, def) { return _prompt.call(window, typeof msg === 'string' ? translate(msg) : msg, def); };

  function setup() {
    translateDocument();
    addToggle();
    // Watch for dynamic DOM changes.
    const obs = new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(walk);
        } else if (m.type === 'characterData') {
          walk(m.target);
        } else if (m.type === 'attributes') {
          const n = m.target;
          const a = m.attributeName;
          if (!n.hasAttribute || !n.hasAttribute(a)) continue;
          const v = n.getAttribute(a);
          const t = translate(v);
          if (t !== v) n.setAttribute(a, t);
        }
      }
    });
    obs.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'title', 'value'],
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
