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
  alert("這個功能還在排程中，會等主要學習流程穩定後再加入。");
}

export default function StudentPage({ setPage }) {
  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("home")}>
          回首頁
        </button>

        <h1 style={titleStyle}>學生學習入口</h1>
        <p style={subtitleStyle}>
          先從最重要的三個練習開始：字卡、句型、測驗。
        </p>

        <div style={gridStyle}>
          <div style={learningCardStyle} onClick={() => setPage("flashcards")}>
            <h2 style={cardTitleStyle}>字卡練習</h2>
            <p style={cardTextStyle}>依主題瀏覽單字，看中文、翻泰文、練發音。</p>
          </div>

          <div style={learningCardStyle} onClick={() => setPage("sentencePractice")}>
            <h2 style={cardTitleStyle}>句型練習</h2>
            <p style={cardTextStyle}>用常用中文句子反查泰文，建立實用表達。</p>
          </div>

          <div style={learningCardStyle} onClick={() => setPage("quiz")}>
            <h2 style={cardTitleStyle}>測驗練習</h2>
            <p style={cardTextStyle}>用選擇題檢查記憶，完成後會留下練習紀錄。</p>
          </div>

          <div style={learningCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>複習清單</h2>
            <p style={cardTextStyle}>之後會把錯題和不熟的單字集中成複習區。</p>
          </div>

          <div style={learningCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>聽力訓練</h2>
            <p style={cardTextStyle}>等音檔補齊後，再加入聽音選字與跟讀練習。</p>
          </div>

          <div style={learningCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>AI 對話練習</h2>
            <p style={cardTextStyle}>後期可加入旅遊、點餐、問路等情境對話。</p>
          </div>
        </div>

        <div style={statusStyle}>
          目前建議先把三個核心練習做順，再逐步補圖片、音檔、進度統計和登入資料庫。
        </div>
      </main>
    </div>
  );
}
