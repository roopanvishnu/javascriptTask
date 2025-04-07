// Utility function to generate random dummy data for posts

// Array of dummy titles
const titles = [
    "The Ultimate Guide to JavaScript Performance",
    "10 React Hooks You Should Know About",
    "Why TypeScript Is Taking Over Frontend Development",
    "Building Scalable UIs with Component Architecture",
    "The Future of Web Development in 2025",
    "Understanding CSS Grid and Flexbox",
    "Functional Programming Concepts Every Developer Should Know",
    "Optimizing Web Applications for Mobile Devices",
    "A Deep Dive into React's Reconciliation Algorithm",
    "State Management Patterns in Modern JavaScript",
    "Responsive Design Strategies for Complex UIs",
    "Mastering ES6 Features for Better Code",
    "Web Accessibility: Making Your App Inclusive",
    "The Art of Clean Code: Best Practices",
    "Progressive Web Apps: The Next Big Thing",
    "Serverless Architectures for Frontend Developers",
    "Security Best Practices for Web Applications",
    "Database Choices for Modern Web Apps",
    "Testing Strategies for React Components",
    "The Evolution of JavaScript Frameworks"
  ];
  
  // Array of dummy author names
  const authors = [
    "Alex Johnson",
    "Jamie Smith",
    "Taylor Wilson",
    "Morgan Lee",
    "Casey Brown",
    "Jordan Taylor",
    "Riley Parker",
    "Quinn Davis",
    "Avery Miller",
    "Dakota Garcia"
  ];
  
  // Array of dummy content paragraphs
  const contentParagraphs = [
    "In the world of web development, performance is key to providing a great user experience. This article explores various techniques to optimize your JavaScript code for better performance.",
    "Hooks have revolutionized the way we build React components. Here, we'll explore some of the most useful hooks that can simplify your code and make it more maintainable.",
    "TypeScript has been gaining significant traction in the frontend development community. Let's examine why so many developers are making the switch from plain JavaScript.",
    "Building complex user interfaces requires a solid architectural foundation. Component-based architecture provides scalability and maintainability for large applications.",
    "The landscape of web development is constantly evolving. In this post, we'll look at emerging trends and technologies that will shape the future of the industry.",
    "Understanding layout models in CSS is crucial for creating responsive designs. We'll dive deep into how Grid and Flexbox can be used together for powerful layouts.",
    "Functional programming paradigms can lead to more predictable and testable code. This article introduces key concepts that can be applied in everyday JavaScript.",
    "Mobile optimization is no longer optional. Learn strategies for ensuring your web applications perform well on devices with varying capabilities and constraints.",
    "React's virtual DOM and reconciliation process are key to its performance. We'll explore how React decides what to render and when for optimal efficiency.",
    "Managing state effectively is one of the most challenging aspects of frontend development. We'll compare different patterns and their use cases."
  ];
  
  // Function to generate a random date within the last 30 days
  const generateRandomDate = () => {
    const now = new Date();
    const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    return pastDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Function to generate a random number within a range
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Function to generate placeholder image URLs
  const generateImageUrl = (id) => {
    // Using placeholders with unique seeds based on post ID for consistent but varied images
    return `https://picsum.photos/seed/${id}/800/400`;
  };
  
  // Main function to generate dummy posts
  export const generateDummyPosts = (page, count = 10) => {
    const startIndex = (page - 1) * count;
    const posts = [];
  
    for (let i = 0; i < count; i++) {
      const id = startIndex + i + 1;
      posts.push({
        id,
        title: titles[id % titles.length],
        author: authors[id % authors.length],
        content: contentParagraphs[id % contentParagraphs.length],
        date: generateRandomDate(),
        imageUrl: generateImageUrl(id),
        views: getRandomNumber(100, 5000),
        likes: getRandomNumber(10, 500),
        comments: getRandomNumber(0, 50)
      });
    }
  
    return posts;
  };