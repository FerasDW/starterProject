import React from "react";
import '../../Pages/Auth/Auth.css'; 


const AuthInput = ({ id, type, placeholder, value, onChange }) => {
    return (
      <div className="auth-input">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input-field"
        />
      </div>
    );
  };
  export default AuthInput;