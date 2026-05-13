import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (page === "student") {
    return <StudentPage setPage={setPage} />;
  }

  if (page === "flashcards") {
  return (
    <FlashcardPage
      setPage={setPage}
      currentCard={currentCard}
      setCurrentCard={setCurrentCard}
      flipped={flipped}
      setFlipped={setFlipped}
    />
  );
}

  if (page === "teacher") {
    return <TeacherPage setPage={setPage} />;
  }

  if (page === "booking") {
    return <BookingPage setPage={setPage} />;
  }

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

function StudentPage({ setPage }) {
  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("home")}>
        ← 回首頁
      </button>

      <h1 style={titleStyle}>學生學習中心</h1>
      <p style={subtitleStyle}>選擇今天要練習的內容</p>

      <div style={gridStyle}>
        <div style={cardStyle}>🔤 母音學習</div>
        <div style={cardStyle}>🔠 子音學習</div>
        <div style={cardStyle} onClick={() => setPage("flashcards")}>
  🃏 單字圖卡
</div>
        <div style={cardStyle}>💬 句型練習</div>
        <div style={cardStyle}>🎥 AI 動畫課程</div>
        <div style={cardStyle}>📝 測驗中心</div>
      </div>
    </div>
  );
}

function FlashcardPage({
  setPage,
  currentCard,
  setCurrentCard,
  flipped,
  setFlipped,
}) {
  const flashcards = [
    { zh: "蘋果", th: "แอปเปิล", py: "aep-bpen" },
    { zh: "水", th: "น้ำ", py: "náam" },
    { zh: "飯", th: "ข้าว", py: "khâao" },
    { zh: "你好", th: "สวัสดี", py: "sà-wàt-dii" },
    { zh: "謝謝", th: "ขอบคุณ", py: "khɔ̀ɔp-khun" },
  ];

  const card = flashcards[currentCard];

  function nextCard() {
    setCurrentCard((currentCard + 1) % flashcards.length);
    setFlipped(false);
  }

  function prevCard() {
    setCurrentCard((currentCard - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  }

  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("student")}>
        ← 回學生學習中心
      </button>

      <h1 style={titleStyle}>🃏 單字圖卡練習</h1>
      <p style={subtitleStyle}>點擊卡片可以翻面</p>

      <div
        style={{
          ...cardStyle,
          maxWidth: "480px",
          minHeight: "260px",
          margin: "40px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "42px",
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {flipped ? (
          <div>
            <div>{card.th}</div>
            <div style={{ fontSize: "22px", color: "#666", marginTop: "12px" }}>
              {card.py}
            </div>
          </div>
        ) : (
          <div>
            <div>{card.zh}</div>
            <div style={{ fontSize: "18px", color: "#888", marginTop: "12px" }}>
              點一下看泰文
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <button style={smallButtonStyle} onClick={prevCard}>
          上一張
        </button>

        <button style={greenButtonStyle} onClick={nextCard}>
          下一張
        </button>
      </div>

      <p style={{ textAlign: "center", color: "#666", marginTop: "20px" }}>
        {currentCard + 1} / {flashcards.length}
      </p>
    </div>
  );
}

function TeacherPage({ setPage }) {
  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("home")}>
        ← 回首頁
      </button>

      <h1 style={titleStyle}>老師後台</h1>
      <p style={subtitleStyle}>教材管理 / 學生管理 / 上課紀錄</p>

      <div style={gridStyle}>
        <div style={cardStyle}>📚 教材管理</div>
        <div style={cardStyle}>➕ 新增教材</div>
        <div style={cardStyle}>👨‍🎓 學生管理</div>
        <div style={cardStyle}>📈 學習進度</div>
        <div style={cardStyle}>📝 測驗題庫</div>
        <div style={cardStyle}>🎥 AI 教材管理</div>
      </div>
    </div>
  );
}

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

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f7fb",
  padding: "40px",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "42px",
};

const subtitleStyle = {
  textAlign: "center",
  color: "#666",
  marginBottom: "40px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  cursor: "pointer",
  textAlign: "center",
  fontSize: "20px",
};

const backButtonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "12px",
  background: "#333",
  color: "white",
  cursor: "pointer",
};

const tableCardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
};

const thStyle = {
  padding: "12px",
  background: "#eef2f7",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const smallButtonStyle = {
  padding: "12px 24px",
  margin: "8px",
  border: "none",
  borderRadius: "12px",
  background: "#ddd",
  cursor: "pointer",
};

const greenButtonStyle = {
  padding: "12px 24px",
  margin: "8px",
  border: "none",
  borderRadius: "12px",
  background: "#4caf50",
  color: "white",
  cursor: "pointer",
};

export default App;