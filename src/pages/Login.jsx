import React from 'react';
// Import icons for Google, Facebook, and Apple if you have them

const Login = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="p-10 max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <h2 className="mb-4 text-2xl py-4 font-bold text-gray-900 text-center">Sign in to continue</h2>
        
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-3">
          Google
        </button>
        
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-3">
          Facebook
        </button>
        
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Apple
        </button>
      </div>
    </div>
  );
};

export default Login;
