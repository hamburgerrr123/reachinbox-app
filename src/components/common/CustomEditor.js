import React, { useState, useCallback } from 'react';
import Button from './Button';

const CustomEditor = ({ initialContent = '', onContentChange }) => {
  const [content, setContent] = useState(initialContent);

  const handleContentChange = useCallback((e) => {
    setContent(e.target.value);
    onContentChange(e.target.value);
  }, [onContentChange]);

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving:', content);
    // You might want to call an API to save the content
  };

  const insertVariable = () => {
    const newContent = content + '{{VARIABLE}}';
    setContent(newContent);
    onContentChange(newContent);
  };

  return (
    <div className="custom-editor">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Enter your text here..."
      />
      <div className="editor-actions">
        <Button onClick={handleSave}>SAVE</Button>
        <Button onClick={insertVariable}>Variables</Button>
      </div>
    </div>
  );
};

export default CustomEditor;