import { useRef, useState } from "react";
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

const quizPanelStyle = {
  ...tableCardStyle,
  maxWidth: "760px",
  margin: "0 auto",
};

const progressStyle = {
  color: "#64748b",
  marginTop: 0,
  lineHeight: 1.5,
};

const optionGridStyle = {
  display: "grid",
  gap: "12px",
};

const optionButtonStyle = {
  ...smallButtonStyle,
  width: "100%",
  textAlign: "left",
  margin: 0,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
};

const selectedOptionStyle = {
  ...optionButtonStyle,
  background: "#e8f5e9",
  border: "1px solid #81c784",
};

const actionRowStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "24px",
};

const emptyPanelStyle = {
  ...quizPanelStyle,
  color: "#52616b",
  lineHeight: 1.7,
};

export default function QuizPage({ setPage, quizQuestions, onQuizCompleted }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const hasRecordedCompletionRef = useRef(false);

  if (quizQuestions.length === 0) {
    return (
      <div style={pageStyle}>
        <main style={shellStyle}>
          <button style={backButtonStyle} onClick={() => setPage("student")}>
            回學生入口
          </button>

          <h1 style={titleStyle}>測驗練習</h1>
          <p style={subtitleStyle}>目前還沒有測驗題目。</p>

          <div style={emptyPanelStyle}>
            請先到老師後台新增題庫，或回首頁重新載入示範資料。
          </div>
        </main>
      </div>
    );
  }

  const safeQuestionIndex = currentQuestion % quizQuestions.length;
  const question = quizQuestions[safeQuestionIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const options = [
    { label: "A", text: question.optionA },
    { label: "B", text: question.optionB },
    { label: "C", text: question.optionC },
  ];
  const correctOption = options.find(
    (option) => option.label === question.correctAnswer
  );
  const answeredCount = Object.keys(answeredQuestions).length;

  function chooseAnswer(answer) {
    const answerIsCorrect = answer === question.correctAnswer;

    setSelectedAnswer(answer);
    setShowResult(true);

    const nextAnsweredQuestions = {
      ...answeredQuestions,
      [question.id || safeQuestionIndex]: answerIsCorrect,
    };

    setAnsweredQuestions(nextAnsweredQuestions);

    const nextAnsweredCount = Object.keys(nextAnsweredQuestions).length;

    if (
      !hasRecordedCompletionRef.current &&
      nextAnsweredCount === quizQuestions.length
    ) {
      const correctAnswers = Object.values(nextAnsweredQuestions).filter(
        Boolean
      ).length;

      onQuizCompleted({
        totalQuestions: quizQuestions.length,
        correctAnswers,
        answeredAt: new Date().toISOString(),
      });
      hasRecordedCompletionRef.current = true;
    }
  }

  function nextQuestion() {
    setCurrentQuestion((currentQuestion + 1) % quizQuestions.length);
    setSelectedAnswer("");
    setShowResult(false);
  }

  function prevQuestion() {
    setCurrentQuestion(
      (currentQuestion - 1 + quizQuestions.length) % quizQuestions.length
    );
    setSelectedAnswer("");
    setShowResult(false);
  }

  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <button style={backButtonStyle} onClick={() => setPage("student")}>
          回學生入口
        </button>

        <h1 style={titleStyle}>測驗練習</h1>
        <p style={subtitleStyle}>選出正確答案，完成全部題目後會留下練習紀錄。</p>

        <div style={quizPanelStyle}>
          <p style={progressStyle}>
            第 {safeQuestionIndex + 1} 題 / 共 {quizQuestions.length} 題，已回答{" "}
            {answeredCount} 題
          </p>

          <div style={sentencePromptStyle}>{question.question}</div>

          <div style={optionGridStyle}>
            {options.map((option) => (
              <button
                key={option.label}
                style={
                  selectedAnswer === option.label
                    ? selectedOptionStyle
                    : optionButtonStyle
                }
                onClick={() => chooseAnswer(option.label)}
              >
                {option.label}. {option.text}
              </button>
            ))}
          </div>

          {showResult && (
            <div style={{ ...answerStyle, marginTop: "24px" }}>
              <div
                style={{
                  fontSize: "clamp(22px, 7vw, 28px)",
                  lineHeight: 1.3,
                  marginBottom: "12px",
                }}
              >
                {isCorrect ? "答對了" : "再練一次"}
              </div>
              <p style={hintStyle}>
                正確答案：{correctOption.label}. {correctOption.text}
              </p>
            </div>
          )}

          <div style={actionRowStyle}>
            <button style={smallButtonStyle} onClick={prevQuestion}>
              上一題
            </button>
            <button style={greenButtonStyle} onClick={nextQuestion}>
              下一題
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
