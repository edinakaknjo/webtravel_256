import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const navigate = useNavigate();

  //ne radi mi login ?? ne znam što 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        lozinka,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('uloga', response.data.uloga);
      if (response.data) {
        navigate('/home');
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      alert('Pogrešan email ili lozinka');
    } 
  };

  const registracija = () => {
    navigate('/register');
  };


  const gost = () => {
    navigate('/home');
  };

 

  return (
    <div className="login-container">
    <h1 className='login-title'>Login</h1>
    <input className="login-input" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input className="login-input" type="password" placeholder="Lozinka" value={lozinka} onChange={(e) => setLozinka(e.target.value)} />
    
    <div className="buttons-container">
      <button className='login-button' onClick={handleLogin}>Login</button>
      <button className='guest-button' onClick={gost}>Guest</button>
      <button className='register-button' onClick={registracija}>Registracija</button>
    </div>
  </div>
  );
};

export default Login;

