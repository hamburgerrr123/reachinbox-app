import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import CustomEditor from '../common/CustomEditor';
import Button from '../common/Button';

const Reply = ({ threadId, onClose }) => {
  const [replyContent, setReplyContent] = useState('');
  const { post } = useApi();

  const handleSend = async () => {
    try {
      await post(`/reply/${threadId}`, {
        from: 'user@example.com', // Replace with actual user email
        to: 'recipient@example.com', // Replace with actual recipient email
        subject: 'Re: Thread Subject', // You might want to get this from the parent component
        body: <html>${replyContent}</html>
      });
      onClose();
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  return (
    <div className="reply-box">
      <h3>Reply</h3>
      <CustomEditor 
        initialContent={replyContent} 
        onContentChange={setReplyContent}
      />
      <div className="reply-actions">
        <Button onClick={handleSend}>Send</Button>
        <Button onClick={onClose} variant="secondary">Cancel</Button>
      </div>
    </div>
  );
};

export default Reply;