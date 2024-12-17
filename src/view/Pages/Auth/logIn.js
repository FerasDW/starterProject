import React, { useState } from 'react';
import './Auth.css';
import AuthInput from '../../Components/Auth/Input';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setError(null); // Clear any previous error

      // Redirect or perform further actions
      window.location.href = '/home'; // Example redirection after successful login
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="signInDiv">
      <form className="signInForm" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>

        <AuthInput
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
        />

        <AuthInput
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="signInButton">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
