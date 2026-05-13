import {
  backButtonStyle,
  pageStyle,
  subtitleStyle,
  tableCardStyle,
  tdStyle,
  thStyle,
  titleStyle,
} from "./styles";

function BookingPage({ setPage }) {
  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("home")}>
        ← 回首頁
      </button>

      <h1 style={titleStyle}>課程預約</h1>
      <p style={subtitleStyle}>查看學生預約與上課進度</p>

      <div style={tableCardStyle}>
        <h2>今日課程</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>時間</th>
              <th style={thStyle}>學生</th>
              <th style={thStyle}>學習方向</th>
              <th style={thStyle}>等級</th>
              <th style={thStyle}>狀態</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>10:00</td>
              <td style={tdStyle}>小明</td>
              <td style={tdStyle}>學泰文</td>
              <td style={tdStyle}>A1</td>
              <td style={tdStyle}>已預約</td>
            </tr>
            <tr>
              <td style={tdStyle}>14:00</td>
              <td style={tdStyle}>Somchai</td>
              <td style={tdStyle}>學中文</td>
              <td style={tdStyle}>A2</td>
              <td style={tdStyle}>已預約</td>
            </tr>
            <tr>
              <td style={tdStyle}>19:30</td>
              <td style={tdStyle}>Amy</td>
              <td style={tdStyle}>學泰文</td>
              <td style={tdStyle}>B1</td>
              <td style={tdStyle}>待上課</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default BookingPage;
