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
  alert("這個管理功能還在規劃中。");
}

export default function TeacherPage({ setPage }) {
  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("home")}>
          回首頁
        </button>

        <h1 style={titleStyle}>老師管理後台</h1>
        <p style={subtitleStyle}>集中管理教材、題庫、預約與學生練習成果。</p>

        <div style={gridStyle}>
          <div style={managementCardStyle} onClick={() => setPage("vocabulary")}>
            <h2 style={cardTitleStyle}>單字管理</h2>
            <p style={cardTextStyle}>新增、修改與刪除泰文單字，作為圖卡內容來源。</p>
          </div>

          <div style={managementCardStyle} onClick={() => setPage("sentences")}>
            <h2 style={cardTitleStyle}>句型管理</h2>
            <p style={cardTextStyle}>維護常用句型、中文意思、拼音與使用提示。</p>
          </div>

          <div style={managementCardStyle} onClick={() => setPage("quizManager")}>
            <h2 style={cardTitleStyle}>測驗題庫</h2>
            <p style={cardTextStyle}>建立選擇題，讓學生能用測驗檢查學習成果。</p>
          </div>

          <div style={managementCardStyle} onClick={() => setPage("learningProgress")}>
            <h2 style={cardTitleStyle}>學習紀錄</h2>
            <p style={cardTextStyle}>查看最近測驗次數、答對題數與作答時間。</p>
          </div>

          <div style={managementCardStyle} onClick={() => setPage("booking")}>
            <h2 style={cardTitleStyle}>課程預約</h2>
            <p style={cardTextStyle}>管理上課時間、學生姓名、課程類型與備註。</p>
          </div>

          <div style={managementCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>AI 教材生成</h2>
            <p style={cardTextStyle}>未來可依主題自動產生單字、例句與測驗草稿。</p>
          </div>
        </div>

        <div style={noteStyle}>
          目前後台先以本機資料保存為主。等教材流程穩定後，再把這些資料接到雲端資料庫與帳號權限。
        </div>
      </main>
    </div>
  );
}
