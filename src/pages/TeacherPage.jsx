import {
  BOOKING_STORAGE_KEY,
  LEARNING_PROGRESS_STORAGE_KEY,
  QUIZ_STORAGE_KEY,
  SENTENCE_STORAGE_KEY,
  VOCABULARY_STORAGE_KEY,
} from "../data";
import {
  backButtonStyle,
  cardStyle,
  gridStyle,
  pageStyle,
  subtitleStyle,
  titleStyle,
} from "../styles";

const shellStyle = {
  maxWidth: "980px",
  margin: "0 auto",
};

const managementCardStyle = {
  ...cardStyle,
  minHeight: "150px",
  textAlign: "left",
  border: "1px solid #e5e7eb",
};

const cardTitleStyle = {
  margin: "0 0 10px",
  color: "#111827",
};

const cardTextStyle = {
  margin: 0,
  color: "#64748b",
  lineHeight: 1.6,
  fontSize: "16px",
};

const noteStyle = {
  marginTop: "24px",
  padding: "16px",
  borderRadius: "16px",
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  color: "#52616b",
  lineHeight: 1.6,
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
  gap: "14px",
  marginBottom: "24px",
};

const summaryCardStyle = {
  background: "white",
  padding: "18px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
};

const summaryLabelStyle = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "8px",
};

const summaryValueStyle = {
  color: "#111827",
  fontSize: "clamp(24px, 7vw, 34px)",
  fontWeight: "bold",
};

const sectionTitleStyle = {
  margin: "26px 0 14px",
  color: "#111827",
};

const healthPanelStyle = {
  background: "white",
  padding: "18px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  marginBottom: "24px",
};

const healthGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))",
  gap: "12px",
  marginTop: "14px",
};

const healthItemStyle = {
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "14px",
};

const healthTitleStyle = {
  color: "#111827",
  fontWeight: "bold",
  marginBottom: "6px",
};

const healthTextStyle = {
  color: "#64748b",
  lineHeight: 1.5,
  margin: 0,
  fontSize: "15px",
};

function showComingSoon() {
  alert("這個管理功能會放到後續版本，先把內容和學習流程穩定下來。");
}

async function resetDemoData() {
  const shouldReset = confirm(
    "要清除目前瀏覽器內的自訂資料，重新載入內建示範資料嗎？"
  );

  if (!shouldReset) {
    return;
  }

  [
    VOCABULARY_STORAGE_KEY,
    SENTENCE_STORAGE_KEY,
    QUIZ_STORAGE_KEY,
    LEARNING_PROGRESS_STORAGE_KEY,
    BOOKING_STORAGE_KEY,
  ].forEach((storageKey) => {
    localStorage.removeItem(storageKey);
  });

  if ("caches" in window) {
    const cacheNames = await window.caches.keys();
    await Promise.all(cacheNames.map((cacheName) => window.caches.delete(cacheName)));
  }

  window.location.replace(`${window.location.pathname}?reset=${Date.now()}`);
}

export default function TeacherPage({
  setPage,
  teacherVocabulary,
  teacherSentences,
  quizQuestions,
  learningProgress,
}) {
  const imageCount = teacherVocabulary.filter((item) => item.image).length;
  const audioCount =
    teacherVocabulary.filter((item) => item.audio).length +
    teacherSentences.filter((item) => item.audio).length;
  const missingImageCount = teacherVocabulary.length - imageCount;
  const missingVocabularyAudioCount = teacherVocabulary.filter(
    (item) => !item.audio
  ).length;
  const missingSentenceAudioCount = teacherSentences.filter(
    (item) => !item.audio
  ).length;

  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("home")}>
          回首頁
        </button>

        <h1 style={titleStyle}>老師管理後台</h1>
        <p style={subtitleStyle}>
          先管理內容資料，等平台穩定後再接正式資料庫與權限。
        </p>

        <section style={summaryGridStyle}>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>字卡</div>
            <div style={summaryValueStyle}>{teacherVocabulary.length}</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>句型</div>
            <div style={summaryValueStyle}>{teacherSentences.length}</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>題目</div>
            <div style={summaryValueStyle}>{quizQuestions.length}</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>圖片</div>
            <div style={summaryValueStyle}>{imageCount}</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>音檔路徑</div>
            <div style={summaryValueStyle}>{audioCount}</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>測驗紀錄</div>
            <div style={summaryValueStyle}>{learningProgress.length}</div>
          </div>
        </section>

        <section style={healthPanelStyle}>
          <h2 style={cardTitleStyle}>素材狀態</h2>
          <p style={cardTextStyle}>
            這裡用來追蹤後續要補的圖片與音檔，先看缺口，再分批補齊。
          </p>

          <div style={healthGridStyle}>
            <div style={healthItemStyle}>
              <div style={healthTitleStyle}>字卡圖片</div>
              <p style={healthTextStyle}>
                已設定 {imageCount} 筆，尚缺 {missingImageCount} 筆。
              </p>
            </div>
            <div style={healthItemStyle}>
              <div style={healthTitleStyle}>字卡音檔</div>
              <p style={healthTextStyle}>
                尚缺 {missingVocabularyAudioCount} 筆，之後可批次補在 /audio/vocab。
              </p>
            </div>
            <div style={healthItemStyle}>
              <div style={healthTitleStyle}>句型音檔</div>
              <p style={healthTextStyle}>
                尚缺 {missingSentenceAudioCount} 筆，適合等句庫穩定後再補。
              </p>
            </div>
          </div>
        </section>

        <h2 style={sectionTitleStyle}>管理工具</h2>
        <div style={gridStyle}>
          <div style={managementCardStyle} onClick={() => setPage("vocabulary")}>
            <h2 style={cardTitleStyle}>字庫管理</h2>
            <p style={cardTextStyle}>新增、修改、刪除泰文單字，包含分類、拼音和音檔路徑。</p>
          </div>

          <div style={managementCardStyle} onClick={() => setPage("sentences")}>
            <h2 style={cardTitleStyle}>句庫管理</h2>
            <p style={cardTextStyle}>整理常用句型、中文意思、泰文句子和補充說明。</p>
          </div>

          <div style={managementCardStyle} onClick={() => setPage("quizManager")}>
            <h2 style={cardTitleStyle}>題庫管理</h2>
            <p style={cardTextStyle}>編輯選擇題，支援 A、B、C 三個選項與正確答案。</p>
          </div>

          <div style={managementCardStyle} onClick={() => setPage("learningProgress")}>
            <h2 style={cardTitleStyle}>學習紀錄</h2>
            <p style={cardTextStyle}>查看學生端測驗完成紀錄，先用本機資料驗證流程。</p>
          </div>

          <div style={managementCardStyle} onClick={() => setPage("booking")}>
            <h2 style={cardTitleStyle}>預約時段</h2>
            <p style={cardTextStyle}>保留課程預約入口，之後可接通知和日曆。</p>
          </div>

          <div style={managementCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>AI 內容助手</h2>
            <p style={cardTextStyle}>後續可協助批次產生單字、例句、測驗和圖片提示詞。</p>
          </div>

          <div style={managementCardStyle} onClick={resetDemoData}>
            <h2 style={cardTitleStyle}>重置示範資料</h2>
            <p style={cardTextStyle}>清除目前瀏覽器內的測試資料，重新載入內建字庫、句庫和題庫。</p>
          </div>
        </div>

        <div style={noteStyle}>
          現在的後台資料會存放在目前瀏覽器中，適合 MVP 測試。正式上線前再升級成雲端資料庫，避免太早增加維護成本。
        </div>
      </main>
    </div>
  );
}
