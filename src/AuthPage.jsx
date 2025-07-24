import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const navigate = useNavigate();

   useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (email ==="" || password === "") {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/${type}`, {
        email,
        password,
      });

      alert(response.data.message);

      if (type === 'login') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/Home');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  const togglePassword = () => {
    const input = passwordRef.current;
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>User Login / Register</h2>
        <h1>email: login@gmail.com
            password: 12345678
        </h1>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="checkbox-group">
          <input type="checkbox" onClick={togglePassword} />
          <span>Show Password</span>
        </div>

        <div className="btn-group">
          <button onClick={(e) => handleSubmit(e, 'login')}>Login</button>
          <button onClick={(e) => handleSubmit(e, 'register')}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;