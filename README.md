# Thai Learning Platform v2

泰文學習平台 MVP。這個版本先聚焦在前端學習流程：學生可以練習單字圖卡、句型與測驗，老師可以管理教材、題庫、預約與學習紀錄。

目前資料先存放在瀏覽器 `localStorage`，方便快速展示、測試與迭代。資料庫、登入與多人權限會放在後續階段。

## 目前功能

### 首頁

- 平台入口與 MVP 狀態說明
- 學生學習中心入口
- 老師管理後台入口
- 課程預約入口
- 重置 demo 資料

### 學生端

- 單字圖卡：依分類練習中文、泰文、拼音與圖片
- 句型練習：先看中文情境，再查看泰文與拼音
- 測驗練習：選擇題作答，完成一輪後留下學習紀錄
- 未來預留：母音子音、每日複習、AI 對話練習

### 老師端

- 單字管理：新增、編輯、刪除單字，支援分類欄位
- 句型管理：新增、編輯、刪除句型與提示
- 測驗題庫：新增、編輯、刪除選擇題與正確答案
- 學習紀錄：查看測驗次數、最佳正確率、最近作答與紀錄列表
- 課程預約：新增、查看、刪除 demo 課程預約

## 技術狀態

- React 19
- Vite 8
- 純前端狀態管理
- `localStorage` 保存教材、測驗、紀錄與預約
- 圖卡圖片放在 `src/assets/flashcards`
- 發音音檔可放在 `public/audio`
- 共用樣式放在 `src/styles.js`

## 啟動方式

安裝套件：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

預設網址：

```text
http://127.0.0.1:5173/
```

檢查程式：

```bash
npm run lint
```

建立正式輸出：

```bash
npm run build
```

## 重要設定

`vite.config.js` 目前有幾個 Windows 相容設定：

- `cacheDir: ".vite-cache"`：避免使用 `node_modules/.vite` 時遇到快取刪除權限問題。
- `build.emptyOutDir: false`：避免打包時清空舊 `dist` 被 Windows 權限擋住。
- `resolve.preserveSymlinks: true`：避開 Vite 在特定 Windows 環境中解析真實路徑時觸發子程序權限錯誤。

這些設定是為了讓目前開發環境穩定可跑。若未來換到乾淨環境或 CI，可以再評估是否恢復 Vite 預設設定。

## 發音音檔

目前播放邏輯以音檔為主。若資料沒有音檔路徑，系統會提示尚未設定音檔。

建議音檔放在：

```text
public/audio/vocab/
public/audio/sentences/
```

範例：

```text
public/audio/vocab/sawasdee.mp3
```

老師後台的「單字管理」或「句型管理」可以填入：

```text
/audio/vocab/sawasdee.mp3
```

學生端點「播放泰文」時，如果該資料有音檔路徑，會播放 mp3。若沒有音檔路徑，會提醒先到老師後台設定。

第一批建議音檔清單在：

```text
public/audio/audio-plan.md
```

## 主要檔案

- `src/App.jsx`：平台頁面切換與 localStorage 資料同步
- `src/data.js`：預設單字、句型、測驗題與 storage key
- `public/audio`：泰文發音音檔，可用 `/audio/...mp3` 填入資料的 `audio` 欄位
- `src/styles.js`：共用 inline style
- `src/pages/HomePage.jsx`：首頁
- `src/pages/StudentPage.jsx`：學生學習中心
- `src/pages/TeacherPage.jsx`：老師管理後台
- `src/pages/FlashcardPage.jsx`：單字圖卡
- `src/pages/SentencePracticePage.jsx`：句型練習
- `src/pages/QuizPage.jsx`：測驗練習
- `src/pages/VocabularyManagerPage.jsx`：單字管理
- `src/pages/SentenceManagerPage.jsx`：句型管理
- `src/pages/QuizManagerPage.jsx`：測驗題庫
- `src/pages/BookingPage.jsx`：課程預約
- `src/pages/LearningProgressPage.jsx`：學習紀錄

## 下一步建議

1. 先做一輪瀏覽器人工測試，確認每個入口頁都能正常操作。
2. 擴充 50 到 100 筆高品質單字、句型與測驗題。
3. 壓縮圖卡圖片，降低打包體積。
4. 整理共用 UI 元件，減少頁面內重複 style。
5. 規劃資料庫版本，例如 Supabase 或 Firebase。
6. 加入帳號、老師/學生權限與雲端同步。

## 目前定位

這不是最終產品版，而是可以繼續擴充的 MVP 基礎版。優先順序是：

1. 平台穩定
2. 頁面完整
3. 內容豐富
4. 再接資料庫與登入
