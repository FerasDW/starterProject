// import React, { useState } from "react";
// function LogInController(){
// const [userName, setUserName] = useState('');
// const [password, setPassword] = useState('');
// const [error, setError] = useState(null);


// const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     if (id === 'userName') {
//         setUserName(value);
//     } else if (id === 'password') {
//         setPassword(value);
//     }
// };

// const handleSubmit = async (e) => {
//     console.log("feras");
//     e.preventDefault(); 

//     try {
//         const response = await fetch('http://localhost:8080/api/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 userName,
//                 password,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Login failed');  
//         }
//         localStorage.setItem("username",userName);
//         window.location.href = '/home'; 
//     } catch (error) {

//         setError('Invalid username or password');
//         console.error('Error:', error.message);
//     }
// };
// }
// export default LogInController;

import { useState } from "react";

const useLogInController = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === 'userName') {
            setUserName(value);
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
                body: JSON.stringify({ userName, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Redirect or handle successful login here
        } catch (error) {
            setError(error.message);
            console.error('Login error:', error.message);
        }
    };

    return {
        userName,
        password,
        error,
        handleInputChange,
        handleSubmit,
    };
};

export default useLogInController;
