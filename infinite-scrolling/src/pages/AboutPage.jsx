import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About This Project</h1>
      <div className="about-content">
        <p>
          This project demonstrates how to implement infinite scrolling in a React application.
          Infinite scrolling is a web design technique that loads content continuously as the
          user scrolls down the page, eliminating the need for pagination.
        </p>
        
        <h2>Technical Implementation</h2>
        <p>
          The infinite scrolling feature is implemented using two approaches:
        </p>
        <ul>
          <li>
            <strong>Intersection Observer API:</strong> A modern browser API that provides a way to
            asynchronously observe changes in the intersection of a target element with an ancestor
            element or with the viewport.
          </li>
          <li>
            <strong>Scroll Event Listener:</strong> As a fallback for older browsers, we also use
            the traditional scroll event to detect when the user is near the bottom of the page.
          </li>
        </ul>
        
        <h2>Project Structure</h2>
        <p>
          This project consists of:
        </p>
        <ul>
          <li>Multiple pages using React Router</li>
          <li>Custom components for posts and navigation</li>
          <li>Dummy data generation for demonstration purposes</li>
          <li>CSS for styling and animations</li>
        </ul>
        
        <h2>Performance Considerations</h2>
        <p>
          Infinite scrolling can have performance implications if not implemented correctly.
          This demo addresses these concerns by:
        </p>
        <ul>
          <li>Loading content in small batches</li>
          <li>Using efficient state management</li>
          <li>Implementing debounce on scroll events</li>
          <li>Preventing multiple simultaneous loading requests</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;