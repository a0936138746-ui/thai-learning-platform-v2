export const pageStyle = {
  minHeight: "100vh",
  background: "#f5f7fb",
  padding: "clamp(18px, 5vw, 40px)",
  fontFamily: "Arial, sans-serif",
  boxSizing: "border-box",
  width: "100%",
  overflowX: "hidden",
};

export const titleStyle = {
  textAlign: "center",
  fontSize: "clamp(30px, 8vw, 42px)",
  lineHeight: 1.2,
  margin: "24px 0 14px",
  overflowWrap: "break-word",
};

export const subtitleStyle = {
  textAlign: "center",
  color: "#666",
  marginBottom: "clamp(24px, 6vw, 40px)",
  lineHeight: 1.6,
  overflowWrap: "break-word",
};

export const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
  gap: "20px",
  width: "100%",
};

export const cardStyle = {
  background: "white",
  padding: "clamp(20px, 5vw, 30px)",
  borderRadius: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  cursor: "pointer",
  textAlign: "center",
  fontSize: "clamp(17px, 4vw, 20px)",
  lineHeight: 1.45,
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  overflowWrap: "break-word",
};

export const teacherPanelStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "24px",
  marginTop: "30px",
};

export const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))",
  gap: "16px",
  alignItems: "end",
};

export const sentenceFormStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
  gap: "16px",
  alignItems: "end",
};

export const labelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: "#333",
  fontWeight: "bold",
};

export const inputStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  fontSize: "16px",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
};

export const textareaStyle = {
  ...inputStyle,
  minHeight: "92px",
  resize: "vertical",
  fontFamily: "Arial, sans-serif",
};

export const sentencePromptStyle = {
  padding: "clamp(18px, 5vw, 28px)",
  borderRadius: "18px",
  background: "#eef7ff",
  fontSize: "clamp(22px, 7vw, 30px)",
  lineHeight: 1.35,
  textAlign: "center",
  marginBottom: "18px",
  overflowWrap: "break-word",
};

export const hintStyle = {
  padding: "12px 16px",
  borderRadius: "12px",
  background: "#fff8e1",
  color: "#795548",
};

export const answerStyle = {
  padding: "clamp(18px, 5vw, 24px)",
  borderRadius: "18px",
  background: "#f1f8e9",
  textAlign: "center",
  lineHeight: 1.45,
  overflowWrap: "break-word",
};

export const dangerButtonStyle = {
  padding: "12px 20px",
  margin: "6px",
  border: "none",
  borderRadius: "12px",
  background: "#f44336",
  color: "white",
  cursor: "pointer",
  maxWidth: "100%",
  whiteSpace: "normal",
};

export const backButtonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "12px",
  background: "#333",
  color: "white",
  cursor: "pointer",
  maxWidth: "100%",
  whiteSpace: "normal",
};

export const tableCardStyle = {
  background: "white",
  padding: "clamp(18px, 5vw, 30px)",
  borderRadius: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  overflowX: "auto",
};

export const thStyle = {
  padding: "clamp(10px, 3vw, 12px)",
  background: "#eef2f7",
  textAlign: "left",
  fontSize: "clamp(14px, 3.5vw, 16px)",
  lineHeight: 1.4,
};

export const tdStyle = {
  padding: "clamp(10px, 3vw, 12px)",
  borderBottom: "1px solid #eee",
  fontSize: "clamp(14px, 3.5vw, 16px)",
  lineHeight: 1.4,
};

export const smallButtonStyle = {
  padding: "12px 20px",
  margin: "6px",
  border: "none",
  borderRadius: "12px",
  background: "#ddd",
  cursor: "pointer",
  maxWidth: "100%",
  whiteSpace: "normal",
};

export const greenButtonStyle = {
  padding: "12px 20px",
  margin: "6px",
  border: "none",
  borderRadius: "12px",
  background: "#4caf50",
  color: "white",
  cursor: "pointer",
  maxWidth: "100%",
  whiteSpace: "normal",
};
