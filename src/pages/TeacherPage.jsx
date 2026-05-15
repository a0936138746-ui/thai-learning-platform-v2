import {
  backButtonStyle,
  cardStyle,
  gridStyle,
  pageStyle,
  subtitleStyle,
  titleStyle,
} from "../styles";

export default function TeacherPage({ setPage }) {
  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("home")}>
        ← 回首頁
      </button>

      <h1 style={titleStyle}>老師後台</h1>
      <p style={subtitleStyle}>教材管理 / 學生管理 / 上課紀錄</p>

      <div style={gridStyle}>
        <div style={cardStyle}>📚 教材管理</div>
        <div style={cardStyle} onClick={() => setPage("vocabulary")}>
          🃏 單字管理
        </div>
        <div style={cardStyle} onClick={() => setPage("sentences")}>
          💬 句型管理
        </div>
        <div style={cardStyle}>🎥 AI 教材管理</div>
        <div style={cardStyle} onClick={() => setPage("learningProgress")}>
          📈 學習紀錄
        </div>
        <div style={cardStyle} onClick={() => setPage("quizManager")}>
          📝 測驗題庫
        </div>
        <div style={cardStyle}>🤖 AI 教材生成</div>
      </div>
    </div>
  );
}
