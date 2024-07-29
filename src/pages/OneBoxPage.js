import React from 'react';
import OneboxList from '../components/onebox/OneBoxList';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const OneboxPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="onebox-page">
      <h1>Onebox</h1>
      <OneboxList />
    </div>
  );
};

export default OneboxPage;