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

export default function QuizPage({ setPage, quizQuestions, onQuizCompleted }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const answeredQuestionsRef = useRef({});
  const hasRecordedCompletionRef = useRef(false);

  if (quizQuestions.length === 0) {
    return (
      <div style={pageStyle}>
        <button style={backButtonStyle} onClick={() => setPage("student")}>
          ← 回學生學習中心
        </button>

        <h1 style={titleStyle}>📝 測驗中心</h1>
        <p style={subtitleStyle}>完成老師出的選擇題，馬上查看答題結果。</p>

        <div style={{ ...tableCardStyle, maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ color: "#666", marginTop: 0 }}>
            目前尚未有測驗題目，請先請老師到測驗題庫新增題目。
          </p>
        </div>
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

  function chooseAnswer(answer) {
    const answerIsCorrect = answer === question.correctAnswer;

    setSelectedAnswer(answer);
    setShowResult(true);

    answeredQuestionsRef.current = {
      ...answeredQuestionsRef.current,
      [question.id || safeQuestionIndex]: answerIsCorrect,
    };

    const answeredCount = Object.keys(answeredQuestionsRef.current).length;

    if (
      !hasRecordedCompletionRef.current &&
      answeredCount === quizQuestions.length
    ) {
      const correctAnswers = Object.values(answeredQuestionsRef.current).filter(
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
      <button style={backButtonStyle} onClick={() => setPage("student")}>
        ← 回學生學習中心
      </button>

      <h1 style={titleStyle}>📝 測驗中心</h1>
      <p style={subtitleStyle}>選擇答案後，會立即顯示答對或答錯。</p>

      <div style={{ ...tableCardStyle, maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ color: "#666", marginTop: 0 }}>
          第 {safeQuestionIndex + 1} 題 / 共 {quizQuestions.length} 題
        </p>

        <div style={sentencePromptStyle}>{question.question}</div>

        <div style={{ display: "grid", gap: "12px" }}>
          {options.map((option) => (
            <button
              key={option.label}
              style={
                selectedAnswer === option.label
                  ? greenButtonStyle
                  : smallButtonStyle
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
              {isCorrect ? "✅ 答對了！" : "❌ 答錯了"}
            </div>
            <p style={hintStyle}>
              正確答案：{correctOption.label}. {correctOption.text}
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "24px",
          }}
        >
          <button style={smallButtonStyle} onClick={prevQuestion}>
            上一題
          </button>
          <button style={greenButtonStyle} onClick={nextQuestion}>
            下一題
          </button>
        </div>
      </div>
    </div>
  );
}
