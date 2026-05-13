import { useEffect, useState } from "react";
import {
  QUIZ_STORAGE_KEY,
  SENTENCE_STORAGE_KEY,
  VOCABULARY_STORAGE_KEY,
} from "./data";
import BookingPage from "./pages/BookingPage";
import FlashcardPage from "./pages/FlashcardPage";
import HomePage from "./pages/HomePage";
import QuizManagerPage from "./pages/QuizManagerPage";
import QuizPage from "./pages/QuizPage";
import SentenceManagerPage from "./pages/SentenceManagerPage";
import SentencePracticePage from "./pages/SentencePracticePage";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import VocabularyManagerPage from "./pages/VocabularyManagerPage";

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
  const [quizQuestions, setQuizQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem(QUIZ_STORAGE_KEY);
    return savedQuestions ? JSON.parse(savedQuestions) : [];
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

  useEffect(() => {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizQuestions));
  }, [quizQuestions]);

  if (page === "student") {
    return <StudentPage setPage={setPage} />;
  }

  if (page === "quiz") {
    return <QuizPage setPage={setPage} />;
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

  if (page === "quizManager") {
    return (
      <QuizManagerPage
        setPage={setPage}
        quizQuestions={quizQuestions}
        setQuizQuestions={setQuizQuestions}
      />
    );
  }

  if (page === "sentences") {
    return (
      <SentenceManagerPage
        setPage={setPage}
        teacherSentences={teacherSentences}
        setTeacherSentences={setTeacherSentences}
      />
    );
  }

  if (page === "vocabulary") {
    return (
      <VocabularyManagerPage
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
