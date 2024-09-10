import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-transparent p-8  w-auto flex  flex-col items-center">
      <img className="bg-white  w-1/2 flex-auto " src="/La.png " alt="Navigation Image" />
        <h2 className="text-2xl font-bold text-center mb-6"> ADMIN PANEL</h2>
        <form className='w-4/5'>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
