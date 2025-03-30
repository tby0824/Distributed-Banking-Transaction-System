import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

function Auth() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="max-w-4xl w-full p-6 flex space-x-8">
        <Login />
        <Register />
      </div>
    </div>
  );
}

export default Auth;