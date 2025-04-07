import React, { useState } from 'react';
import Start from './pages/Start';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import './App.css';

// Generalized Quiz Questions
const quizData = [
  {
    id: 1,
    question: "Which is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correctAnswer: "Skin",
    explanation: "The skin is the body's largest organ, covering the entire external surface."
  },
  {
    id: 2,
    question: "Who developed the theory of general relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    correctAnswer: "Albert Einstein",
    explanation: "Albert Einstein developed the theory of general relativity in 1915."
  },
  {
    id: 3,
    question: "What is the smallest unit of life?",
    options: ["Atom", "Molecule", "Cell", "Organ"],
    correctAnswer: "Cell",
    explanation: "The cell is the basic structural and functional unit of all living organisms."
  },
  {
    id: 4,
    question: "Which ocean is the largest by surface area?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctAnswer: "Pacific Ocean",
    explanation: "The Pacific Ocean is the largest ocean, covering over 63 million square miles."
  },
  {
    id: 5,
    question: "What is the chemical symbol for potassium?",
    options: ["P", "K", "Pt", "Ka"],
    correctAnswer: "K",
    explanation: "The symbol 'K' comes from 'Kalium,' the Latin name for potassium."
  },
  {
    id: 6,
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    correctAnswer: "France",
    explanation: "France won the 2018 FIFA World Cup, defeating Croatia in the final."
  },
  {
    id: 7,
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Bangkok", "Tokyo"],
    correctAnswer: "Tokyo",
    explanation: "Tokyo is the capital city of Japan."
  },
  {
    id: 8,
    question: "How many bones are in the adult human body?",
    options: ["206", "220", "190", "250"],
    correctAnswer: "206",
    explanation: "The adult human body has 206 bones."
  },
  {
    id: 9,
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    explanation: "Plants absorb carbon dioxide during photosynthesis."
  },
  {
    id: 10,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci",
    explanation: "The Mona Lisa was painted by Leonardo da Vinci in the early 16th century."
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('start');
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Function to start the quiz
  const startQuiz = () => {
    setCurrentPage('quiz');
    setScore(0);
    setUserAnswers([]);
  };

  // Function to handle quiz completion
  const finishQuiz = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setCurrentPage('result');
  };

  // Function to restart the quiz
  const restartQuiz = () => {
    setCurrentPage('start');
  };

  // Function to render the current page
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
        <h1>General Knowledge Quiz</h1>
      </header>
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
