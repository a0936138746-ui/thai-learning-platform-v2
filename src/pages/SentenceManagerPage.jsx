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

const emptySentenceForm = {
  zh: "",
  th: "",
  py: "",
  note: "",
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

export default function SentenceManagerPage({
  setPage,
  teacherSentences,
  setTeacherSentences,
}) {
  const [form, setForm] = useState(emptySentenceForm);
  const [editingId, setEditingId] = useState(null);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function resetForm() {
    setForm(emptySentenceForm);
    setEditingId(null);
  }

  function saveSentence(event) {
    event.preventDefault();

    const sentenceItem = {
      zh: form.zh.trim(),
      th: form.th.trim(),
      py: form.py.trim(),
      note: form.note.trim(),
    };

    if (!sentenceItem.zh || !sentenceItem.th) {
      return;
    }

    if (editingId) {
      setTeacherSentences(
        teacherSentences.map((item) =>
          item.id === editingId ? { ...item, ...sentenceItem } : item
        )
      );
    } else {
      setTeacherSentences([
        ...teacherSentences,
        { id: Date.now().toString(), ...sentenceItem },
      ]);
    }

    resetForm();
  }

  function editSentence(item) {
    setEditingId(item.id);
    setForm({
      zh: item.zh,
      th: item.th,
      py: item.py || "",
      note: item.note || "",
    });
  }

  function deleteSentence(id) {
    setTeacherSentences(teacherSentences.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("teacher")}>
        回老師後台
      </button>

      <h1 style={titleStyle}>句型管理</h1>
      <p style={subtitleStyle}>維護學生句型練習使用的中文情境、泰文句子與提示。</p>

      <div style={teacherPanelStyle}>
        <div style={tableCardStyle}>
          <h2>{editingId ? "編輯句型" : "新增句型"}</h2>
          <p style={helperTextStyle}>中文句子與泰文句子為必填，提示可補充使用情境。</p>

          <form onSubmit={saveSentence} style={sentenceFormStyle}>
            <label style={labelStyle}>
              中文句子
              <textarea
                style={textareaStyle}
                value={form.zh}
                onChange={(event) => updateForm("zh", event.target.value)}
                placeholder="例如：我想喝水。"
              />
            </label>

            <label style={labelStyle}>
              泰文句子
              <textarea
                style={textareaStyle}
                value={form.th}
                onChange={(event) => updateForm("th", event.target.value)}
                placeholder="例如：ฉันอยากดื่มน้ำ"
              />
            </label>

            <label style={labelStyle}>
              拼音
              <input
                style={inputStyle}
                value={form.py}
                onChange={(event) => updateForm("py", event.target.value)}
                placeholder="例如：chǎn yàak dʉ̀ʉm náam"
              />
            </label>

            <label style={labelStyle}>
              提示
              <input
                style={inputStyle}
                value={form.note}
                onChange={(event) => updateForm("note", event.target.value)}
                placeholder="例如：在餐廳點飲料時使用"
              />
            </label>

            <div style={actionRowStyle}>
              <button style={greenButtonStyle} type="submit">
                {editingId ? "儲存修改" : "新增句型"}
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
          <h2>目前句型</h2>

          {teacherSentences.length === 0 ? (
            <p style={helperTextStyle}>尚未新增句型。新增後會出現在學生句型練習中。</p>
          ) : (
            <table
              style={{
                width: "100%",
                minWidth: "820px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>中文</th>
                  <th style={thStyle}>泰文</th>
                  <th style={thStyle}>拼音</th>
                  <th style={thStyle}>提示</th>
                  <th style={thStyle}>操作</th>
                </tr>
              </thead>
              <tbody>
                {teacherSentences.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.zh}</td>
                    <td style={tdStyle}>{item.th}</td>
                    <td style={tdStyle}>{item.py || "-"}</td>
                    <td style={tdStyle}>{item.note || "-"}</td>
                    <td style={tdStyle}>
                      <button
                        style={smallButtonStyle}
                        onClick={() => editSentence(item)}
                      >
                        編輯
                      </button>
                      <button
                        style={dangerButtonStyle}
                        onClick={() => deleteSentence(item.id)}
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
