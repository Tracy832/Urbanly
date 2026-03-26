import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Advisor from './components/Advisor';
import Dashboard from './components/Dashboard';
import LocationMatcher from './components/LocationMatcher';
import BudgetSimulator from './components/BudgetSimulator';
// import ShoppingList from './components/ShoppingList'; // REMOVE THIS

const App: React.FC = () => {
  const [urbanlyInventory, setUrbanlyInventory] = useState<string[]>(() => {
    const saved = localStorage.getItem('urbanly_items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('urbanly_items', JSON.stringify(urbanlyInventory));
  }, [urbanlyInventory]);

  return (
    <Router>
      <div className="App font-sans text-urban-charcoal">
        <Routes>
          <Route path="/" element={<Advisor updateParentInventory={setUrbanlyInventory} currentParentInventory={urbanlyInventory}/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/matcher" element={<LocationMatcher />} />
          <Route path="/simulator" element={<BudgetSimulator selectedInventory={urbanlyInventory} />} />
          {/* DELETE THE SHOPPING LIST ROUTE BELOW */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;