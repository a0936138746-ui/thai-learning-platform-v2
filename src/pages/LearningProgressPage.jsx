import {
  backButtonStyle,
  pageStyle,
  subtitleStyle,
  tableCardStyle,
  tdStyle,
  thStyle,
  titleStyle,
} from "../styles";

function formatAnsweredAt(answeredAt) {
  if (!answeredAt) {
    return "尚無時間";
  }

  return new Date(answeredAt).toLocaleString("zh-TW");
}

export default function LearningProgressPage({ setPage, learningProgress }) {
  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("teacher")}>
        ← 回老師後台
      </button>

      <h1 style={titleStyle}>學習紀錄</h1>
      <p style={subtitleStyle}>查看學生最近的測驗作答紀錄</p>

      <div style={tableCardStyle}>
        <h2>最近測驗紀錄</h2>

        {learningProgress.length === 0 ? (
          <p style={{ color: "#666" }}>目前尚未有測驗作答紀錄。</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>最近作答時間</th>
                <th style={thStyle}>測驗總題數</th>
                <th style={thStyle}>答對題數</th>
              </tr>
            </thead>
            <tbody>
              {learningProgress.map((record) => (
                <tr key={record.id}>
                  <td style={tdStyle}>{formatAnsweredAt(record.answeredAt)}</td>
                  <td style={tdStyle}>{record.totalQuestions}</td>
                  <td style={tdStyle}>{record.correctAnswers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
