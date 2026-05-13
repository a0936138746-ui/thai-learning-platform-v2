import { backButtonStyle, cardStyle, gridStyle, pageStyle, subtitleStyle, titleStyle } from "../styles";

export default function StudentPage({ setPage }) {
  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("home")}>
        ← 回首頁
      </button>

      <h1 style={titleStyle}>學生學習中心</h1>
      <p style={subtitleStyle}>選擇今天要練習的內容</p>

      <div style={gridStyle}>
        <div style={cardStyle}>🔤 母音學習</div>
        <div style={cardStyle}>🔠 子音學習</div>
        <div style={cardStyle} onClick={() => setPage("flashcards")}>
          🃏 單字圖卡
        </div>
        <div style={cardStyle} onClick={() => setPage("sentencePractice")}>
          💬 句型練習
        </div>
        <div style={cardStyle}>🎥 AI 動畫課程</div>
        <div style={cardStyle}>📝 測驗中心</div>
      </div>
    </div>
  );
}
