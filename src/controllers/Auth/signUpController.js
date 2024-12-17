// import React, { useState } from "react";
// function SignUpController(){

// const [name, setName] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [message, setMessage] = useState('');

// const handleSignUp = async () => {
//     try {
//         const response = await fetch('http://localhost:8080/api/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: name,
//                 email: email,
//                 password: password,
//             }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             setMessage(`Account created successfully! Welcome, ${data.name}`);
//             console.log('User created:', data);
//             // Optionally redirect the user to the login page
//         } else if (response.status === 400) {
//             const error = await response.text(); // Expecting a plain text error message from the backend
//             setMessage(error);
//         } else {
//             setMessage('Something went wrong. Please try again later.');
//         }
//     } catch (error) {
//         console.error('Error during sign-up:', error);
//         setMessage('An unexpected error occurred. Please try again later.');
//     }
// };
// }
// export default SignUpController;
import { useState } from 'react';

const useSignUpController = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (event) => {
    console.log("asdd");
    const { id, value } = event.target;
    if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    } else if (id === 'confirmPassword') {
      setConfirmPassword(value);
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

  return {
    email,
    password,
    confirmPassword,
    error,
    successMessage,
    handleInputChange,
    handleSubmit,
  };
};

export default useSignUpController;
