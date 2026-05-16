export const VOCABULARY_STORAGE_KEY = "thai-learning-teacher-vocabulary";
export const SENTENCE_STORAGE_KEY = "thai-learning-teacher-sentences";
export const QUIZ_STORAGE_KEY = "thai-learning-teacher-quiz-questions";
export const LEARNING_PROGRESS_STORAGE_KEY = "thai-learning-progress";
export const BOOKING_STORAGE_KEY = "thai-learning-bookings";

export const defaultFlashcards = [
  { id: "demo-vocab-1", zh: "蘋果", th: "แอปเปิล", py: "aep-bpen" },
  { id: "demo-vocab-2", zh: "水", th: "น้ำ", py: "náam" },
  { id: "demo-vocab-3", zh: "飯", th: "ข้าว", py: "khâao" },
  { id: "demo-vocab-4", zh: "你好", th: "สวัสดี", py: "sà-wàt-dii" },
  { id: "demo-vocab-5", zh: "謝謝", th: "ขอบคุณ", py: "khɔ̀ɔp-khun" },
];

export const defaultSentences = [
  {
    id: "demo-sentence-1",
    zh: "我想喝水。",
    th: "ฉันอยากดื่มน้ำ",
    py: "chăn yàak dùuem náam",
    note: "練習「我想要……」的句型",
  },
  {
    id: "demo-sentence-2",
    zh: "這個多少錢？",
    th: "อันนี้ราคาเท่าไหร่",
    py: "an níi raa-khaa thâo-rài",
    note: "購物時常用",
  },
  {
    id: "demo-sentence-3",
    zh: "請再說一次。",
    th: "กรุณาพูดอีกครั้ง",
    py: "gà-rú-naa phûut ìik khráng",
    note: "聽不清楚時使用",
  },
];

export const defaultQuizQuestions = [
  {
    id: "demo-quiz-1",
    question: "泰文的「你好」怎麼說？",
    optionA: "สวัสดี",
    optionB: "ขอบคุณ",
    optionC: "ลาก่อน",
    correctAnswer: "A",
  },
  {
    id: "demo-quiz-2",
    question: "泰文的「謝謝」怎麼說？",
    optionA: "น้ำ",
    optionB: "ขอบคุณ",
    optionC: "ข้าว",
    correctAnswer: "B",
  },
  {
    id: "demo-quiz-3",
    question: "泰文的「水」是哪一個？",
    optionA: "ข้าว",
    optionB: "แอปเปิล",
    optionC: "น้ำ",
    correctAnswer: "C",
  },
];
