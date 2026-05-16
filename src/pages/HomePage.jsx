import { cardStyle, pageStyle, subtitleStyle, titleStyle } from "../styles";

const homeGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  maxWidth: "980px",
  margin: "0 auto",
};

const introStyle = {
  maxWidth: "760px",
  margin: "0 auto 32px",
  padding: "24px",
  borderRadius: "18px",
  background: "white",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  textAlign: "left",
  color: "#333",
  lineHeight: 1.7,
};

const introListStyle = {
  margin: "16px 0 0",
  paddingLeft: "20px",
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

export default function HomePage({ setPage }) {
  return (
    <div style={pageStyle}>
      <div style={{ textAlign: "center" }}>
        <span style={demoBadgeStyle}>Demo 版</span>
      </div>

      <h1 style={titleStyle}>泰文／中文學習平台 MVP</h1>
      <p style={subtitleStyle}>
        老師可以建立教材，學生可用手機練習單字、句型與測驗，系統可記錄學習成果與課程預約。
      </p>

      <section style={introStyle}>
        <p>
          這是一個原型展示版本，聚焦在教材管理、學生練習、學習紀錄與課程預約的核心流程。
        </p>
        <ul style={introListStyle}>
          <li>老師可管理單字、句型與測驗題庫。</li>
          <li>學生可進入學習中心練習單字、句型與測驗。</li>
          <li>老師可查看學習紀錄與所有課程預約。</li>
        </ul>
      </section>

      <div style={homeGridStyle}>
        <div style={cardStyle} onClick={() => setPage("student")}>
          <h2>我要學習</h2>
          <p>練習單字圖卡、句型與測驗。</p>
        </div>

        <div style={cardStyle} onClick={() => setPage("teacher")}>
          <h2>老師管理教材</h2>
          <p>管理教材、測驗、學習紀錄與預約。</p>
        </div>

        <div style={cardStyle} onClick={() => setPage("booking")}>
          <h2>預約課程</h2>
          <p>新增、查看與刪除學生預約資料。</p>
        </div>
      </div>
    </div>
  );
}
