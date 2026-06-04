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

const learningCardStyle = {
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

const statusStyle = {
  marginTop: "24px",
  padding: "16px",
  borderRadius: "16px",
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  color: "#52616b",
  lineHeight: 1.6,
};

function showComingSoon() {
  alert("這個練習單元還在規劃中。");
}

export default function StudentPage({ setPage }) {
  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("home")}>
          回首頁
        </button>

        <h1 style={titleStyle}>學生學習中心</h1>
        <p style={subtitleStyle}>選擇今天要練習的內容，先用短時間建立穩定複習節奏。</p>

        <div style={gridStyle}>
          <div style={learningCardStyle} onClick={() => setPage("flashcards")}>
            <h2 style={cardTitleStyle}>單字圖卡</h2>
            <p style={cardTextStyle}>依分類瀏覽單字，點擊卡片查看泰文與拼音。</p>
          </div>

          <div style={learningCardStyle} onClick={() => setPage("sentencePractice")}>
            <h2 style={cardTitleStyle}>句型練習</h2>
            <p style={cardTextStyle}>用情境句子熟悉泰文用法與中文意思。</p>
          </div>

          <div style={learningCardStyle} onClick={() => setPage("quiz")}>
            <h2 style={cardTitleStyle}>測驗練習</h2>
            <p style={cardTextStyle}>用選擇題快速檢查記憶，完成後留下練習紀錄。</p>
          </div>

          <div style={learningCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>母音與子音</h2>
            <p style={cardTextStyle}>後續可加入發音表、音節拆解與口說練習。</p>
          </div>

          <div style={learningCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>每日複習</h2>
            <p style={cardTextStyle}>未來可依錯題與複習時間自動安排學習清單。</p>
          </div>

          <div style={learningCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>AI 對話練習</h2>
            <p style={cardTextStyle}>等核心流程穩定後，再加入情境對話與口說回饋。</p>
          </div>
        </div>

        <div style={statusStyle}>
          建議流程：先看單字圖卡，再練句型，最後做測驗。這樣 demo 會像一套完整學習流程，而不是分散工具。
        </div>
      </main>
    </div>
  );
}
