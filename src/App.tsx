import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/SignUp';
import Login from './components/SignIn';
import Advisor from './components/Advisor';
import Dashboard from './components/Dashboard';
import BudgetSimulator from './components/BudgetSimulator';
import LocationMatcher from './components/LocationMatcher';

const App: React.FC = () => {
  const [inventory, setInventory] = useState<string[]>([]);

  return (
    <Router>
      <Routes>
        {/* STARTING POINT */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED APP FLOW */}
        <Route path="/advisor" element={<Advisor updateParentInventory={setInventory} currentParentInventory={inventory}/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/simulator" element={<BudgetSimulator selectedInventory={inventory} />} />
        <Route path="/matcher" element={<LocationMatcher />} />

        {/* REDIRECT UNKNOWN TO WELCOME */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;