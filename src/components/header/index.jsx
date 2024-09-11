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
    <nav className="flex items-center justify-center w-full h-12 fixed top-0 left-0 bg-gray-200 border-b z-20 p-4">
      <div className="flex gap-x-4">
        {userLoggedIn ? (
          <>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 underline hover:text-blue-800 transition-colors"
            >
              Logout
            </button>
            <ul className="flex space-x-4">
              <li className="p-2 text-white text-center rounded-md bg-blue-500 hover:bg-yellow-300 transition-colors">
                <Link to="/menu">View all Products</Link>
              </li>
              <li className="p-2 text-white text-center rounded-md bg-blue-500 hover:bg-yellow-300 transition-colors">
                <Link to="/newitem">New Item</Link>
              </li>
            </ul>
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


// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../contexts/authContext'
// import { doSignOut } from '../../firebase/auth'

// const Header = () => {
//     const navigate = useNavigate()
//     const { userLoggedIn } = useAuth()
//     return (
//         <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
//             {
//                 userLoggedIn
//                     ?
//                     <>
//                         <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
//                         <ul>
//               <li className="text-white text-center rounded-md p-2 hover:bg-yellow-300 text">
//                 <Link to="/menu">Menu</Link>
//               </li>
              
//               <li className="text-white text-center rounded-md  p-2 hover:bg-yellow-300">
//                 <Link to="/newitem">NewItem</Link>

        
//               </li>
           
//             </ul>
//                     </>
//                     :
//                     <>
//                         <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
//                         <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
//                     </>
//             }

//         </nav>
//     )
// }

// export default Header