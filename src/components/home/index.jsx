import React from 'react'
import { useAuth } from '../../contexts/authContext';

const Home = () => {
    const { currentUser } = useAuth();
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img className="w-52 mb-8" src="/La.png" alt="Logo" />
        <div className="text-2xl font-bold text-center">
          {currentUser ? (
            <>Hello, {currentUser.displayName || currentUser.email}! welcome to La Monijor Admin Panel.</>
          ) : (
            <>Loading user information...</>
          )}
        </div>
      </div>
    );
  };
  
  export default Home;
// import React from 'react'
// import { useAuth } from '../../contexts/authContext';

// const Home = () => {
//     const { currentUser } = useAuth();
  
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <img className="w-52 mb-8" src="/La.png" />
//         <div className="text-2xl font-bold text-center">
//           Hello, {currentUser.displayName || currentUser.email}! welcome to La Monijor Admin Panel.
//         </div>
//       </div>
//     );
//   };
  
//   export default Home;
  