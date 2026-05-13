import { useState } from "react";
import { defaultSentences } from "../data";
import { answerStyle, backButtonStyle, greenButtonStyle, hintStyle, pageStyle, sentencePromptStyle, smallButtonStyle, subtitleStyle, tableCardStyle, titleStyle } from "../styles";

export default function SentencePracticePage({ setPage, teacherSentences }) {
  const practiceSentences = [...defaultSentences, ...teacherSentences];
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const safeSentenceIndex = currentSentence % practiceSentences.length;
  const sentence = practiceSentences[safeSentenceIndex];

  function nextSentence() {
    setCurrentSentence((currentSentence + 1) % practiceSentences.length);
    setShowAnswer(false);
  }

  function prevSentence() {
    setCurrentSentence(
      (currentSentence - 1 + practiceSentences.length) % practiceSentences.length
    );
    setShowAnswer(false);
  }

  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("student")}>
        ← 回學生學習中心
      </button>

      <h1 style={titleStyle}>💬 句型練習</h1>
      <p style={subtitleStyle}>先看中文句子，試著說出泰文，再顯示答案。</p>

      <div style={{ ...tableCardStyle, maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ color: "#666", marginTop: 0 }}>
          第 {safeSentenceIndex + 1} 題 / 共 {practiceSentences.length} 題
        </p>

        <div style={sentencePromptStyle}>{sentence.zh}</div>

        {sentence.note && <p style={hintStyle}>提示：{sentence.note}</p>}

        {showAnswer ? (
          <div style={answerStyle}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>
              {sentence.th}
            </div>
            <div style={{ color: "#666" }}>{sentence.py || "請跟老師練習發音"}</div>
          </div>
        ) : (
          <button style={greenButtonStyle} onClick={() => setShowAnswer(true)}>
            顯示泰文答案
          </button>
        )}

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button style={smallButtonStyle} onClick={prevSentence}>
            上一句
          </button>
          <button style={greenButtonStyle} onClick={nextSentence}>
            下一句
          </button>
        </div>
      </div>
    </div>
  );
}
