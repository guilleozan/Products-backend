import React from 'react';

const Logout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Are you sure you want to logout?</h2>
        <button
          type="button"
          className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
