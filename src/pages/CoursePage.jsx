import {
  backButtonStyle,
  cardStyle,
  greenButtonStyle,
  pageStyle,
  smallButtonStyle,
  subtitleStyle,
  titleStyle,
} from "../styles";
import { countItemsByCategory, getCourseMeta } from "../courseConfig";

const shellStyle = {
  maxWidth: "980px",
  margin: "0 auto",
};

const overviewStyle = {
  ...cardStyle,
  cursor: "default",
  textAlign: "left",
  border: "1px solid #e5e7eb",
  marginBottom: "22px",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
  gap: "12px",
  marginTop: "18px",
};

const statBoxStyle = {
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "14px",
};

const statLabelStyle = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "bold",
};

const statValueStyle = {
  color: "#111827",
  fontSize: "clamp(24px, 7vw, 34px)",
  fontWeight: "bold",
  marginTop: "6px",
};

const pathGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
  gap: "16px",
};

const pathCardStyle = {
  ...cardStyle,
  minHeight: "190px",
  textAlign: "left",
  cursor: "default",
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const stepLabelStyle = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: "999px",
  background: "#e8f3ff",
  color: "#155e75",
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const cardTitleStyle = {
  margin: "0 0 10px",
  color: "#111827",
};

const cardTextStyle = {
  color: "#64748b",
  lineHeight: 1.6,
  margin: 0,
  fontSize: "16px",
};

const noteStyle = {
  marginTop: "22px",
  padding: "16px",
  borderRadius: "16px",
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  color: "#52616b",
  lineHeight: 1.6,
};

export default function CoursePage({
  setPage,
  studyCategory,
  teacherVocabulary,
  teacherSentences,
  quizQuestions,
  learningProgress,
}) {
  const course = getCourseMeta(studyCategory);
  const vocabularyCounts = countItemsByCategory(teacherVocabulary);
  const sentenceCounts = countItemsByCategory(teacherSentences);
  const quizCounts = countItemsByCategory(quizQuestions);
  const courseProgress = learningProgress.filter(
    (record) => record.category === course.category
  );
  const vocabularyTotal = vocabularyCounts[course.category] || 0;
  const sentenceTotal = sentenceCounts[course.category] || 0;
  const quizTotal = quizCounts[course.category] || 0;
  const latestProgress = courseProgress[0];
  const bestAccuracy = courseProgress.reduce((best, record) => {
    if (!record.totalQuestions) {
      return best;
    }

    const accuracy = Math.round(
      (record.correctAnswers / record.totalQuestions) * 100
    );
    return Math.max(best, accuracy);
  }, 0);
  const latestPracticeText = latestProgress
    ? new Date(latestProgress.answeredAt).toLocaleString("zh-TW")
    : "尚未測驗";

  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("student")}>
          回主題課程
        </button>

        <h1 style={titleStyle}>{course.label}</h1>
        <p style={subtitleStyle}>{course.description}</p>

        <section style={overviewStyle}>
          <h2 style={cardTitleStyle}>本章內容</h2>
          <p style={cardTextStyle}>
            建議照順序完成：先用字卡建立記憶，再用句型放進情境，最後用測驗檢查。
          </p>

          <div style={statsGridStyle}>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>字卡</div>
              <div style={statValueStyle}>{vocabularyTotal}</div>
            </div>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>句型</div>
              <div style={statValueStyle}>{sentenceTotal}</div>
            </div>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>測驗</div>
              <div style={statValueStyle}>{quizTotal}</div>
            </div>
          </div>
        </section>

        <section style={overviewStyle}>
          <h2 style={cardTitleStyle}>學習進度</h2>
          <p style={cardTextStyle}>
            這裡會記錄本章測驗結果。完成一次測驗後，章節頁會顯示最佳正確率和最近練習時間。
          </p>

          <div style={statsGridStyle}>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>完成測驗</div>
              <div style={statValueStyle}>{courseProgress.length}</div>
            </div>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>最佳正確率</div>
              <div style={statValueStyle}>{bestAccuracy}%</div>
            </div>
            <div style={statBoxStyle}>
              <div style={statLabelStyle}>最近練習</div>
              <div style={{ color: "#111827", lineHeight: 1.5, marginTop: "8px" }}>
                {latestPracticeText}
              </div>
            </div>
          </div>
        </section>

        <section style={pathGridStyle}>
          <article style={pathCardStyle}>
            <div>
              <span style={stepLabelStyle}>Step 1</span>
              <h2 style={cardTitleStyle}>字卡暖身</h2>
              <p style={cardTextStyle}>先熟悉本章單字、圖片、泰文和拼音。</p>
            </div>
            <button style={greenButtonStyle} onClick={() => setPage("flashcards")}>
              開始字卡
            </button>
          </article>

          <article style={pathCardStyle}>
            <div>
              <span style={stepLabelStyle}>Step 2</span>
              <h2 style={cardTitleStyle}>句型練習</h2>
              <p style={cardTextStyle}>把單字放進常用句子，建立實際使用感。</p>
            </div>
            <button
              style={smallButtonStyle}
              onClick={() => setPage("sentencePractice")}
            >
              練習句型
            </button>
          </article>

          <article style={pathCardStyle}>
            <div>
              <span style={stepLabelStyle}>Step 3</span>
              <h2 style={cardTitleStyle}>測驗確認</h2>
              <p style={cardTextStyle}>用選擇題確認記憶，完成後留下練習紀錄。</p>
            </div>
            <button style={smallButtonStyle} onClick={() => setPage("quiz")}>
              進入測驗
            </button>
          </article>
        </section>

        <div style={noteStyle}>
          這一頁先整理學習動線。之後可以在這裡加入完成進度、錯題複習和章節鎖定。
        </div>
      </main>
    </div>
  );
}
