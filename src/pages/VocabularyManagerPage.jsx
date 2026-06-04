import { useState } from "react";
import {
  backButtonStyle,
  dangerButtonStyle,
  formStyle,
  greenButtonStyle,
  inputStyle,
  labelStyle,
  pageStyle,
  smallButtonStyle,
  subtitleStyle,
  tableCardStyle,
  tdStyle,
  teacherPanelStyle,
  thStyle,
  titleStyle,
} from "../styles";

const emptyVocabularyForm = {
  category: "",
  zh: "",
  th: "",
  py: "",
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

export default function VocabularyManagerPage({
  setPage,
  teacherVocabulary,
  setTeacherVocabulary,
}) {
  const [form, setForm] = useState(emptyVocabularyForm);
  const [editingId, setEditingId] = useState(null);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function resetForm() {
    setForm(emptyVocabularyForm);
    setEditingId(null);
  }

  function saveVocabulary(event) {
    event.preventDefault();

    const vocabularyItem = {
      category: form.category.trim() || "未分類",
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
        { id: Date.now().toString(), image: "", audio: "", ...vocabularyItem },
      ]);
    }

    resetForm();
  }

  function editVocabulary(item) {
    setEditingId(item.id);
    setForm({
      category: item.category || "",
      zh: item.zh,
      th: item.th,
      py: item.py || "",
    });
  }

  function deleteVocabulary(id) {
    setTeacherVocabulary(teacherVocabulary.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <div style={pageStyle}>
      <button style={backButtonStyle} onClick={() => setPage("teacher")}>
        回老師後台
      </button>

      <h1 style={titleStyle}>單字管理</h1>
      <p style={subtitleStyle}>維護學生圖卡使用的泰文單字、分類與拼音。</p>

      <div style={teacherPanelStyle}>
        <div style={tableCardStyle}>
          <h2>{editingId ? "編輯單字" : "新增單字"}</h2>
          <p style={helperTextStyle}>
            中文與泰文為必填。分類會出現在學生圖卡的篩選選單。
          </p>

          <form onSubmit={saveVocabulary} style={formStyle}>
            <label style={labelStyle}>
              分類
              <input
                style={inputStyle}
                value={form.category}
                onChange={(event) => updateForm("category", event.target.value)}
                placeholder="例如：問候、餐廳、交通"
              />
            </label>

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
              拼音
              <input
                style={inputStyle}
                value={form.py}
                onChange={(event) => updateForm("py", event.target.value)}
                placeholder="例如：khruu"
              />
            </label>

            <div style={actionRowStyle}>
              <button style={greenButtonStyle} type="submit">
                {editingId ? "儲存修改" : "新增單字"}
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
          <h2>目前單字</h2>

          {teacherVocabulary.length === 0 ? (
            <p style={helperTextStyle}>尚未新增單字。新增後會出現在學生圖卡中。</p>
          ) : (
            <table
              style={{
                width: "100%",
                minWidth: "720px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>分類</th>
                  <th style={thStyle}>中文</th>
                  <th style={thStyle}>泰文</th>
                  <th style={thStyle}>拼音</th>
                  <th style={thStyle}>操作</th>
                </tr>
              </thead>
              <tbody>
                {teacherVocabulary.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.category || "未分類"}</td>
                    <td style={tdStyle}>{item.zh}</td>
                    <td style={tdStyle}>{item.th}</td>
                    <td style={tdStyle}>{item.py || "-"}</td>
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
