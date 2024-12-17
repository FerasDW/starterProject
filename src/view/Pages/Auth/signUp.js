import React, { useState } from 'react';
import './Auth.css';
import AuthInput from '../../Components/Auth/Input';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Updated handleInputChange
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log("The value is : {value}");
    if (id === 'email') {
      setEmail(value);  // Updates email state
    } else if (id === 'password') {
      setPassword(value);  // Updates password state
    } else if (id === 'confirmPassword') {
      setConfirmPassword(value);  // Updates confirmPassword state
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      console.log('Sign up successful:', data);
      setSuccessMessage('Account created successfully!');
      setError(null); // Clear previous error
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null); // Clear previous success message
      console.error('Sign up error:', error.message);
    }
  };

  return (
    <div className="signUpDiv">
      <form className="signUpForm" onSubmit={handleSubmit}>
        <h1>Create an Account</h1>

        <AuthInput
          id="email"
          type="email"
          placeholder="Email"
          value={email}  // Bind input field to state
          onChange={handleInputChange}
        />

        <AuthInput
          id="password"
          type="password"
          placeholder="Password"
          value={password}  // Bind input field to state
          onChange={handleInputChange}
        />

        <AuthInput
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}  // Bind input field to state
          onChange={handleInputChange}
        />

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="submit" className="signUpButton">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
