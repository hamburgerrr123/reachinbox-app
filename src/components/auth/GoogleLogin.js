import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const GoogleLogin = () => {
  const history = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Load the Google Sign-In API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual Google Client ID
        callback: handleCredentialResponse
      });
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Sign-In API not loaded');
    }
  };

  const handleCredentialResponse = async (response) => {
    // Send the ID token to your server
    try {
      const result = await fetch('/api/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      if (result.ok) {
        const userData = await result.json();
        login(userData); // Update your auth context with the user data
        history.push('/onebox');
      } else {
        throw new Error('Google login failed');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <Button onClick={handleGoogleLogin} className="google-login-button">
      Login with Google
    </Button>
  );
};

export default GoogleLogin;