import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <h1>Personalized AI Tutor</h1>
      <ul>
        {user ? (
          <>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/learning-path">Learning Path</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
