import { useEffect } from 'react';

export const useKeyboardShortcut = (key, callback) => {
  useEffect(() => {
    const handler = (event) => {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [key, callback]);
};