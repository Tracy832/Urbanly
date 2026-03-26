import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Sofa, Calculator, Home, CheckCircle } from 'lucide-react';

// --- LOCAL DATA SET & CALCULATOR ---
const INTERNAL_FURNITURE_PRICES: Record<string, number> = {
  'Television': 28000,
  'Refrigerator': 32000,
  'Microwave': 9500,
  'Sofa Set': 45000,
  'Bed Frame': 15000,
  'Gas Cooker': 12000
};

interface SimulatorProps {
  selectedInventory: string[];
}

const BudgetSimulator: React.FC<SimulatorProps> = ({ selectedInventory }) => {
  const navigate = useNavigate();

  // 1. DYNAMIC CALCULATION: Sum prices for selected items
  const furnitureSetupTotal = selectedInventory.reduce((sum, itemName) => {
    return sum + (INTERNAL_FURNITURE_PRICES[itemName] || 0);
  }, 0);

  // 2. INPUT STATE
  const [income] = useState(100000); 
  const [savings] = useState(120000); 
  const [rent, setRent] = useState(20000);
  const [dailyFoodBudget, setDailyFoodBudget] = useState(500);

  // 3. CALCULATION LOGIC
  const monthlyFood = dailyFoodBudget * 30;
  const UTILITIES = 5000;
  const TRANSPORT = 4400;

  const moveInCosts = rent + furnitureSetupTotal; 
  const remainSavings = savings - moveInCosts;
  const totalMonthlySpend = rent + monthlyFood + UTILITIES + TRANSPORT;
  const disposableIncome = income - totalMonthlySpend;
  const savingsRate = Number(((disposableIncome / income) * 100).toFixed(1));

  const riskColor = savingsRate < 0 ? "border-red-600" : savingsRate < 10 ? "border-orange-500" : "border-urban-sand";
  const riskText = savingsRate < 0 ? "Dangerous" : savingsRate < 10 ? "Cautious" : "Safe Move";

  return (
    <div className="min-h-screen bg-urban-cream p-6 md:p-12 font-sans text-urban-charcoal relative text-left">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="hover:text-urban-sand transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-black">Budget Simulator</h1>
            <p className="text-urban-taupe font-medium text-sm">Adjust parameters to see real-time budget impact</p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          <div className="xl:col-span-8 space-y-8">
            <h2 className="text-lg font-black uppercase tracking-widest text-urban-taupe mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-urban-sand" /> Simulation Controls
            </h2>

            {/* Monthly Rent */}
            <div className="premium-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white shadow-xl">
              <div className="space-y-1 w-full md:w-2/3">
                <div className="flex items-center gap-2"><Home className="w-5 h-5 text-urban-sand"/><label className="font-black text-black">Monthly Rent</label></div>
                <input type="range" min="5000" max="60000" step="1000" value={rent} onChange={(e) => setRent(Number(e.target.value))} className="w-full h-2 bg-urban-border rounded-lg appearance-none cursor-pointer accent-urban-sand" />
              </div>
              <div className="text-left md:text-right">
                 <p className="text-3xl font-black text-black">KSh {rent.toLocaleString()}</p>
              </div>
            </div>

            {/* NEW SECTION: Inventory Breakdown */}
            <div className="premium-card p-8 bg-white shadow-xl space-y-6">
               <h3 className="font-black uppercase text-xs text-urban-sand flex items-center gap-2">
                 <Sofa className="w-4 h-4" /> Selected Inventory Breakdown
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {selectedInventory.length > 0 ? selectedInventory.map(item => (
                   <div key={item} className="flex justify-between items-center p-4 bg-black/5 rounded-2xl border border-black/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-urban-sand" />
                        <span className="font-bold text-sm text-black">{item}</span>
                      </div>
                      <span className="font-black text-sm text-urban-taupe">KSh {INTERNAL_FURNITURE_PRICES[item]?.toLocaleString()}</span>
                   </div>
                 )) : (
                   <p className="text-urban-taupe text-sm italic">No items selected in Advisor.</p>
                 )}
               </div>
            </div>
          </div>

          <div className="xl:col-span-4 space-y-10">
            <div className="premium-card p-10 text-center space-y-4 bg-white shadow-xl">
                <p className="text-xs font-black uppercase tracking-widest text-urban-taupe">Risk Assessment</p>
                <div className={`w-32 h-32 rounded-full border-[10px] ${riskColor} mx-auto flex items-center justify-center`}>
                    <p className="text-4xl font-black text-black">{savingsRate > 0 ? savingsRate : 0}%</p>
                </div>
                <p className="text-xl font-bold text-black">{riskText}</p>
            </div>

            <div className="premium-card p-10 space-y-6 text-left bg-urban-charcoal text-white">
                <p className="text-xs font-black uppercase tracking-widest text-urban-taupe/70">Calculated Move-In Cost</p>
                <div className="bg-urban-sand/10 p-4 border border-urban-sand rounded-xl flex items-center justify-between">
                    <p className="font-black">Inventory Total</p>
                    <p className="text-2xl font-black text-urban-sand">KSh {furnitureSetupTotal.toLocaleString()}</p>
                </div>
                <div>
                   <label className="text-xs font-black uppercase text-urban-taupe">Total Setup Cost</label>
                   <p className="text-3xl font-black">KSh {moveInCosts.toLocaleString()}</p>
                </div>
            </div>
          </div>
        </div>

        <section className="premium-card p-12 mt-12 bg-white shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-urban-taupe mb-8">Monthly Breakdown</h3>
            <div className="space-y-6">
              {[ { label: "Rent", value: rent }, { label: "Food", value: monthlyFood }, { label: "Transport", value: TRANSPORT }, { label: "Utilities", value: UTILITIES } ].map(item => {
                const percentage = ((item.value / income) * 100).toFixed(1);
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-24 text-left font-bold text-black">{item.label}</div>
                    <div className="flex-1 bg-urban-border h-3 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 bg-urban-sand rounded-full" style={{width: `${percentage}%`}} />
                    </div>
                    <div className="w-40 text-right font-black text-urban-taupe text-sm">{percentage}% | KSh {item.value.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
        </section>
      </div>
    </div>
  );
};

export default BudgetSimulator;