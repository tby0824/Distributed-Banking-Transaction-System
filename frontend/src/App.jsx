import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Auth from './pages/Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;