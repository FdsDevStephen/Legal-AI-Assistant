import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header style={{ 
      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      color: 'white', 
      padding: '20px 80px',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      boxSizing: 'border-box',
      zIndex: 1000,
      height: '75px'
    }}>
      <Link to="/" style={{ 
        fontSize: '1.8rem',
        fontWeight: '700',
        fontFamily: "'Segoe UI', Arial, sans-serif",
        letterSpacing: '0.5px',
        background: 'linear-gradient(45deg, #fff, #e0e0e0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        marginLeft: '20px',
        textDecoration: 'none',
        cursor: 'pointer'
      }}>
        Legal AI Assistant
      </Link>
      <nav style={{ 
        display: 'flex', 
        gap: '20px',
        alignItems: 'center',
        marginRight: '20px'
      }}>
        {user ? (
          <button 
            onClick={handleLogout}
            className="nav-link login-btn"
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 25px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link 
              to="/login" 
              className="nav-link login-btn"
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '10px 25px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '30px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
              Login
            </Link>
            <Link 
              to="/signup" 
              className="nav-link signup-btn"
              style={{ 
                color: '#000428',
                textDecoration: 'none',
                padding: '10px 25px',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;