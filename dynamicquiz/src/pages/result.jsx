import React, { useState } from 'react';

function Result({ score, totalQuestions, questions, userAnswers, onRestart }) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate percentage
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine feedback based on score
  const getFeedback = () => {
    if (percentage >= 80) {
      return "Excellent! You have a great understanding of the topics!";
    } else if (percentage >= 60) {
      return "Good job! You have a solid grasp of most topics.";
    } else if (percentage >= 40) {
      return "Not bad, but there's room for improvement.";
    } else {
      return "You might want to study more and try again.";
    }
  };

  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      
      <div className="score-card">
        <div className="score-circle">
          <span className="score-value">{score}</span>
          <span className="score-total">/{totalQuestions}</span>
        </div>
        <p className="score-percentage">{percentage}%</p>
        <p className="score-feedback">{getFeedback()}</p>
      </div>
      
      <div className="result-actions">
        <button 
          className="btn btn-secondary"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        <button 
          className="btn btn-primary"
          onClick={onRestart}
        >
          Take Quiz Again
        </button>
      </div>
      
      {showDetails && (
        <div className="answer-details">
          <h3>Question Details</h3>
          {userAnswers.map((answer, index) => (
            <div 
              key={index} 
              className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <h4>Question {index + 1}: {answer.question}</h4>
              <p>Your answer: <strong>{answer.userAnswer}</strong></p>
              {!answer.isCorrect && (
                <p>Correct answer: <strong>{answer.correctAnswer}</strong></p>
              )}
              <p className="explanation">
                <strong>Explanation:</strong> {questions[index].explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Result;