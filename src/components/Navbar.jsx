import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = ({user,setUser}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('pharmacyUser');
    setUser(null);
    navigate('/login');
  };
  if (!user) return null;
  return (
    <nav className="navbar">
      <h2>MedStore</h2>
      <div className="nav1">
        <Link to="/" className="nav2">Home</Link>
        <Link to="/orders" className="nav2">My Orders</Link>
        <Link to="/profile" className="nav2">Profile</Link>
        <button onClick={handleLogout} className="logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
