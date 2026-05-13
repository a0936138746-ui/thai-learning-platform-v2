import { useEffect, useState } from "react";
import BookingPage from "./pages/BookingPage";
import FlashcardPage from "./pages/FlashcardPage";
import HomePage from "./pages/HomePage";
import SentencePage from "./pages/SentencePage";
import SentencePracticePage from "./pages/SentencePracticePage";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import VocabularyPage from "./pages/VocabularyPage";

const VOCABULARY_STORAGE_KEY = "thai-learning-teacher-vocabulary";
const SENTENCE_STORAGE_KEY = "thai-learning-teacher-sentences";

function App() {
  const [page, setPage] = useState("home");
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [teacherVocabulary, setTeacherVocabulary] = useState(() => {
    const savedVocabulary = localStorage.getItem(VOCABULARY_STORAGE_KEY);
    return savedVocabulary ? JSON.parse(savedVocabulary) : [];
  });
  const [teacherSentences, setTeacherSentences] = useState(() => {
    const savedSentences = localStorage.getItem(SENTENCE_STORAGE_KEY);
    return savedSentences ? JSON.parse(savedSentences) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      VOCABULARY_STORAGE_KEY,
      JSON.stringify(teacherVocabulary)
    );
  }, [teacherVocabulary]);

  useEffect(() => {
    localStorage.setItem(
      SENTENCE_STORAGE_KEY,
      JSON.stringify(teacherSentences)
    );
  }, [teacherSentences]);

  if (page === "student") {
    return <StudentPage setPage={setPage} />;
  }

  if (page === "sentencePractice") {
    return (
      <SentencePracticePage
        setPage={setPage}
        teacherSentences={teacherSentences}
      />
    );
  }

  if (page === "flashcards") {
    return (
      <FlashcardPage
        setPage={setPage}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
        flipped={flipped}
        setFlipped={setFlipped}
        teacherVocabulary={teacherVocabulary}
      />
    );
  }

  if (page === "teacher") {
    return (
      <TeacherPage
        setPage={setPage}
        teacherVocabulary={teacherVocabulary}
        setTeacherVocabulary={setTeacherVocabulary}
      />
    );
  }

  if (page === "sentences") {
    return (
      <SentencePage
        setPage={setPage}
        teacherSentences={teacherSentences}
        setTeacherSentences={setTeacherSentences}
      />
    );
  }

  if (page === "vocabulary") {
    return (
      <VocabularyPage
        setPage={setPage}
        teacherVocabulary={teacherVocabulary}
        setTeacherVocabulary={setTeacherVocabulary}
      />
    );
  }

  if (page === "booking") {
    return <BookingPage setPage={setPage} />;
  }

  return <HomePage setPage={setPage} />;
}

export default App;
