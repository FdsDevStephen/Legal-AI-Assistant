import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut 
} from 'firebase/auth';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      
      // Check if user exists in database
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), 
        where('email', '==', result.user.email))
      );
      
      if (querySnapshot.empty) {
        await signOut(auth);
        setError('No account found. Please sign up first.');
        navigate('/signup');
        return;
      }

      // User exists, proceed to chatbot
      navigate('/chatbot');
    } catch (err) {
      if (auth.currentUser) {
        await signOut(auth);
      }
      setError('Login failed. Please try again.');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // First check if user exists
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), 
        where('email', '==', email))
      );
      
      if (querySnapshot.empty) {
        setError('No account found. Please sign up first.');
        navigate('/signup');
        return;
      }

      // User exists, attempt login
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chatbot');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError('');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '350px',
      width: '90%',
      background: 'linear-gradient(to bottom right, #ffffff, #f0f7ff)',
      borderRadius: '16px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(37, 99, 235, 0.15)',
      border: '1px solid rgba(255,255,255,0.9)',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        color: '#2563eb',
        fontSize: '1.6rem',
        fontWeight: '700',
        textShadow: '0 2px 4px rgba(37, 99, 235, 0.1)'
      }}>Welcome Back</h2>
      
      {error && <p style={{ 
        color: '#dc2626', 
        textAlign: 'center',
        marginBottom: '16px',
        fontSize: '0.9rem'
      }}>{error}</p>}

      {resetSent && (
        <p style={{ 
          color: '#059669',
          textAlign: 'center',
          marginBottom: '16px',
          fontSize: '0.9rem'
        }}>
          Password reset link sent! Check your email.
        </p>
      )}

      <form onSubmit={handleEmailLogin} style={{ marginBottom: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '2px solid #e5e7eb',
              fontSize: '0.95rem',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: 'white',
              marginBottom: '12px'
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '2px solid #e5e7eb',
              fontSize: '0.95rem',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: 'white'
            }}
          />
        </div>
        
        <button type="button"
          onClick={handleForgotPassword}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontSize: '0.9rem',
            cursor: 'pointer',
            marginBottom: '16px',
            textAlign: 'right',
            width: '100%'
          }}
        >
          Forgot Password?
        </button>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
        >
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '3px solid #ffffff',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              Logging in...
            </div>
          ) : (
            'Login with Email'
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '16px 0' }}>
        <span style={{ color: '#64748b' }}>or</span>
      </div>

      <button 
        onClick={handleGoogleLogin}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          fontSize: '1rem',
          color: '#374151'
        }}
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google" 
          style={{ width: '20px', height: '20px' }} 
        />
        Login with Google
      </button>

      <p style={{ 
        textAlign: 'center', 
        marginTop: '20px',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        Don't have an account? {' '}
        <Link to="/signup" style={{ 
          color: '#2563eb',
          textDecoration: 'none',
          fontWeight: '600'
        }}>Sign up</Link>
      </p>
    </div>
  );
};

// Add this to your global CSS or style tag
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const styleTag = document.createElement('style');
styleTag.innerHTML = spinKeyframes;
document.head.appendChild(styleTag);

export default Login;