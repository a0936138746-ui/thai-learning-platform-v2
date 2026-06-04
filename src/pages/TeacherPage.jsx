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

function showComingSoon() {
  alert("這個管理功能會放到後續版本，先把內容和學習流程穩定下來。");
}

export default function TeacherPage({ setPage }) {
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
        </div>

        <div style={noteStyle}>
          現在的後台資料會存放在目前瀏覽器中，適合 MVP 測試。正式上線前再升級成雲端資料庫，避免太早增加維護成本。
        </div>
      </main>
    </div>
  );
}
