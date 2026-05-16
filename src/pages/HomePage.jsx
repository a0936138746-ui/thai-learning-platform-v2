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

export default function HomePage({ setPage }) {
  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>泰文／中文學習平台 MVP</h1>
      <p style={subtitleStyle}>
        給老師建立教材、學生練習內容，並追蹤學習與預約狀態的 demo 版本。
      </p>

      <section style={introStyle}>
        <p>
          這個平台適合老師建立雙語教材，學生可以練習單字圖卡、句型與測驗，
          老師也可以查看學生最近的學習紀錄與課程預約。
        </p>
        <ul style={introListStyle}>
          <li>老師可管理單字、句型與測驗題庫。</li>
          <li>學生可進入學習中心練習單字、句型與測驗。</li>
          <li>老師可查看學習紀錄與所有課程預約。</li>
        </ul>
      </section>

      <div style={homeGridStyle}>
        <div style={cardStyle} onClick={() => setPage("student")}>
          <h2>學生學習中心</h2>
          <p>練習單字圖卡、句型與測驗。</p>
        </div>

        <div style={cardStyle} onClick={() => setPage("teacher")}>
          <h2>老師後台管理</h2>
          <p>管理教材、測驗、學習紀錄與預約。</p>
        </div>

        <div style={cardStyle} onClick={() => setPage("booking")}>
          <h2>課程預約</h2>
          <p>新增、查看與刪除學生預約資料。</p>
        </div>
      </div>
    </div>
  );
}
