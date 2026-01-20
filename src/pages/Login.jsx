import React, { useState } from 'react';

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({ 
    userId: '', 
    password: '',
    name: '', 
    phone: '', 
    address: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const usersDB = JSON.parse(localStorage.getItem('pharmacyUsersDB')) || {};

    if (isLogin) {
      const foundUser = usersDB[formData.userId];

      if (foundUser && foundUser.password === formData.password) {
        localStorage.setItem('pharmacyUser', JSON.stringify(foundUser));
        setUser(foundUser);
      } else {
        setError('Invalid User ID or Password');
      }

    } else {
      if (usersDB[formData.userId]) {
        setError('User ID already taken. Please choose another.');
        return;
      }
      usersDB[formData.userId] = formData;
      localStorage.setItem('pharmacyUsersDB', JSON.stringify(usersDB));
      localStorage.setItem('pharmacyUser', JSON.stringify(formData));
      setUser(formData);
    }
  };

  return (
    <div className="login-card">
      <h1>MedStore</h1>
      <h2>{isLogin ? 'Login' : 'New User Sign Up'}</h2>
      <p>{isLogin ? 'Enter your details to login.' : 'Create an account to login.'}</p>
      
      {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input 
          className="form-input"
          name="userId"
          type="text" placeholder="User ID (e.g., email)" required 
          onChange={handleChange} 
        />
        <input 
          className="form-input"
          name="password"
          type="password" placeholder="Password" required 
          onChange={handleChange} 
        />

        {!isLogin && (
          <>
            <input 
              className="form-input"
              name="name"
              type="text" placeholder="Full Name" required 
              onChange={handleChange} 
            />
            <input 
              className="form-input"
              name="phone"
              type="text" placeholder="Phone Number" required 
              onChange={handleChange} 
            />
            <input 
              className="form-input"
              name="address"
              type="text" placeholder="Delivery Address" required 
              onChange={handleChange} 
            />
          </>
        )}

        <button type="submit" className="primary-btn">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p >
        {isLogin ? "New here? " : "Already have an account? "}
        <span
          className='loginlink'
          onClick={() => {
            setIsLogin(!isLogin);
            setError(''); 
          }}
        >
          {isLogin ? 'Create Account' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default Login;