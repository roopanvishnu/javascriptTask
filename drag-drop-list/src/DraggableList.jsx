import React, { useState } from 'react';

function DraggableList({ items, onReorder }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    // This helps with Firefox dragging
    e.dataTransfer.setData('text/plain', item.id);
    
    // Add a slight delay to change appearance after drag starts
    setTimeout(() => {
      e.target.classList.add('dragging');
    }, 0);
  };

  const handleDragEnter = (e, item) => {
    e.preventDefault();
    if (item !== draggedItem) {
      setDraggedOverItem(item);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggedOverItem(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    
    if (!draggedItem || !draggedOverItem) return;
    
    const newItems = [...items];
    const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
    const dropIndex = newItems.findIndex(item => item.id === draggedOverItem.id);
    
    // Remove the dragged item from its original position
    const [removed] = newItems.splice(draggedIndex, 1);
    
    // Insert the dragged item at the new position
    newItems.splice(dropIndex, 0, removed);
    
    // Update state
    onReorder(newItems);
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  return (
    <ul className="draggable-list">
      {items.map((item) => (
        <li
          key={item.id}
          className={`draggable-item ${draggedOverItem === item ? 'drag-over' : ''}`}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item)}
          onDragEnter={(e) => handleDragEnter(e, item)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export default DraggableList;