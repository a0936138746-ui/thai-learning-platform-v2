import { useState } from "react";
import { backButtonStyle, cardStyle, dangerButtonStyle, formStyle, greenButtonStyle, gridStyle, inputStyle, labelStyle, pageStyle, smallButtonStyle, subtitleStyle, tableCardStyle, tdStyle, teacherPanelStyle, thStyle, titleStyle } from "../styles";

export default function TeacherPage({ setPage, teacherVocabulary, setTeacherVocabulary }) {
  const emptyForm = { zh: "", th: "", py: "" };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function saveVocabulary(event) {
    event.preventDefault();

    const vocabularyItem = {
      zh: form.zh.trim(),
      th: form.th.trim(),
      py: form.py.trim(),
    };

    if (!vocabularyItem.zh || !vocabularyItem.th) {
      return;
    }

    if (editingId) {
      setTeacherVocabulary(
        teacherVocabulary.map((item) =>
          item.id === editingId ? { ...item, ...vocabularyItem } : item
        )
      );
    } else {
      setTeacherVocabulary([
        ...teacherVocabulary,
        { id: Date.now().toString(), ...vocabularyItem },
      ]);
    }

    resetForm();
  }

  function editVocabulary(item) {
    setEditingId(item.id);
    setForm({ zh: item.zh, th: item.th, py: item.py });
  }

  function deleteVocabulary(id) {
    setTeacherVocabulary(teacherVocabulary.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("home")}>
        ← 回首頁
      </button>

      <h1 style={titleStyle}>老師後台</h1>
      <p style={subtitleStyle}>教材管理 / 學生管理 / 上課紀錄</p>

      <div style={gridStyle}>
        <div style={cardStyle}>📚 教材管理</div>
        <div style={cardStyle} onClick={() => setPage("vocabulary")}>
          ➕ 新增單字
        </div>
        <div style={cardStyle} onClick={() => setPage("sentences")}>
          💬 句子管理
        </div>
        <div style={cardStyle}>👨‍🎓 學生管理</div>
        <div style={cardStyle}>📈 學習進度</div>
        <div style={cardStyle} onClick={() => setPage("quizManager")}>
          📝 測驗題庫
        </div>
        <div style={cardStyle}>🎥 AI 教材管理</div>
      </div>

      <div style={teacherPanelStyle}>
        <div style={tableCardStyle}>
          <h2>單字管理</h2>
          <p style={{ color: "#666" }}>
            老師新增的單字會自動儲存，並出現在學生的單字圖卡中。
          </p>

          <form onSubmit={saveVocabulary} style={formStyle}>
            <label style={labelStyle}>
              中文
              <input
                style={inputStyle}
                value={form.zh}
                onChange={(event) => updateForm("zh", event.target.value)}
                placeholder="例如：老師"
              />
            </label>

            <label style={labelStyle}>
              泰文
              <input
                style={inputStyle}
                value={form.th}
                onChange={(event) => updateForm("th", event.target.value)}
                placeholder="例如：ครู"
              />
            </label>

            <label style={labelStyle}>
              拼音 / 發音
              <input
                style={inputStyle}
                value={form.py}
                onChange={(event) => updateForm("py", event.target.value)}
                placeholder="例如：khruu"
              />
            </label>

            <div style={{ display: "flex", alignItems: "end", gap: "10px" }}>
              <button style={greenButtonStyle} type="submit">
                {editingId ? "儲存修改" : "新增單字"}
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
          <h2>老師單字庫</h2>

          {teacherVocabulary.length === 0 ? (
            <p style={{ color: "#666" }}>
              尚未新增單字，請使用上方表單建立第一張圖卡。
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>中文</th>
                  <th style={thStyle}>泰文</th>
                  <th style={thStyle}>拼音</th>
                  <th style={thStyle}>操作</th>
                </tr>
              </thead>
              <tbody>
                {teacherVocabulary.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.zh}</td>
                    <td style={tdStyle}>{item.th}</td>
                    <td style={tdStyle}>{item.py || "—"}</td>
                    <td style={tdStyle}>
                      <button
                        style={smallButtonStyle}
                        onClick={() => editVocabulary(item)}
                      >
                        編輯
                      </button>
                      <button
                        style={dangerButtonStyle}
                        onClick={() => deleteVocabulary(item.id)}
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
