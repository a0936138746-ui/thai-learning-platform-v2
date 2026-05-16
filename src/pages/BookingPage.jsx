import { useEffect, useState } from "react";
import { BOOKING_STORAGE_KEY } from "../data";
import {
  backButtonStyle,
  dangerButtonStyle,
  greenButtonStyle,
  inputStyle,
  labelStyle,
  pageStyle,
  smallButtonStyle,
  subtitleStyle,
  tableCardStyle,
  tdStyle,
  textareaStyle,
  thStyle,
  titleStyle,
} from "../styles";

const emptyBookingForm = {
  studentName: "",
  courseType: "",
  date: "",
  time: "",
  note: "",
};

function loadStoredBookings() {
  try {
    const savedBookings = localStorage.getItem(BOOKING_STORAGE_KEY);
    if (!savedBookings) {
      return [];
    }

    const parsedBookings = JSON.parse(savedBookings);
    return Array.isArray(parsedBookings) ? parsedBookings : [];
  } catch {
    return [];
  }
}

export default function BookingPage({ setPage }) {
  const [bookings, setBookings] = useState(loadStoredBookings);
  const [form, setForm] = useState(emptyBookingForm);

  useEffect(() => {
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function saveBooking(event) {
    event.preventDefault();

    const bookingItem = {
      studentName: form.studentName.trim(),
      courseType: form.courseType.trim(),
      date: form.date,
      time: form.time,
      note: form.note.trim(),
    };

    if (
      !bookingItem.studentName ||
      !bookingItem.courseType ||
      !bookingItem.date ||
      !bookingItem.time
    ) {
      return;
    }

    setBookings([
      ...bookings,
      { id: Date.now().toString(), ...bookingItem },
    ]);
    setForm(emptyBookingForm);
  }

  function deleteBooking(id) {
    setBookings(bookings.filter((booking) => booking.id !== id));
  }

  return (
    <div style={pageStyle}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button style={backButtonStyle} onClick={() => setPage("home")}>
          ← 回首頁
        </button>
        <button style={smallButtonStyle} onClick={() => setPage("teacher")}>
          ← 回老師後台
        </button>
      </div>

      <h1 style={titleStyle}>課程預約</h1>
      <p style={subtitleStyle}>新增與查看學生預約資料</p>

      <div style={tableCardStyle}>
        <h2>新增預約</h2>

        <form
          onSubmit={saveBooking}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: "16px",
            alignItems: "end",
          }}
        >
          <label style={labelStyle}>
            學生姓名
            <input
              style={inputStyle}
              value={form.studentName}
              onChange={(event) => updateForm("studentName", event.target.value)}
              placeholder="例如：小明"
            />
          </label>

          <label style={labelStyle}>
            課程類型
            <input
              style={inputStyle}
              value={form.courseType}
              onChange={(event) => updateForm("courseType", event.target.value)}
              placeholder="例如：泰文會話"
            />
          </label>

          <label style={labelStyle}>
            日期
            <input
              style={inputStyle}
              type="date"
              value={form.date}
              onChange={(event) => updateForm("date", event.target.value)}
            />
          </label>

          <label style={labelStyle}>
            時間
            <input
              style={inputStyle}
              type="time"
              value={form.time}
              onChange={(event) => updateForm("time", event.target.value)}
            />
          </label>

          <label style={{ ...labelStyle, gridColumn: "1 / -1" }}>
            備註
            <textarea
              style={textareaStyle}
              value={form.note}
              onChange={(event) => updateForm("note", event.target.value)}
              placeholder="例如：學生想加強發音"
            />
          </label>

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <button style={greenButtonStyle} type="submit">
              新增預約
            </button>
            <button
              style={smallButtonStyle}
              type="button"
              onClick={() => setForm(emptyBookingForm)}
            >
              清空
            </button>
          </div>
        </form>
      </div>

      <div style={{ ...tableCardStyle, marginTop: "24px" }}>
        <h2>所有預約</h2>

        {bookings.length === 0 ? (
          <p style={{ color: "#666" }}>目前尚未有預約資料。</p>
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
                <th style={thStyle}>日期</th>
                <th style={thStyle}>時間</th>
                <th style={thStyle}>學生姓名</th>
                <th style={thStyle}>課程類型</th>
                <th style={thStyle}>備註</th>
                <th style={thStyle}>操作</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={tdStyle}>{booking.date}</td>
                  <td style={tdStyle}>{booking.time}</td>
                  <td style={tdStyle}>{booking.studentName}</td>
                  <td style={tdStyle}>{booking.courseType}</td>
                  <td style={tdStyle}>{booking.note || "—"}</td>
                  <td style={tdStyle}>
                    <button
                      style={dangerButtonStyle}
                      onClick={() => deleteBooking(booking.id)}
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
  );
}
