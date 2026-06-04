import { useMemo, useState } from "react";
import {
  backButtonStyle,
  cardStyle,
  greenButtonStyle,
  pageStyle,
  smallButtonStyle,
  subtitleStyle,
  titleStyle,
} from "../styles";
import { playThaiAudio } from "../speech";

const EMPTY_FLASHCARDS = [];
const UNCATEGORIZED = "未分類";

const shellStyle = {
  maxWidth: "980px",
  margin: "0 auto",
};

const controlRowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
  marginBottom: "20px",
};

const selectLabelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "min(100%, 320px)",
  color: "#334155",
  fontWeight: "bold",
};

const selectStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  background: "white",
  fontSize: "16px",
};

const flashcardStyle = {
  ...cardStyle,
  maxWidth: "540px",
  minHeight: "clamp(380px, 78vw, 500px)",
  margin: "clamp(20px, 6vw, 36px) auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "16px",
  lineHeight: 1.25,
  border: "1px solid #e5e7eb",
};

const categoryBadgeStyle = {
  alignSelf: "flex-start",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "#e8f3ff",
  color: "#155e75",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: 1.2,
};

const imageFrameStyle = {
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
};

const frontTextStyle = {
  width: "100%",
  textAlign: "center",
};

const mainWordStyle = {
  fontSize: "clamp(34px, 10vw, 48px)",
  color: "#111827",
  overflowWrap: "break-word",
};

const helperTextStyle = {
  fontSize: "clamp(16px, 4.5vw, 18px)",
  color: "#64748b",
  marginTop: "12px",
  lineHeight: 1.35,
};

const thaiTextStyle = {
  fontSize: "clamp(32px, 9vw, 46px)",
  color: "#111827",
  overflowWrap: "break-word",
};

const pronunciationStyle = {
  fontSize: "clamp(18px, 5vw, 22px)",
  color: "#52616b",
  marginTop: "12px",
  lineHeight: 1.35,
};

const emptyPanelStyle = {
  ...cardStyle,
  maxWidth: "680px",
  margin: "0 auto",
  cursor: "default",
};

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
        new Set(flashcards.map((card) => card.category || UNCATEGORIZED))
      ),
    [flashcards]
  );
  const activeCategory =
    selectedCategory !== "all" && categories.includes(selectedCategory)
      ? selectedCategory
      : "all";
  const filteredFlashcards = useMemo(() => {
    if (activeCategory === "all") {
      return flashcards;
    }

    const cardsInCategory = flashcards.filter(
      (card) => (card.category || UNCATEGORIZED) === activeCategory
    );

    return cardsInCategory.length > 0 ? cardsInCategory : flashcards;
  }, [activeCategory, flashcards]);

  const hasFilteredCards = filteredFlashcards.length > 0;
  const safeCardIndex = hasFilteredCards
    ? currentCard % filteredFlashcards.length
    : 0;
  const card = hasFilteredCards ? filteredFlashcards[safeCardIndex] : null;
  const categoryLabel = card?.category || UNCATEGORIZED;
  const imageUrl = card?.image?.trim() || "";
  const showImage = imageUrl && failedImageUrl !== imageUrl;

  function nextCard() {
    setCurrentCard((safeCardIndex + 1) % filteredFlashcards.length);
    setFlipped(false);
  }

  function prevCard() {
    setCurrentCard(
      (safeCardIndex - 1 + filteredFlashcards.length) %
        filteredFlashcards.length
    );
    setFlipped(false);
  }

  function changeCategory(event) {
    setSelectedCategory(event.target.value);
    setCurrentCard(0);
    setFlipped(false);
    setFailedImageUrl("");
  }

  if (flashcards.length === 0) {
    return (
      <div style={pageStyle}>
        <main style={shellStyle}>
          <button style={backButtonStyle} onClick={() => setPage("student")}>
            回學生中心
          </button>

          <h1 style={titleStyle}>單字圖卡</h1>
          <p style={subtitleStyle}>目前還沒有單字資料。</p>

          <div style={emptyPanelStyle}>
            請先到老師後台新增單字，或重置 demo 資料後再回來練習。
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("student")}>
          回學生中心
        </button>

        <h1 style={titleStyle}>單字圖卡</h1>
        <p style={subtitleStyle}>先看中文，點擊卡片翻面查看泰文與拼音。</p>

        <div style={controlRowStyle}>
          <label style={selectLabelStyle}>
            練習分類
            <select
              value={activeCategory}
              onChange={changeCategory}
              style={selectStyle}
            >
              <option value="all">全部分類</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={flashcardStyle} onClick={() => setFlipped(!flipped)}>
          <div style={categoryBadgeStyle}>{categoryLabel}</div>

          <div style={imageFrameStyle}>
            {showImage ? (
              <img
                src={imageUrl}
                alt={`${card.zh} 圖卡`}
                onError={() => setFailedImageUrl(imageUrl)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <span>尚未設定圖片</span>
            )}
          </div>

          {flipped ? (
            <div style={frontTextStyle}>
              <div style={thaiTextStyle}>{card.th}</div>
              <div style={pronunciationStyle}>{card.py || "尚未設定拼音"}</div>
            </div>
          ) : (
            <div style={frontTextStyle}>
              <div style={mainWordStyle}>{card.zh}</div>
              <div style={helperTextStyle}>點擊卡片查看泰文</div>
            </div>
          )}
        </div>

        <div style={controlRowStyle}>
          {card?.th && (
            <button
              style={smallButtonStyle}
              onClick={() => playThaiAudio({ audio: card.audio, text: card.th })}
            >
              播放泰文
            </button>
          )}
          <button style={smallButtonStyle} onClick={prevCard}>
            上一張
          </button>

          <button style={greenButtonStyle} onClick={nextCard}>
            下一張
          </button>
        </div>

        <p style={{ textAlign: "center", color: "#64748b", marginTop: "12px" }}>
          {safeCardIndex + 1} / {filteredFlashcards.length}
        </p>
      </main>
    </div>
  );
}
