import { cardStyle, gridStyle, pageStyle, subtitleStyle, titleStyle } from "./styles";

function HomePage({ setPage }) {
  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Thai Learning Platform v2</h1>
      <p style={subtitleStyle}>台灣學生學泰文 / 泰國學生學中文</p>

      <div style={gridStyle}>
        <div style={cardStyle} onClick={() => setPage("student")}>
          <h2>學生學習中心</h2>
          <p>單字圖卡 / 測驗 / AI課程</p>
        </div>

        <div style={cardStyle} onClick={() => setPage("teacher")}>
          <h2>老師後台</h2>
          <p>教材管理 / 學生管理</p>
        </div>

        <div style={cardStyle} onClick={() => setPage("booking")}>
          <h2>課程預約</h2>
          <p>安排學生上課時間</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
