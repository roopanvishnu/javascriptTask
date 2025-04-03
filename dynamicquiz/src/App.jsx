import React, { useState } from 'react';
import Start from './pages/Start';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import './App.css';

// Quiz questions data
const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    correctAnswer: "Paris",
    explanation: "Paris is the capital and most populous city of France."
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    explanation: "Mars is called the Red Planet because of its reddish appearance."
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: "Blue Whale",
    explanation: "The Blue Whale is the largest animal known to have ever existed."
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    explanation: "Romeo and Juliet is a tragedy written by William Shakespeare."
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    explanation: "The chemical symbol Au comes from the Latin word for gold, 'aurum'."
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('start');
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Start the quiz
  const startQuiz = () => {
    setCurrentPage('quiz');
    setScore(0);
    setUserAnswers([]);
  };

  // Handle quiz completion
  const finishQuiz = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setCurrentPage('result');
  };

  // Restart the quiz
  const restartQuiz = () => {
    setCurrentPage('start');
  };

  // Render different pages based on the current state
  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        return <Start onStart={startQuiz} />;
      case 'quiz':
        return <Quiz questions={quizData} onFinish={finishQuiz} />;
      case 'result':
        return (
          <Result 
            score={score} 
            totalQuestions={quizData.length} 
            questions={quizData}
            userAnswers={userAnswers}
            onRestart={restartQuiz} 
          />
        );
      default:
        return <Start onStart={startQuiz} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Dynamic Quiz App</h1>
      </header>
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;