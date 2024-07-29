import React from 'react';
import Login from '../components/auth/Login';
import GoogleLogin from '../components/auth/GoogleLogin';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Welcome to Reachinbox</h1>
      <Login />
      <GoogleLogin />
    </div>
  );
};

export default LoginPage;