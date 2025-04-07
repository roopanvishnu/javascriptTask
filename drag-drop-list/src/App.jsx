import React, { useState, useEffect } from 'react';
import DraggableList from './DraggableList';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' }
  ]);
  
  const [reorderCount, setReorderCount] = useState(0);

  const handleReorder = (reorderedItems) => {
    setItems(reorderedItems);
    setReorderCount(prev => prev + 1);
  };

  const resetList = () => {
    setItems([
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
      { id: 4, text: 'Item 4' },
      { id: 5, text: 'Item 5' }
    ]);
    setReorderCount(0);
  };
  
  // Add a visual feedback animation when the user successfully reorders items
  useEffect(() => {
    if (reorderCount > 0) {
      const listElement = document.querySelector('.app');
      if (listElement) {
        listElement.classList.add('reordered');
        setTimeout(() => {
          listElement.classList.remove('reordered');
        }, 500);
      }
    }
  }, [reorderCount]);

  return (
    <div className="app">
      <h1>Drag and Drop List</h1>
      <DraggableList items={items} onReorder={handleReorder} />
      <button className="reset-button" onClick={resetList}>
        Reset List
      </button>
      {reorderCount > 0 && (
        <p className="reorder-count">
          List reordered {reorderCount} {reorderCount === 1 ? 'time' : 'times'}
        </p>
      )}
    </div>
  );
}

export default App;