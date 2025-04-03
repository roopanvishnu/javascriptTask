import React, { useState } from 'react';

function Quiz({ questions, onFinish }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [answers, setAnswers] = useState([]);
  
  const currentQuestion = questions[currentQuestionIndex];

  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  // Move to next question
  const handleNext = () => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      question: currentQuestion.question,
      userAnswer: currentQuestion.options[selectedOptions[currentQuestionIndex]],
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: currentQuestion.options[selectedOptions[currentQuestionIndex]] === currentQuestion.correctAnswer
    };
    setAnswers(newAnswers);

    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      const finalScore = newAnswers.filter(answer => answer.isCorrect).length;
      onFinish(finalScore, newAnswers);
    }
  };

  // Move to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="quiz-container">
      <div className="question-card">
        <div className="question-header">
          <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
            ></div>
          </div>
        </div>
        
        <div className="question-content">
          <h3>{currentQuestion.question}</h3>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index} 
                className={`option ${selectedOptions[currentQuestionIndex] === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="question-actions">
          <button 
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleNext}
            disabled={selectedOptions[currentQuestionIndex] === null}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;