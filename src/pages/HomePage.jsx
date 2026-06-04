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
    "要清除本機練習資料並重新載入預設 demo 嗎？"
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
          <p style={subtitleStyle}>先穩定學習流程，再逐步擴充教材與資料庫。</p>
          <p style={introTextStyle}>
            目前版本提供學生練習、老師教材管理、測驗紀錄與課程預約。資料先保存在本機瀏覽器，方便快速展示與迭代。
          </p>
        </section>

        <section style={entranceGridStyle}>
          <div style={actionCardStyle} onClick={() => setPage("student")}>
            <div>
              <div style={cardLabelStyle}>Student</div>
              <h2 style={cardTitleStyle}>學生學習中心</h2>
              <p style={cardTextStyle}>
                練習單字圖卡、句型與測驗，適合做每日短時間複習。
              </p>
            </div>
            <strong>開始練習</strong>
          </div>

          <div style={actionCardStyle} onClick={() => setPage("teacher")}>
            <div>
              <div style={cardLabelStyle}>Teacher</div>
              <h2 style={cardTitleStyle}>老師管理後台</h2>
              <p style={cardTextStyle}>
                管理單字、句型與測驗題，檢視學生練習成果。
              </p>
            </div>
            <strong>管理教材</strong>
          </div>

          <div style={actionCardStyle} onClick={() => setPage("booking")}>
            <div>
              <div style={cardLabelStyle}>Schedule</div>
              <h2 style={cardTitleStyle}>課程預約</h2>
              <p style={cardTextStyle}>
                建立課程時間、學生姓名、課程類型與備註。
              </p>
            </div>
            <strong>查看預約</strong>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionHeaderStyle}>目前已完成</h2>
          <div style={infoGridStyle}>
            <div style={infoCardStyle}>
              <strong>教材資料</strong>
              <p style={mutedTextStyle}>內建泰文單字、句型與測驗題，支援老師後台調整。</p>
            </div>
            <div style={infoCardStyle}>
              <strong>學習互動</strong>
              <p style={mutedTextStyle}>學生可以翻圖卡、練句型、作答測驗並留下紀錄。</p>
            </div>
            <div style={infoCardStyle}>
              <strong>本機保存</strong>
              <p style={mutedTextStyle}>目前使用 localStorage 保存，適合 MVP 展示與快速測試。</p>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionHeaderStyle}>接下來方向</h2>
          <div style={infoGridStyle}>
            <div style={infoCardStyle}>
              <strong>穩定平台</strong>
              <p style={mutedTextStyle}>先整理頁面、修正文案與入口流程。</p>
            </div>
            <div style={infoCardStyle}>
              <strong>豐富內容</strong>
              <p style={mutedTextStyle}>逐步增加字庫、例句、測驗題與一致風格圖片。</p>
            </div>
            <div style={infoCardStyle}>
              <strong>雲端資料庫</strong>
              <p style={mutedTextStyle}>等前端穩定後，再加入登入、權限與多人共用資料。</p>
            </div>
          </div>
        </section>

        <div style={refreshPanelStyle}>
          <span style={mutedTextStyle}>
            若本機資料混亂，可以重置 demo 內容重新開始。
          </span>
          <button style={refreshButtonStyle} onClick={reloadLatestDemo}>
            重置 demo 資料
          </button>
        </div>
      </main>
    </div>
  );
}
