import {
  backButtonStyle,
  pageStyle,
  subtitleStyle,
  tableCardStyle,
  tdStyle,
  thStyle,
  titleStyle,
} from "../styles";

const shellStyle = {
  maxWidth: "980px",
  margin: "0 auto",
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
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

const helperTextStyle = {
  color: "#64748b",
  lineHeight: 1.6,
  marginTop: 0,
};

function formatAnsweredAt(answeredAt) {
  if (!answeredAt) {
    return "尚未記錄時間";
  }

  return new Date(answeredAt).toLocaleString("zh-TW");
}

function getAccuracy(record) {
  if (!record.totalQuestions) {
    return "0%";
  }

  return `${Math.round((record.correctAnswers / record.totalQuestions) * 100)}%`;
}

export default function LearningProgressPage({ setPage, learningProgress }) {
  const totalAttempts = learningProgress.length;
  const latestRecord = learningProgress[0];
  const bestAccuracy = learningProgress.reduce((best, record) => {
    if (!record.totalQuestions) {
      return best;
    }

    const accuracy = Math.round(
      (record.correctAnswers / record.totalQuestions) * 100
    );
    return Math.max(best, accuracy);
  }, 0);

  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("teacher")}>
          回老師後台
        </button>

        <h1 style={titleStyle}>學習紀錄</h1>
        <p style={subtitleStyle}>查看學生完成測驗後留下的練習紀錄。</p>

        <section style={summaryGridStyle}>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>測驗次數</div>
            <div style={summaryValueStyle}>{totalAttempts}</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>最佳正確率</div>
            <div style={summaryValueStyle}>{bestAccuracy}%</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>最近練習</div>
            <div style={{ color: "#111827", lineHeight: 1.5 }}>
              {latestRecord ? formatAnsweredAt(latestRecord.answeredAt) : "尚無紀錄"}
            </div>
          </div>
        </section>

        <div style={tableCardStyle}>
          <h2>測驗紀錄</h2>

          {learningProgress.length === 0 ? (
            <p style={helperTextStyle}>
              目前還沒有測驗紀錄。學生完成一次測驗後，這裡會顯示答題時間和正確率。
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                minWidth: "640px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>主題</th>
                  <th style={thStyle}>完成時間</th>
                  <th style={thStyle}>總題數</th>
                  <th style={thStyle}>答對題數</th>
                  <th style={thStyle}>正確率</th>
                </tr>
              </thead>
              <tbody>
                {learningProgress.map((record) => (
                  <tr key={record.id}>
                    <td style={tdStyle}>{record.category || "未分類"}</td>
                    <td style={tdStyle}>{formatAnsweredAt(record.answeredAt)}</td>
                    <td style={tdStyle}>{record.totalQuestions}</td>
                    <td style={tdStyle}>{record.correctAnswers}</td>
                    <td style={tdStyle}>{getAccuracy(record)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
