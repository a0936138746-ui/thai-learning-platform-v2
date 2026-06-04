import { useState } from "react";
import {
  answerStyle,
  backButtonStyle,
  greenButtonStyle,
  hintStyle,
  pageStyle,
  sentencePromptStyle,
  smallButtonStyle,
  subtitleStyle,
  tableCardStyle,
  titleStyle,
} from "../styles";

const shellStyle = {
  maxWidth: "980px",
  margin: "0 auto",
};

const practicePanelStyle = {
  ...tableCardStyle,
  maxWidth: "760px",
  margin: "0 auto",
};

const progressStyle = {
  color: "#64748b",
  marginTop: 0,
  lineHeight: 1.5,
};

const actionRowStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "24px",
};

const emptyPanelStyle = {
  ...practicePanelStyle,
  color: "#52616b",
  lineHeight: 1.7,
};

export default function SentencePracticePage({ setPage, teacherSentences }) {
  const practiceSentences = teacherSentences;
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (practiceSentences.length === 0) {
    return (
      <div style={pageStyle}>
        <main style={shellStyle}>
          <button style={backButtonStyle} onClick={() => setPage("student")}>
            回學生中心
          </button>

          <h1 style={titleStyle}>句型練習</h1>
          <p style={subtitleStyle}>目前還沒有句型資料。</p>

          <div style={emptyPanelStyle}>
            請先到老師後台新增句型，或重置 demo 資料後再回來練習。
          </div>
        </main>
      </div>
    );
  }

  const safeSentenceIndex = currentSentence % practiceSentences.length;
  const sentence = practiceSentences[safeSentenceIndex];

  function nextSentence() {
    setCurrentSentence((currentSentence + 1) % practiceSentences.length);
    setShowAnswer(false);
  }

  function prevSentence() {
    setCurrentSentence(
      (currentSentence - 1 + practiceSentences.length) %
        practiceSentences.length
    );
    setShowAnswer(false);
  }

  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("student")}>
          回學生中心
        </button>

        <h1 style={titleStyle}>句型練習</h1>
        <p style={subtitleStyle}>先理解中文情境，再查看泰文句子與拼音。</p>

        <div style={practicePanelStyle}>
          <p style={progressStyle}>
            第 {safeSentenceIndex + 1} 題 / 共 {practiceSentences.length} 題
          </p>

          <div style={sentencePromptStyle}>{sentence.zh}</div>

          {sentence.note && <p style={hintStyle}>提示：{sentence.note}</p>}

          {showAnswer ? (
            <div style={answerStyle}>
              <div
                style={{
                  fontSize: "clamp(24px, 8vw, 32px)",
                  lineHeight: 1.3,
                  marginBottom: "12px",
                }}
              >
                {sentence.th}
              </div>
              <div style={{ color: "#52616b" }}>
                {sentence.py || "尚未設定拼音"}
              </div>
            </div>
          ) : (
            <button style={greenButtonStyle} onClick={() => setShowAnswer(true)}>
              查看泰文答案
            </button>
          )}

          <div style={actionRowStyle}>
            <button style={smallButtonStyle} onClick={prevSentence}>
              上一句
            </button>
            <button style={greenButtonStyle} onClick={nextSentence}>
              下一句
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
