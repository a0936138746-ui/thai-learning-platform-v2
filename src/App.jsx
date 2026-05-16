import { useEffect, useState } from "react";
import {
  defaultFlashcards,
  defaultQuizQuestions,
  defaultSentences,
  LEARNING_PROGRESS_STORAGE_KEY,
  QUIZ_STORAGE_KEY,
  SENTENCE_STORAGE_KEY,
  VOCABULARY_STORAGE_KEY,
} from "./data";
import BookingPage from "./pages/BookingPage";
import FlashcardPage from "./pages/FlashcardPage";
import HomePage from "./pages/HomePage";
import LearningProgressPage from "./pages/LearningProgressPage";
import QuizManagerPage from "./pages/QuizManagerPage";
import QuizPage from "./pages/QuizPage";
import SentenceManagerPage from "./pages/SentenceManagerPage";
import SentencePracticePage from "./pages/SentencePracticePage";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import VocabularyManagerPage from "./pages/VocabularyManagerPage";

function loadStoredArray(storageKey, defaultValue = []) {
  try {
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue === null) {
      return defaultValue;
    }

    const parsedValue = JSON.parse(savedValue);
    return Array.isArray(parsedValue) ? parsedValue : defaultValue;
  } catch {
    return defaultValue;
  }
}

function App() {
  const [page, setPage] = useState("home");
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [teacherVocabulary, setTeacherVocabulary] = useState(() =>
    loadStoredArray(VOCABULARY_STORAGE_KEY, defaultFlashcards)
  );
  const [teacherSentences, setTeacherSentences] = useState(() =>
    loadStoredArray(SENTENCE_STORAGE_KEY, defaultSentences)
  );
  const [quizQuestions, setQuizQuestions] = useState(() =>
    loadStoredArray(QUIZ_STORAGE_KEY, defaultQuizQuestions)
  );
  const [learningProgress, setLearningProgress] = useState(() =>
    loadStoredArray(LEARNING_PROGRESS_STORAGE_KEY)
  );

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

  useEffect(() => {
    localStorage.setItem(
      LEARNING_PROGRESS_STORAGE_KEY,
      JSON.stringify(learningProgress)
    );
  }, [learningProgress]);

  function saveQuizProgress(record) {
    setLearningProgress((currentProgress) =>
      [
        {
          id: Date.now().toString(),
          totalQuestions: record.totalQuestions,
          correctAnswers: record.correctAnswers,
          answeredAt: record.answeredAt,
        },
        ...currentProgress,
      ].slice(0, 20)
    );
  }

  if (page === "student") {
    return <StudentPage setPage={setPage} />;
  }

  if (page === "quiz") {
    return (
      <QuizPage
        setPage={setPage}
        quizQuestions={quizQuestions}
        onQuizCompleted={saveQuizProgress}
      />
    );
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
    return <TeacherPage setPage={setPage} />;
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

  if (page === "learningProgress") {
    return (
      <LearningProgressPage
        setPage={setPage}
        learningProgress={learningProgress}
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
