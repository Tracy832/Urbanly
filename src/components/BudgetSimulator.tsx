import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Home, Target, ShieldCheck, AlertTriangle } from 'lucide-react';

const FURNITURE_PRICES: Record<string, number> = {
  'Television': 28000, 'Refrigerator': 32000, 'Microwave': 9500,
  'Sofa Set': 45000, 'Bed Frame': 15000, 'Gas Cooker': 12000
};

const BudgetSimulator: React.FC<{ selectedInventory: string[] }> = ({ selectedInventory }) => {
  const navigate = useNavigate();

  // GET DATA FROM ADVISOR
  const userIncome = Number(localStorage.getItem('user_income')) || 65000;
  const userSavings = Number(localStorage.getItem('user_savings')) || 150000;
  const userTargetRent = Number(localStorage.getItem('user_rent')) || 20000;

  const [rent, setRent] = useState(userTargetRent);
  const [food, setFood] = useState(12000);

  const inventoryTotal = selectedInventory.reduce((sum, item) => sum + (FURNITURE_PRICES[item] || 0), 0);
  const upfrontCosts = (rent * 3) + inventoryTotal; // 3x Rent Rule + Furniture
  const monthlyExpenses = rent + food + 9000; // Rent + Food + Utilities/Transport
  const runway = (userSavings - upfrontCosts) / monthlyExpenses;

  const isSafe = runway >= 3 && (rent / userIncome) <= 0.35;

  return (
    <div className="min-h-screen bg-urban-cream p-12 text-left">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate('/dashboard')}><ArrowLeft /></button>
        <h1 className="text-3xl font-black uppercase italic">Financial Simulator</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <div className="premium-card p-8 bg-white shadow-xl">
            <label className="font-black flex items-center gap-2"><Home /> Monthly Rent: KSh {rent.toLocaleString()}</label>
            <input type="range" min="5000" max="80000" value={rent} onChange={e => setRent(Number(e.target.value))} className="w-full accent-urban-sand h-2 mt-4" />
          </div>
          
          <div className="premium-card p-8 bg-urban-charcoal text-white">
            <p className="text-xs font-black uppercase text-urban-sand">Upfront Cash Required</p>
            <p className="text-4xl font-black italic">KSh {upfrontCosts.toLocaleString()}</p>
            <p className="text-[10px] opacity-50 uppercase mt-2 font-bold">Includes 2 months deposit + Inventory selection</p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className={`premium-card p-10 text-center ${isSafe ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} border-t-8 shadow-xl`}>
             {isSafe ? <ShieldCheck className="mx-auto text-green-600 mb-4" /> : <AlertTriangle className="mx-auto text-red-600 mb-4" />}
             <h3 className="text-2xl font-black uppercase italic">{isSafe ? 'Safe Move' : 'High Risk'}</h3>
             <p className="text-sm font-bold mt-2">Runway: {runway.toFixed(1)} Months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSimulator;