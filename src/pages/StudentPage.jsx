import {
  backButtonStyle,
  cardStyle,
  greenButtonStyle,
  pageStyle,
  smallButtonStyle,
  subtitleStyle,
  titleStyle,
} from "../styles";
import {
  collectCourseCategories,
  countItemsByCategory,
  getCourseMeta,
} from "../courseConfig";

const shellStyle = {
  maxWidth: "1080px",
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

const sectionTitleStyle = {
  margin: "26px 0 14px",
  color: "#111827",
};

const chapterGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
  gap: "16px",
  width: "100%",
};

const chapterCardStyle = {
  ...cardStyle,
  minHeight: "230px",
  textAlign: "left",
  border: "1px solid #e5e7eb",
  cursor: "default",
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

const badgeStyle = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: "999px",
  background: "#e8f3ff",
  color: "#155e75",
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const actionRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "18px",
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

const comingSoonGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
  gap: "14px",
  marginTop: "14px",
};

const comingSoonCardStyle = {
  ...cardStyle,
  minHeight: "130px",
  textAlign: "left",
  border: "1px solid #e5e7eb",
};

function showComingSoon() {
  alert("這個功能還在排程中，會等主要學習流程穩定後再加入。");
}

export default function StudentPage({
  setPage,
  setStudyCategory,
  teacherVocabulary,
  teacherSentences,
  quizQuestions,
}) {
  const vocabularyCounts = countItemsByCategory(teacherVocabulary);
  const sentenceCounts = countItemsByCategory(teacherSentences);
  const quizCounts = countItemsByCategory(quizQuestions);
  const courseCategories = collectCourseCategories(
    vocabularyCounts,
    sentenceCounts,
    quizCounts
  );

  function openPractice(nextPage, category) {
    setStudyCategory(category);
    setPage(nextPage);
  }

  function openCourse(category) {
    setStudyCategory(category);
    setPage("course");
  }

  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("home")}>
          回首頁
        </button>

        <h1 style={titleStyle}>學生學習入口</h1>
        <p style={subtitleStyle}>
          按主題照順序練習：先看字卡，再練句型，最後用測驗檢查。
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
        </section>

        <h2 style={sectionTitleStyle}>主題課程</h2>
        <section style={chapterGridStyle}>
          {courseCategories.map((category, index) => (
            <article key={category} style={chapterCardStyle}>
              <span style={badgeStyle}>第 {index + 1} 章</span>
              <h2 style={cardTitleStyle}>{getCourseMeta(category).label}</h2>
              <p style={cardTextStyle}>{getCourseMeta(category).description}</p>
              <p style={{ ...cardTextStyle, marginTop: "10px" }}>
                {vocabularyCounts[category] || 0} 個字卡、{sentenceCounts[category] || 0} 個句型、{quizCounts[category] || 0} 題測驗
              </p>

              <div style={actionRowStyle}>
                <button
                  style={greenButtonStyle}
                  onClick={() => openCourse(category)}
                >
                  進入章節
                </button>
                <button
                  style={smallButtonStyle}
                  onClick={() => openPractice("flashcards", category)}
                >
                  字卡
                </button>
                <button
                  style={smallButtonStyle}
                  onClick={() => openPractice("sentencePractice", category)}
                >
                  句型
                </button>
                <button
                  style={smallButtonStyle}
                  onClick={() => openPractice("quiz", category)}
                >
                  測驗
                </button>
              </div>
            </article>
          ))}
        </section>

        <h2 style={sectionTitleStyle}>後續功能</h2>
        <section style={comingSoonGridStyle}>
          <div style={comingSoonCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>複習清單</h2>
            <p style={cardTextStyle}>之後會把錯題和不熟的單字集中成複習區。</p>
          </div>
          <div style={comingSoonCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>聽力訓練</h2>
            <p style={cardTextStyle}>等音檔補齊後，再加入聽音選字與跟讀練習。</p>
          </div>
          <div style={comingSoonCardStyle} onClick={showComingSoon}>
            <h2 style={cardTitleStyle}>AI 對話練習</h2>
            <p style={cardTextStyle}>後期可加入旅遊、點餐、問路等情境對話。</p>
          </div>
        </section>

        <div style={statusStyle}>
          目前每個主題都能直接進入字卡、句型和測驗。音檔可以等內容穩定後再批次補上。
        </div>
      </main>
    </div>
  );
}
