import { useMemo, useState } from "react";
import { backButtonStyle, cardStyle, greenButtonStyle, pageStyle, smallButtonStyle, subtitleStyle, titleStyle } from "../styles";

const EMPTY_FLASHCARDS = [];

export default function FlashcardPage({
  setPage,
  currentCard,
  setCurrentCard,
  flipped,
  setFlipped,
  teacherVocabulary,
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [failedImageUrl, setFailedImageUrl] = useState("");
  const flashcards = teacherVocabulary ?? EMPTY_FLASHCARDS;
  const categories = useMemo(
    () =>
      Array.from(
        new Set(flashcards.map((card) => card.category || "未分類"))
      ),
    [flashcards]
  );
  const activeCategory =
    selectedCategory !== "all" && categories.includes(selectedCategory)
      ? selectedCategory
      : "all";
  const filteredFlashcards = useMemo(
    () => {
      if (activeCategory === "all") {
        return flashcards;
      }

      const cardsInCategory = flashcards.filter(
        (card) => (card.category || "未分類") === activeCategory
      );

      return cardsInCategory.length > 0 ? cardsInCategory : flashcards;
    },
    [activeCategory, flashcards]
  );

  const hasFilteredCards = filteredFlashcards.length > 0;
  const safeCardIndex = hasFilteredCards ? currentCard % filteredFlashcards.length : 0;
  const card = hasFilteredCards ? filteredFlashcards[safeCardIndex] : null;
  const categoryLabel = card?.category || "未分類";
  const imageUrl = card?.image?.trim() || "";
  const showImage = imageUrl && failedImageUrl !== imageUrl;

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

  function nextCard() {
    setCurrentCard((safeCardIndex + 1) % filteredFlashcards.length);
    setFlipped(false);
  }

  function prevCard() {
    setCurrentCard((safeCardIndex - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    setFlipped(false);
  }

  function changeCategory(event) {
    setSelectedCategory(event.target.value);
    setCurrentCard(0);
    setFlipped(false);
  }

  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("student")}>
        ← 回學生學習中心
      </button>

      <h1 style={titleStyle}>🃏 單字圖卡練習</h1>
      <p style={subtitleStyle}>點擊卡片可以翻面</p>

      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "min(100%, 320px)",
          margin: "0 auto",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        分類篩選
        <select
          value={activeCategory}
          onChange={changeCategory}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            background: "white",
            fontSize: "16px",
          }}
        >
          <option value="all">全部分類</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <div
        style={{
          ...cardStyle,
          maxWidth: "520px",
          width: "100%",
          minHeight: "clamp(360px, 78vw, 460px)",
          margin: "clamp(24px, 7vw, 40px) auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
          fontSize: "clamp(28px, 10vw, 40px)",
          lineHeight: 1.25,
        }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          style={{
            alignSelf: "flex-start",
            padding: "6px 12px",
            borderRadius: "999px",
            background: "#eef2f7",
            color: "#475569",
            fontSize: "14px",
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        >
          {categoryLabel}
        </div>

        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "16px",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94a3b8",
            fontSize: "clamp(15px, 4vw, 18px)",
            fontWeight: "bold",
          }}
        >
          {showImage ? (
            <img
              src={imageUrl}
              alt={`${card.zh} 圖片`}
              onError={() => setFailedImageUrl(imageUrl)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <span>圖片待補</span>
          )}
        </div>

        {flipped ? (
          <div style={{ width: "100%" }}>
            <div>{card.th}</div>
            <div
              style={{
                fontSize: "clamp(18px, 5vw, 22px)",
                color: "#666",
                marginTop: "12px",
                lineHeight: 1.35,
              }}
            >
              {card.py}
            </div>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <div>{card.zh}</div>
            <div
              style={{
                fontSize: "clamp(16px, 4.5vw, 18px)",
                color: "#888",
                marginTop: "12px",
                lineHeight: 1.35,
              }}
            >
              點一下看泰文
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <button style={smallButtonStyle} onClick={prevCard}>
          上一張
        </button>

        <button style={greenButtonStyle} onClick={nextCard}>
          下一張
        </button>
      </div>

      <p style={{ textAlign: "center", color: "#666", marginTop: "20px" }}>
        {safeCardIndex + 1} / {filteredFlashcards.length}
      </p>
    </div>
  );
}
