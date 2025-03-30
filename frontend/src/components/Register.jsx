import React, { useState } from 'react';
import { register } from '../services/authService';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password); // Mock for now
    alert('Registered (mock)');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md w-80">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
        Register
      </button>
    </form>
  );
}

export default Register;