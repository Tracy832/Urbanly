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
  const [inventory, setInventory] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load inventory
  useEffect(() => {
    const saved = localStorage.getItem('urbanly_items');
    if (saved) setInventory(JSON.parse(saved));
  }, []);

  // Save inventory
  useEffect(() => {
    localStorage.setItem('urbanly_items', JSON.stringify(inventory));
  }, [inventory]);

  return (
    <Router>
      <Routes>

        {/* DEFAULT → SIGN IN */}
        <Route path="/" element={<SignIn setAuth={setIsAuthenticated} />} />

        {/* OPTIONAL LANDING PAGE */}
        <Route path="/welcome" element={<Welcome />} />

        {/* AUTH */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn setAuth={setIsAuthenticated} />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/advisor"
          element={
            isAuthenticated ? (
              <Advisor
                updateParentInventory={setInventory}
                currentParentInventory={inventory}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/simulator"
          element={
            isAuthenticated ? (
              <BudgetSimulator selectedInventory={inventory} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/matcher"
          element={isAuthenticated ? <LocationMatcher /> : <Navigate to="/login" replace />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default App;