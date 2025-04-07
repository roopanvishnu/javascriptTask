// Application state
const appState = {
    counter: 0
  };
  
  // Page components
  const pages = {
    home: {
      render: () => {
        return `
          <div class="page home-page">
            <h2 class="page-title">Home Page</h2>
            <div class="card">
              <p>Welcome to our Single Page Application with hash-based routing. 
                 This is a simple demonstration of how to navigate between different views 
                 without reloading the page.</p>
              <p>Try clicking on the navigation links above to see how the page content 
                 changes without refreshing the browser.</p>
            </div>
            
            <div class="card">
              <h3>Counter Example</h3>
              <p>This counter will maintain its state as you navigate between pages:</p>
              <div class="counter-container">
                <button id="decrement">-</button>
                <span class="counter-value" id="counter-value">${appState.counter}</span>
                <button id="increment">+</button>
              </div>
            </div>
          </div>
        `;
      },
      
      setupListeners: () => {
        // Add event listeners for the counter buttons
        document.getElementById('increment').addEventListener('click', () => {
          appState.counter++;
          document.getElementById('counter-value').textContent = appState.counter;
        });
        
        document.getElementById('decrement').addEventListener('click', () => {
          appState.counter--;
          document.getElementById('counter-value').textContent = appState.counter;
        });
      }
    },
    
    about: {
      render: () => {
        return `
          <div class="page about-page">
            <h2 class="page-title">About Page</h2>
            <div class="card">
              <p>This is a simple SPA (Single Page Application) built with vanilla JavaScript.</p>
              <p>It demonstrates hash-based routing by listening to the window.onhashchange event
                 and dynamically loading different content based on the URL hash.</p>
            </div>
            
            <div class="card">
              <h3>Features</h3>
              <ul>
                <li>Hash-based routing (#home, #about)</li>
                <li>State persistence across route changes</li>
                <li>Dynamic content loading</li>
                <li>Simple and clean UI</li>
              </ul>
            </div>
            
            <div class="card">
              <h3>Counter Value</h3>
              <p>Notice how the counter value persists: <span class="counter-value">${appState.counter}</span></p>
              <p>This demonstrates that our application state is maintained even when navigating between different views.</p>
            </div>
          </div>
        `;
      },
      
      setupListeners: () => {
        // No specific listeners for this page
      }
    }
  };
  
  // Router function to handle hash changes
  function router() {
    // Get the hash from the URL (without the # symbol)
    const hash = window.location.hash.slice(1) || 'home';
    
    // Get the page component based on the hash
    const page = pages[hash] || pages.home;
    
    // Render the page content
    const appElement = document.getElementById('app');
    appElement.innerHTML = page.render();
    
    // Set up any event listeners for the page
    page.setupListeners();
    
    // Update active navigation links
    updateActiveNavLinks(hash);
  }
  
  // Update the active navigation link
  function updateActiveNavLinks(hash) {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      const linkHash = link.getAttribute('href').slice(1);
      
      if (linkHash === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Initial route handling
  window.addEventListener('DOMContentLoaded', () => {
    // Add the hash change event listener
    window.addEventListener('hashchange', router);
    
    // Handle the initial route
    router();
  });