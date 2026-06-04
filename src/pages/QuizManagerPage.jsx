import { useState } from "react";
import {
  backButtonStyle,
  dangerButtonStyle,
  greenButtonStyle,
  inputStyle,
  labelStyle,
  pageStyle,
  sentenceFormStyle,
  smallButtonStyle,
  subtitleStyle,
  tableCardStyle,
  tdStyle,
  teacherPanelStyle,
  textareaStyle,
  thStyle,
  titleStyle,
} from "../styles";

const emptyQuestionForm = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  correctAnswer: "A",
};

const helperTextStyle = {
  color: "#64748b",
  lineHeight: 1.6,
  marginTop: 0,
};

const actionRowStyle = {
  display: "flex",
  alignItems: "end",
  flexWrap: "wrap",
  gap: "10px",
};

export default function QuizManagerPage({
  setPage,
  quizQuestions,
  setQuizQuestions,
}) {
  const [form, setForm] = useState(emptyQuestionForm);
  const [editingId, setEditingId] = useState(null);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function resetForm() {
    setForm(emptyQuestionForm);
    setEditingId(null);
  }

  function saveQuestion(event) {
    event.preventDefault();

    const questionItem = {
      question: form.question.trim(),
      optionA: form.optionA.trim(),
      optionB: form.optionB.trim(),
      optionC: form.optionC.trim(),
      correctAnswer: form.correctAnswer,
    };

    if (
      !questionItem.question ||
      !questionItem.optionA ||
      !questionItem.optionB ||
      !questionItem.optionC
    ) {
      return;
    }

    if (editingId) {
      setQuizQuestions(
        quizQuestions.map((item) =>
          item.id === editingId ? { ...item, ...questionItem } : item
        )
      );
    } else {
      setQuizQuestions([
        ...quizQuestions,
        { id: Date.now().toString(), ...questionItem },
      ]);
    }

    resetForm();
  }

  function editQuestion(item) {
    setEditingId(item.id);
    setForm({
      question: item.question,
      optionA: item.optionA,
      optionB: item.optionB,
      optionC: item.optionC,
      correctAnswer: item.correctAnswer,
    });
  }

  function deleteQuestion(id) {
    setQuizQuestions(quizQuestions.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  }

  function getAnswerText(item) {
    if (item.correctAnswer === "A") {
      return item.optionA;
    }

    if (item.correctAnswer === "B") {
      return item.optionB;
    }

    return item.optionC;
  }

  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("teacher")}>
        回老師後台
      </button>

      <h1 style={titleStyle}>測驗題庫</h1>
      <p style={subtitleStyle}>建立學生測驗使用的選擇題與正確答案。</p>

      <div style={teacherPanelStyle}>
        <div style={tableCardStyle}>
          <h2>{editingId ? "編輯題目" : "新增題目"}</h2>
          <p style={helperTextStyle}>題目與三個選項皆為必填，答案可選 A、B 或 C。</p>

          <form onSubmit={saveQuestion} style={sentenceFormStyle}>
            <label style={labelStyle}>
              題目
              <textarea
                style={textareaStyle}
                value={form.question}
                onChange={(event) => updateForm("question", event.target.value)}
                placeholder="例如：泰文的「你好」怎麼說？"
              />
            </label>

            <label style={labelStyle}>
              正確答案
              <select
                style={inputStyle}
                value={form.correctAnswer}
                onChange={(event) =>
                  updateForm("correctAnswer", event.target.value)
                }
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </label>

            <label style={labelStyle}>
              選項 A
              <input
                style={inputStyle}
                value={form.optionA}
                onChange={(event) => updateForm("optionA", event.target.value)}
                placeholder="例如：สวัสดี"
              />
            </label>

            <label style={labelStyle}>
              選項 B
              <input
                style={inputStyle}
                value={form.optionB}
                onChange={(event) => updateForm("optionB", event.target.value)}
                placeholder="例如：ขอบคุณ"
              />
            </label>

            <label style={labelStyle}>
              選項 C
              <input
                style={inputStyle}
                value={form.optionC}
                onChange={(event) => updateForm("optionC", event.target.value)}
                placeholder="例如：ลาก่อน"
              />
            </label>

            <div style={actionRowStyle}>
              <button style={greenButtonStyle} type="submit">
                {editingId ? "儲存修改" : "新增題目"}
              </button>

              {editingId && (
                <button
                  style={smallButtonStyle}
                  type="button"
                  onClick={resetForm}
                >
                  取消編輯
                </button>
              )}
            </div>
          </form>
        </div>

        <div style={tableCardStyle}>
          <h2>目前題目</h2>

          {quizQuestions.length === 0 ? (
            <p style={helperTextStyle}>尚未新增題目。新增後會出現在學生測驗練習中。</p>
          ) : (
            <table
              style={{
                width: "100%",
                minWidth: "860px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>題目</th>
                  <th style={thStyle}>A</th>
                  <th style={thStyle}>B</th>
                  <th style={thStyle}>C</th>
                  <th style={thStyle}>答案</th>
                  <th style={thStyle}>操作</th>
                </tr>
              </thead>
              <tbody>
                {quizQuestions.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.question}</td>
                    <td style={tdStyle}>{item.optionA}</td>
                    <td style={tdStyle}>{item.optionB}</td>
                    <td style={tdStyle}>{item.optionC}</td>
                    <td style={tdStyle}>
                      {item.correctAnswer}. {getAnswerText(item)}
                    </td>
                    <td style={tdStyle}>
                      <button
                        style={smallButtonStyle}
                        onClick={() => editQuestion(item)}
                      >
                        編輯
                      </button>
                      <button
                        style={dangerButtonStyle}
                        onClick={() => deleteQuestion(item.id)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
