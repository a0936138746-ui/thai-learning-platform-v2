import {
  BOOKING_STORAGE_KEY,
  LEARNING_PROGRESS_STORAGE_KEY,
  QUIZ_STORAGE_KEY,
  SENTENCE_STORAGE_KEY,
  VOCABULARY_STORAGE_KEY,
} from "../data";
import { cardStyle, pageStyle, subtitleStyle, titleStyle } from "../styles";

const DEMO_VERSION = "MVP v2026.06";

const DEMO_STORAGE_KEYS = [
  VOCABULARY_STORAGE_KEY,
  SENTENCE_STORAGE_KEY,
  QUIZ_STORAGE_KEY,
  LEARNING_PROGRESS_STORAGE_KEY,
  BOOKING_STORAGE_KEY,
];

const shellStyle = {
  maxWidth: "1080px",
  margin: "0 auto",
};

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
  marginBottom: "22px",
};

const brandStyle = {
  fontWeight: "bold",
  color: "#111827",
  fontSize: "18px",
};

const demoBadgeStyle = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "#e8f3ff",
  color: "#155e75",
  fontWeight: "bold",
  fontSize: "14px",
};

const introStyle = {
  textAlign: "center",
  marginBottom: "28px",
};

const introTextStyle = {
  maxWidth: "760px",
  margin: "0 auto",
  color: "#52616b",
  lineHeight: 1.7,
  fontSize: "clamp(16px, 4vw, 18px)",
};

const entranceGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
  gap: "16px",
  marginBottom: "28px",
};

const actionCardStyle = {
  ...cardStyle,
  minHeight: "180px",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid #e5e7eb",
};

const cardLabelStyle = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const cardTitleStyle = {
  margin: "0 0 10px",
  color: "#111827",
};

const cardTextStyle = {
  color: "#52616b",
  lineHeight: 1.6,
  margin: 0,
};

const sectionStyle = {
  marginTop: "28px",
};

const sectionHeaderStyle = {
  margin: "0 0 14px",
  color: "#111827",
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
  gap: "14px",
};

const infoCardStyle = {
  background: "white",
  padding: "18px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  lineHeight: 1.6,
};

const mutedTextStyle = {
  color: "#64748b",
  margin: "8px 0 0",
};

const refreshPanelStyle = {
  marginTop: "28px",
  padding: "16px",
  borderRadius: "16px",
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
};

const refreshButtonStyle = {
  padding: "10px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  background: "white",
  color: "#111827",
  cursor: "pointer",
  lineHeight: 1.35,
};

async function reloadLatestDemo() {
  const shouldReload = confirm(
    "要清除目前瀏覽器內的練習資料，重新載入最新示範資料嗎？"
  );

  if (!shouldReload) {
    return;
  }

  DEMO_STORAGE_KEYS.forEach((storageKey) => {
    localStorage.removeItem(storageKey);
  });

  if ("caches" in window) {
    const cacheNames = await window.caches.keys();
    await Promise.all(cacheNames.map((cacheName) => window.caches.delete(cacheName)));
  }

  window.location.replace(`${window.location.pathname}?refresh=${Date.now()}`);
}

export default function HomePage({ setPage }) {
  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <div style={topBarStyle}>
          <div style={brandStyle}>Thai Learning Platform</div>
          <span style={demoBadgeStyle}>{DEMO_VERSION}</span>
        </div>

        <section style={introStyle}>
          <h1 style={titleStyle}>泰文學習平台 MVP</h1>
          <p style={subtitleStyle}>先把學習流程做穩，再逐步補上內容、音檔與資料庫。</p>
          <p style={introTextStyle}>
            目前版本已經可以練習字卡、句型、測驗，也能從老師端管理字庫、句庫和題庫。音檔欄位已準備好，之後只要補上檔案即可啟用播放。
          </p>
        </section>

        <section style={entranceGridStyle}>
          <div style={actionCardStyle} onClick={() => setPage("student")}>
            <div>
              <div style={cardLabelStyle}>Student</div>
              <h2 style={cardTitleStyle}>學生學習入口</h2>
              <p style={cardTextStyle}>
                從字卡、句型、測驗開始練習，適合先做內容驗證和學習流程測試。
              </p>
            </div>
            <strong>開始學習</strong>
          </div>

          <div style={actionCardStyle} onClick={() => setPage("teacher")}>
            <div>
              <div style={cardLabelStyle}>Teacher</div>
              <h2 style={cardTitleStyle}>老師管理後台</h2>
              <p style={cardTextStyle}>
                管理字庫、句庫、題庫和學習紀錄，先用本機儲存支撐 MVP。
              </p>
            </div>
            <strong>進入後台</strong>
          </div>

          <div style={actionCardStyle} onClick={() => setPage("booking")}>
            <div>
              <div style={cardLabelStyle}>Schedule</div>
              <h2 style={cardTitleStyle}>預約與時段</h2>
              <p style={cardTextStyle}>
                先保留課程預約流程，後續可接資料庫與通知系統。
              </p>
            </div>
            <strong>查看預約</strong>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionHeaderStyle}>目前已完成</h2>
          <div style={infoGridStyle}>
            <div style={infoCardStyle}>
              <strong>內容資料</strong>
              <p style={mutedTextStyle}>已建立字庫、句型、題庫，可從老師後台持續增修。</p>
            </div>
            <div style={infoCardStyle}>
              <strong>學生練習</strong>
              <p style={mutedTextStyle}>支援字卡翻面、分類篩選、句型看答案和測驗記錄。</p>
            </div>
            <div style={infoCardStyle}>
              <strong>音檔準備</strong>
              <p style={mutedTextStyle}>資料欄位已保留，音檔可等內容穩定後再補。</p>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionHeaderStyle}>下一階段方向</h2>
          <div style={infoGridStyle}>
            <div style={infoCardStyle}>
              <strong>豐富頁面</strong>
              <p style={mutedTextStyle}>把學生端整理成更完整的學習路徑和章節感。</p>
            </div>
            <div style={infoCardStyle}>
              <strong>擴充素材</strong>
              <p style={mutedTextStyle}>繼續補字庫、題庫、圖片，音檔最後批次加入。</p>
            </div>
            <div style={infoCardStyle}>
              <strong>資料庫升級</strong>
              <p style={mutedTextStyle}>等流程成熟後，再接正式登入、雲端資料與後台權限。</p>
            </div>
          </div>
        </section>

        <div style={refreshPanelStyle}>
          <span style={mutedTextStyle}>
            如果看不到最新示範資料，可以清除瀏覽器內的舊資料後重新載入。
          </span>
          <button style={refreshButtonStyle} onClick={reloadLatestDemo}>
            重新載入示範資料
          </button>
        </div>
      </main>
    </div>
  );
}
