import { cardStyle, pageStyle, subtitleStyle, titleStyle } from "../styles";

const heroStyle = {
  maxWidth: "980px",
  margin: "0 auto 28px",
  textAlign: "center",
};

const demoBadgeStyle = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "#fff8e1",
  color: "#795548",
  fontWeight: "bold",
  marginBottom: "16px",
};

const heroTextStyle = {
  maxWidth: "780px",
  margin: "0 auto",
  color: "#555",
  fontSize: "clamp(16px, 4vw, 18px)",
  lineHeight: 1.7,
  overflowWrap: "break-word",
};

const homeTitleStyle = {
  ...titleStyle,
  fontSize: "clamp(30px, 8vw, 42px)",
  lineHeight: 1.2,
  overflowWrap: "break-word",
};

const entranceGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))",
  gap: "18px",
  maxWidth: "980px",
  margin: "0 auto 32px",
};

const sectionStyle = {
  maxWidth: "980px",
  margin: "0 auto 28px",
};

const sectionHeaderStyle = {
  marginBottom: "14px",
  color: "#111",
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
  gap: "16px",
};

const infoCardStyle = {
  background: "white",
  padding: "22px",
  borderRadius: "18px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
  textAlign: "left",
  lineHeight: 1.6,
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  overflowWrap: "break-word",
};

const mutedTextStyle = {
  color: "#666",
  marginTop: "8px",
};

const roadmapStyle = {
  ...infoCardStyle,
  borderLeft: "5px solid #4caf50",
};

export default function HomePage({ setPage }) {
  return (
    <div style={pageStyle}>
      <section style={heroStyle}>
        <span style={demoBadgeStyle}>Demo 版</span>
        <h1 style={homeTitleStyle}>泰文／中文學習平台 MVP</h1>
        <p style={subtitleStyle}>
          老師可以建立教材，學生可用手機練習單字、句型與測驗，系統可記錄學習成果與課程預約。
        </p>
        <p style={heroTextStyle}>
          這是一個展示用原型，聚焦在語言教學最常見的三件事：老師快速建立內容、學生能反覆練習、管理端能看到學習與預約狀態。
        </p>
      </section>

      <div style={entranceGridStyle}>
        <div style={cardStyle} onClick={() => setPage("student")}>
          <h2>我要學習</h2>
          <p>進入學生學習中心，練習單字圖卡、句型與測驗。</p>
        </div>

        <div style={cardStyle} onClick={() => setPage("teacher")}>
          <h2>老師管理教材</h2>
          <p>管理單字、句型、測驗題庫、學習紀錄與預約。</p>
        </div>

        <div style={cardStyle} onClick={() => setPage("booking")}>
          <h2>預約課程</h2>
          <p>新增、查看與刪除學生課程預約資料。</p>
        </div>
      </div>

      <section style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>平台特色</h2>
        <div style={infoGridStyle}>
          <div style={infoCardStyle}>
            <h3>教材建立</h3>
            <p style={mutedTextStyle}>老師可建立單字、句型與測驗題，快速整理課堂內容。</p>
          </div>
          <div style={infoCardStyle}>
            <h3>手機練習</h3>
            <p style={mutedTextStyle}>學生可用手機進入學習中心，反覆練習核心內容。</p>
          </div>
          <div style={infoCardStyle}>
            <h3>學習紀錄</h3>
            <p style={mutedTextStyle}>系統可保存測驗結果，讓老師了解最近練習狀況。</p>
          </div>
          <div style={infoCardStyle}>
            <h3>課程預約</h3>
            <p style={mutedTextStyle}>預約資料集中管理，方便查看學生上課安排。</p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>適用對象</h2>
        <div style={infoGridStyle}>
          <div style={infoCardStyle}>
            <h3>語言老師</h3>
            <p style={mutedTextStyle}>適合整理教材、建立題庫，並追蹤學生練習成果。</p>
          </div>
          <div style={infoCardStyle}>
            <h3>補習班</h3>
            <p style={mutedTextStyle}>可作為課後練習與預約管理的輕量工具原型。</p>
          </div>
          <div style={infoCardStyle}>
            <h3>學生自學</h3>
            <p style={mutedTextStyle}>適合用碎片時間複習單字、句型與基礎測驗。</p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>後續升級方向</h2>
        <div style={infoGridStyle}>
          <div style={roadmapStyle}>
            <h3>帳號登入</h3>
            <p style={mutedTextStyle}>區分老師、學生與班級資料。</p>
          </div>
          <div style={roadmapStyle}>
            <h3>雲端資料庫</h3>
            <p style={mutedTextStyle}>將 localStorage 升級成可多人共用的雲端資料。</p>
          </div>
          <div style={roadmapStyle}>
            <h3>AI 教材生成</h3>
            <p style={mutedTextStyle}>協助老師快速產生單字、句型、測驗與練習素材。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
