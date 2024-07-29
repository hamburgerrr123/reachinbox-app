import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import OneboxPage from './pages/OneBoxPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route exact path="/" component={LoginPage} />
                <Route path="/onebox" component={OneboxPage} />
                <Navigate to="/" />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
