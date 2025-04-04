
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile,
  signOut 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Create account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      await updateProfile(userCredential.user, { displayName: name });
      // Store user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
        authProvider: 'email'
      });
      // Sign out and redirect to login
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Store user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        createdAt: new Date().toISOString(),
        authProvider: 'google'
      });
      
      // Sign out and redirect to login
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      setError('Failed to sign up with Google');
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
      }}>Create Account</h2>
      
      {error && <p style={{ 
        color: '#dc2626', 
        textAlign: 'center',
        marginBottom: '16px',
        fontSize: '0.9rem'
      }}>{error}</p>}

      <form onSubmit={handleEmailSignup} style={{ marginBottom: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
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
            placeholder="Create a password"
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
          {loading ? 'Creating Account...' : 'Sign up with Email'}
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '16px 0' }}>
        <span style={{ color: '#64748b' }}>or</span>
      </div>

      <button 
        onClick={handleGoogleSignup}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google" 
          style={{ width: '20px', height: '20px' }} 
        />
        Sign up with Google
      </button>
    </div>
  );
};

export default Signup;