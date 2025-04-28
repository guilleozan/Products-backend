import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const handleLogout = async () => {
    await doSignOut();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-center w-full h-auto fixed top-0 left-0 bg-gray-200 border-b z-20 p-4">
      <div className="flex gap-x-4">
        {userLoggedIn ? (
          <>
            
            <ul className="flex space-x-5 mt-1 mb-1" >
              <li className="p-2 text-white text-center rounded-md bg-blue-500 hover:bg-yellow-300 transition-colors">
                <Link to="/home">Home</Link>
              </li>
              <li className="p-2 text-white text-center rounded-md bg-blue-500 hover:bg-yellow-300 transition-colors">
                <Link to="/menu">View all Products</Link>
              </li>
              <li className="p-2 text-white text-center rounded-md bg-blue-500 hover:bg-yellow-300 transition-colors">
                <Link to="/newitem">New Item</Link>
              </li>
              
            </ul>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 underline hover:text-blue-800 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-x-4">
            <Link
              to="/login"
              className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Register New Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;


