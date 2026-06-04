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

const shellStyle = {
  maxWidth: "1080px",
  margin: "0 auto",
};

const topActionsStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
  gap: "16px",
  alignItems: "end",
};

const fullWidthStyle = {
  gridColumn: "1 / -1",
};

const actionRowStyle = {
  gridColumn: "1 / -1",
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const helperTextStyle = {
  color: "#64748b",
  lineHeight: 1.6,
  marginTop: 0,
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

function sortBookings(bookings) {
  return [...bookings].sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
  );
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

    setBookings([...bookings, { id: Date.now().toString(), ...bookingItem }]);
    setForm(emptyBookingForm);
  }

  function deleteBooking(id) {
    setBookings(bookings.filter((booking) => booking.id !== id));
  }

  const sortedBookings = sortBookings(bookings);

  return (
    <div style={pageStyle}>
      <main style={shellStyle}>
        <div style={topActionsStyle}>
          <button style={backButtonStyle} onClick={() => setPage("home")}>
            回首頁
          </button>
          <button style={smallButtonStyle} onClick={() => setPage("teacher")}>
            回老師後台
          </button>
        </div>

        <h1 style={titleStyle}>預約時段</h1>
        <p style={subtitleStyle}>先用簡單表單記錄課程預約，後續可接通知和日曆。</p>

        <div style={tableCardStyle}>
          <h2>新增預約</h2>
          <p style={helperTextStyle}>學生姓名、課程類型、日期和時間為必填。</p>

          <form onSubmit={saveBooking} style={formGridStyle}>
            <label style={labelStyle}>
              學生姓名
              <input
                style={inputStyle}
                value={form.studentName}
                onChange={(event) => updateForm("studentName", event.target.value)}
                placeholder="例如：Amy"
              />
            </label>

            <label style={labelStyle}>
              課程類型
              <input
                style={inputStyle}
                value={form.courseType}
                onChange={(event) => updateForm("courseType", event.target.value)}
                placeholder="例如：旅遊泰文、發音練習"
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

            <label style={{ ...labelStyle, ...fullWidthStyle }}>
              備註
              <textarea
                style={textareaStyle}
                value={form.note}
                onChange={(event) => updateForm("note", event.target.value)}
                placeholder="例如：想加強點餐和問路"
              />
            </label>

            <div style={actionRowStyle}>
              <button style={greenButtonStyle} type="submit">
                新增預約
              </button>
              <button
                style={smallButtonStyle}
                type="button"
                onClick={() => setForm(emptyBookingForm)}
              >
                清空表單
              </button>
            </div>
          </form>
        </div>

        <div style={{ ...tableCardStyle, marginTop: "24px" }}>
          <h2>目前預約</h2>

          {sortedBookings.length === 0 ? (
            <p style={helperTextStyle}>目前還沒有預約紀錄。</p>
          ) : (
            <table
              style={{
                width: "100%",
                minWidth: "760px",
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
                {sortedBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td style={tdStyle}>{booking.date}</td>
                    <td style={tdStyle}>{booking.time}</td>
                    <td style={tdStyle}>{booking.studentName}</td>
                    <td style={tdStyle}>{booking.courseType}</td>
                    <td style={tdStyle}>{booking.note || "-"}</td>
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
      </main>
    </div>
  );
}
