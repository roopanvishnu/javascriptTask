import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Infinite Scroll Demo</h1>
      <p>
        This application demonstrates how to implement infinite scrolling in React.
        As you scroll down, more content is loaded automatically without pagination.
      </p>
      <div className="button-container">
        <Link to="/scroll" className="btn">
          Try Infinite Scroll
        </Link>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>Performance Optimized</h3>
          <p>Loads content only when needed to ensure smooth performance.</p>
        </div>
        <div className="feature-card">
          <h3>Responsive Design</h3>
          <p>Works seamlessly across devices of all sizes.</p>
        </div>
        <div className="feature-card">
          <h3>Intersection Observer</h3>
          <p>Uses modern browser APIs to detect when to load more content.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;