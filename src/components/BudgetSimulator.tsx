import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ShieldCheck, AlertTriangle, Info } from 'lucide-react';

const FURNITURE_PRICES: Record<string, number> = {
  'Television': 28000, 'Refrigerator': 32000, 'Microwave': 9500,
  'Sofa Set': 45000, 'Bed Frame': 15000, 'Gas Cooker': 12000
};

const BudgetSimulator: React.FC<{ selectedInventory: string[] }> = ({ selectedInventory }) => {
  const navigate = useNavigate();

  const userIncome = Number(localStorage.getItem('user_income')) || 65000;
  const userSavings = Number(localStorage.getItem('user_savings')) || 150000;
  const userTargetRent = Number(localStorage.getItem('user_rent')) || 20000;

  const [rent, setRent] = useState(userTargetRent);
  const [food, setFood] = useState(12000);

  const inventoryTotal = selectedInventory.reduce((sum, item) => sum + (FURNITURE_PRICES[item] || 0), 0);
  const upfrontCosts = (rent * 3) + inventoryTotal; 
  const monthlyExpenses = rent + food + 9000; 
  const runway = (userSavings - upfrontCosts) / monthlyExpenses;

  // --- DYNAMIC RATING LOGIC ---
  const rentRatio = rent / userIncome;
  
  const getRating = () => {
    if (runway >= 3 && rentRatio <= 0.35) {
      return { label: 'Safe Move', color: 'bg-green-50 border-green-500 text-green-600', icon: <ShieldCheck className="mx-auto w-12 h-12" /> };
    } else if (runway >= 1.5 && rentRatio <= 0.45) {
      return { label: 'Cautious', color: 'bg-orange-50 border-orange-500 text-orange-600', icon: <Info className="mx-auto w-12 h-12" /> };
    } else {
      return { label: 'High Risk', color: 'bg-red-50 border-red-500 text-red-600', icon: <AlertTriangle className="mx-auto w-12 h-12" /> };
    }
  };

  const rating = getRating();

  return (
    <div className="min-h-screen bg-urban-cream p-12 text-left selection:bg-urban-sand/20">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-black/5 rounded-full transition-all">
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Financial Simulator</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <div className="premium-card p-8 bg-white shadow-xl border border-gray-100 rounded-[2rem]">
            <div className="flex justify-between items-center mb-4">
               <label className="font-black flex items-center gap-2 uppercase tracking-widest text-xs text-urban-taupe">
                 <Home className="w-4 h-4" /> Monthly Rent Target
               </label>
               <span className="text-2xl font-black text-black">KSh {rent.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="80000" 
              step="500" 
              value={rent} 
              onChange={e => setRent(Number(e.target.value))} 
              className="w-full accent-urban-sand h-2 cursor-pointer" 
            />
          </div>
          
          <div className="premium-card p-10 bg-urban-charcoal text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-urban-sand mb-2">Upfront Cash Required</p>
              <p className="text-5xl font-black italic tracking-tighter">KSh {upfrontCosts.toLocaleString()}</p>
              <p className="text-xs opacity-50 uppercase mt-6 font-bold tracking-tight">Includes: 1 Month Rent + 2 Months Deposit + Setup Items</p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10">
               <ShieldCheck className="w-64 h-64" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className={`premium-card p-10 text-center border-t-8 shadow-2xl rounded-[2.5rem] transition-all duration-500 ${rating.color}`}>
             <div className="mb-6">{rating.icon}</div>
             <h3 className="text-3xl font-black uppercase italic tracking-tighter">{rating.label}</h3>
             <div className="mt-8 pt-8 border-t border-black/5 space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60">Survival Runway</p>
                  <p className="text-2xl font-black">{runway > 0 ? runway.toFixed(1) : "0"} Months</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60">Rent-to-Income</p>
                  <p className="text-2xl font-black">{Math.round(rentRatio * 100)}%</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSimulator;