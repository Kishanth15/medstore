import React from 'react';
import profile from '../assets/profile.png';
const Profile = ({ user }) => {
  return (
    <div className="profile">
      <img src={profile} alt="Profile" />
      <h2>{user.name}</h2>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      
    </div>
  );
};

export default Profile;