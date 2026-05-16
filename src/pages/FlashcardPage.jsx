import { useEffect } from "react";
import { backButtonStyle, cardStyle, greenButtonStyle, pageStyle, smallButtonStyle, subtitleStyle, titleStyle } from "../styles";

export default function FlashcardPage({
  setPage,
  currentCard,
  setCurrentCard,
  flipped,
  setFlipped,
  teacherVocabulary,
}) {
  const flashcards = teacherVocabulary;

  useEffect(() => {
    if (flashcards.length > 0 && currentCard >= flashcards.length) {
      setCurrentCard(0);
      setFlipped(false);
    }
  }, [currentCard, flashcards.length, setCurrentCard, setFlipped]);

  if (flashcards.length === 0) {
    return (
      <div style={pageStyle}>
        <button style={backButtonStyle} onClick={() => setPage("student")}>
          ← 回學生學習中心
        </button>

        <h1 style={titleStyle}>🃏 單字圖卡練習</h1>
        <p style={subtitleStyle}>目前尚未有單字資料，請先到老師後台新增單字。</p>
      </div>
    );
  }

  const safeCardIndex = currentCard % flashcards.length;
  const card = flashcards[safeCardIndex];

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
        {safeCardIndex + 1} / {flashcards.length}
      </p>
    </div>
  );
}
