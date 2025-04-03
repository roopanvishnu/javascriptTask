import React from 'react';

function Start({ onStart }) {
  return (
    <div className="start-container">
      <h2>Welcome to the Quiz!</h2>
      <p>Test your knowledge with our dynamic quiz application.</p>
      <p>You'll be presented with 5 questions. Try to answer all of them correctly!</p>
      <button 
        className="btn btn-primary" 
        onClick={onStart}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Start;