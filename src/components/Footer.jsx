import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#000',
      color: '#fff',
      padding: '0.4rem',
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100vw',
      fontSize: '0.8rem',
      borderTop: '1px solid #333',
      zIndex: 1000,
      opacity: '0.9',
      margin: 0,
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <p style={{ 
        margin: 0, 
        padding: 0,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        width: '100%'
      }}>
        © 2024 Legal AI Assistant. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;