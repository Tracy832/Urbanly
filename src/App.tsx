import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/SignUp';
import Login from './components/SignIn';
import Advisor from './components/Advisor';
import Dashboard from './components/Dashboard';
import BudgetSimulator from './components/BudgetSimulator';
import LocationMatcher from './components/LocationMatcher';

const App: React.FC = () => {
  // 1. GLOBAL STATE: Persist inventory choices across all routes
  const [inventory, setInventory] = useState<string[]>(() => {
    const saved = localStorage.getItem('urbanly_items');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. EFFECT: Sync inventory with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('urbanly_items', JSON.stringify(inventory));
    console.log("Global Inventory Updated:", inventory);
  }, [inventory]);

  return (
    <Router>
      <div className="min-h-screen bg-urban-cream font-sans selection:bg-urban-sand selection:text-white">
        <Routes>
          {/* STARTING POINT & AUTH */}
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* MAIN DSS FLOW */}
          <Route 
            path="/advisor" 
            element={
              <Advisor 
                updateParentInventory={setInventory} 
                currentParentInventory={inventory}
              />
            } 
          />
          
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* SIMULATOR: Receives inventory to calculate setup costs */}
          <Route 
            path="/simulator" 
            element={<BudgetSimulator selectedInventory={inventory} />} 
          />
          
          <Route path="/matcher" element={<LocationMatcher />} />

          {/* CATCH-ALL REDIRECT */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;