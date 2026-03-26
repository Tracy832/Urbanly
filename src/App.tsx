import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Advisor from './components/Advisor';
import Dashboard from './components/Dashboard';
import BudgetSimulator from './components/BudgetSimulator';
import LocationMatcher from './components/LocationMatcher';

const App: React.FC = () => {
  const [inventory, setInventory] = useState<string[]>(() => {
    const saved = localStorage.getItem('urbanly_items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('urbanly_items', JSON.stringify(inventory));
  }, [inventory]);

  return (
    <Router>
      <Routes>
        {/* LANDING PAGE */}
        <Route path="/" element={<Welcome />} />
        
        {/* AUTHENTICATION */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />

        {/* PROTECTED CORE APP */}
        <Route 
          path="/advisor" 
          element={<Advisor updateParentInventory={setInventory} currentParentInventory={inventory}/>} 
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/simulator" element={<BudgetSimulator selectedInventory={inventory} />} />
        <Route path="/matcher" element={<LocationMatcher />} />

        {/* REDIRECT UNKNOWN TO WELCOME */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;