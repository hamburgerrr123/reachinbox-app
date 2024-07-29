import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const OneboxItem = ({ thread, onSelect }) => {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className={`onebox-item ${isDarkMode ? 'dark' : 'light'}`} 
      onClick={() => onSelect(thread)}
    >
      <h3>{thread.subject}</h3>
      <p>{thread.sender}</p>
      <span>{new Date(thread.date).toLocaleDateString()}</span>
    </div>
  );
};

export default OneboxItem;