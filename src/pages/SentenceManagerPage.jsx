import { useState } from "react";
import { backButtonStyle, dangerButtonStyle, greenButtonStyle, inputStyle, labelStyle, pageStyle, sentenceFormStyle, smallButtonStyle, subtitleStyle, tableCardStyle, tdStyle, teacherPanelStyle, textareaStyle, thStyle, titleStyle } from "../styles";

export default function SentenceManagerPage({ setPage, teacherSentences, setTeacherSentences }) {
  const emptyForm = { zh: "", th: "", py: "", note: "" };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function resetForm() {
    setForm(emptyForm);
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
        ← 回老師後台
      </button>

      <h1 style={titleStyle}>句子管理</h1>
      <p style={subtitleStyle}>
        老師新增的句子會自動儲存，並出現在學生的句型練習中。
      </p>

      <div style={teacherPanelStyle}>
        <div style={tableCardStyle}>
          <h2>{editingId ? "編輯句子" : "新增句子"}</h2>

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
              拼音 / 發音
              <input
                style={inputStyle}
                value={form.py}
                onChange={(event) => updateForm("py", event.target.value)}
                placeholder="例如：chăn yàak dùuem náam"
              />
            </label>

            <label style={labelStyle}>
              練習提示
              <input
                style={inputStyle}
                value={form.note}
                onChange={(event) => updateForm("note", event.target.value)}
                placeholder="例如：可替換飲料名稱"
              />
            </label>

            <div style={{ display: "flex", alignItems: "end", gap: "10px" }}>
              <button style={greenButtonStyle} type="submit">
                {editingId ? "儲存修改" : "新增句子"}
              </button>

              {editingId && (
                <button
                  style={smallButtonStyle}
                  type="button"
                  onClick={resetForm}
                >
                  取消
                </button>
              )}
            </div>
          </form>
        </div>

        <div style={tableCardStyle}>
          <h2>老師句子庫</h2>

          {teacherSentences.length === 0 ? (
            <p style={{ color: "#666" }}>
              尚未新增句子，請使用上方表單建立第一個句型練習。
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                    <td style={tdStyle}>{item.py || "—"}</td>
                    <td style={tdStyle}>{item.note || "—"}</td>
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
