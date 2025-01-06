import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WalletConnect from './components/WalletConnect';
import RegisterContract from './components/RegisterContract';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WalletConnect />} />
        <Route path="/contracts" element={<RegisterContract />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
