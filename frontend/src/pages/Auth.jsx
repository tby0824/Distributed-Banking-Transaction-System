import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

function Auth() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Authentication</h1>
      <div className="flex space-x-8">
        <Login />
        <Register />
      </div>
    </div>
  );
}

export default Auth;