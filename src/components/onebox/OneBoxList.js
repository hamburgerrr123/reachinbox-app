import React, { useState, useEffect } from 'react';
import OneboxItem from './OneBoxItem';
import Reply from './Reply';
import CustomEditor from '../common/CustomEditor';
import { useApi } from '../../hooks/useApi';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

const OneboxList = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const { get, remove } = useApi();

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const data = await get('/onebox/list');
      setThreads(data);
    } catch (error) {
      console.error('Failed to fetch threads:', error);
    }
  };

  const deleteThread = async () => {
    if (selectedThread) {
      try {
        await remove(`/onebox/${selectedThread.id}`);
        fetchThreads();
        setSelectedThread(null);
      } catch (error) {
        console.error('Failed to delete thread:', error);
      }
    }
  };

  useKeyboardShortcut('d', deleteThread);
  useKeyboardShortcut('r', () => setShowReply(true));

  return (
    <div className="onebox-list">
      <div className="thread-list">
        {threads.map(thread => (
          <OneboxItem
            key={thread.id}
            thread={thread}
            onSelect={() => setSelectedThread(thread)}
          />
        ))}
      </div>
      {selectedThread && (
        <div className="thread-content">
          <h2>{selectedThread.subject}</h2>
          <p>{selectedThread.body}</p>
          <CustomEditor 
            initialContent={selectedThread.body}
            onContentChange={(content) => {
              // Handle content change, e.g., update the thread
            }}
          />
          {showReply && (
            <Reply 
              threadId={selectedThread.id} 
              onClose={() => setShowReply(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OneboxList;