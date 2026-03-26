import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Sofa, Calculator, Home, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

// --- Kenyan Market Constants ---
const INTERNAL_FURNITURE_PRICES: Record<string, number> = {
  'Television': 28000,
  'Refrigerator': 32000,
  'Microwave': 9500,
  'Sofa Set': 45000,
  'Bed Frame': 15000,
  'Gas Cooker': 12000
};

const FIXED_UTILITIES = 5000;
const FIXED_TRANSPORT = 4400;

interface SimulatorProps {
  selectedInventory: string[];
  // Assuming these are passed from parent state or localStorage
  userIncome?: number;
  userSavings?: number;
  userTargetRent?: number;
}

const BudgetSimulator: React.FC<SimulatorProps> = ({ 
  selectedInventory, 
  userIncome = 65000, 
  userSavings = 100000, 
  userTargetRent = 20000 
}) => {
  const navigate = useNavigate();

  // 1. DYNAMIC INPUTS (Sliders initialized with Advisor data)
  const [rent, setRent] = useState(userTargetRent);
  const [dailyFoodBudget, setDailyFoodBudget] = useState(500);

  // 2. CORE CALCULATIONS (The Decision Logic)
  const furnitureTotal = selectedInventory.reduce((sum, itemName) => {
    return sum + (INTERNAL_FURNITURE_PRICES[itemName] || 0);
  }, 0);

  // Upfront cost logic: 1 month rent + 2 months deposit + Furniture + Utilities/Agent reserves (approx 5k)
  const moveInUpfrontRequired = (rent * 3) + furnitureTotal + 5000;
  
  const monthlyFood = dailyFoodBudget * 30;
  const totalMonthlySpend = rent + monthlyFood + FIXED_UTILITIES + FIXED_TRANSPORT;
  const disposableIncome = userIncome - totalMonthlySpend;
  
  // Financial Runway: How many months can user survive on savings after moving in?
  const remainingSavings = userSavings - moveInUpfrontRequired;
  const runwayMonths = remainingSavings > 0 ? (remainingSavings / totalMonthlySpend).toFixed(1) : "0";

  // 3. DSS RISK ENGINE
  const getRiskData = () => {
    const rentRatio = (rent / userIncome) * 100;
    
    if (remainingSavings < 0 || rentRatio > 45) {
      return { 
        level: "High Risk", 
        color: "text-red-600", 
        border: "border-red-600",
        bg: "bg-red-50",
        icon: <AlertTriangle className="w-6 h-6" />,
        advice: "DANGER: Your upfront costs exceed your savings, or rent is taking up too much of your income. You need to save more."
      };
    }
    if (Number(runwayMonths) < 3 || rentRatio > 30) {
      return { 
        level: "Cautious", 
        color: "text-orange-500", 
        border: "border-orange-500",
        bg: "bg-orange-50",
        icon: <AlertTriangle className="w-6 h-6" />,
        advice: "WARNING: You can afford to move, but your safety net is thin. Avoid luxury spending for the first 3 months."
      };
    }
    return { 
      level: "Safe Move", 
      color: "text-green-600", 
      border: "border-green-600",
      bg: "bg-green-50",
      icon: <ShieldCheck className="w-6 h-6" />,
      advice: "EXCELLENT: You have a healthy emergency fund and your rent-to-income ratio is optimal."
    };
  };

  const risk = getRiskData();

  return (
    <div className="min-h-screen bg-urban-cream p-6 md:p-12 font-sans text-urban-charcoal relative text-left">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="hover:text-urban-sand transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-black leading-none">Budget Simulator</h1>
            <p className="text-urban-taupe font-medium text-sm mt-1">Live analysis based on your KSh {userIncome.toLocaleString()} income</p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* LEFT: CONTROLS */}
          <div className="xl:col-span-8 space-y-8">
            <h2 className="text-lg font-black uppercase tracking-widest text-urban-taupe mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-urban-sand" /> Decision Controls
            </h2>

            {/* Rent Slider */}
            <div className="premium-card p-8 bg-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="w-full md:w-2/3 space-y-2">
                <div className="flex items-center gap-2 font-black"><Home className="w-5 h-5 text-urban-sand"/> Target Rent</div>
                <input type="range" min="5000" max="80000" step="1000" value={rent} onChange={(e) => setRent(Number(e.target.value))} className="w-full h-2 bg-urban-border rounded-lg appearance-none cursor-pointer accent-urban-sand" />
              </div>
              <p className="text-3xl font-black text-black">KSh {rent.toLocaleString()}</p>
            </div>

            {/* Inventory Breakdown */}
            <div className="premium-card p-8 bg-white shadow-xl space-y-6">
               <h3 className="font-black uppercase text-xs text-urban-sand flex items-center gap-2">
                 <Sofa className="w-4 h-4" /> Selected Inventory Details
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
                   <p className="text-urban-taupe text-sm italic">No items selected.</p>
                 )}
               </div>
            </div>
          </div>

          {/* RIGHT: RISK & TOTALS */}
          <div className="xl:col-span-4 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-widest text-urban-taupe flex items-center gap-2">
                <Target className="w-5 h-5 text-urban-sand" /> Analysis
            </h2>

            {/* Visual Decision Card */}
            <div className={`premium-card p-8 border-t-8 ${risk.border} ${risk.bg} shadow-xl text-center space-y-4`}>
                <div className={`${risk.color} flex justify-center`}>{risk.icon}</div>
                <h3 className={`text-3xl font-black uppercase italic ${risk.color}`}>{risk.level}</h3>
                <p className="text-sm font-bold text-urban-charcoal leading-relaxed">{risk.advice}</p>
                <div className="pt-4 border-t border-black/5">
                   <p className="text-[10px] font-black uppercase text-urban-taupe">Est. Post-Move Runway</p>
                   <p className="text-2xl font-black">{runwayMonths} Months</p>
                </div>
            </div>

            {/* Move-In Total Card */}
            <div className="premium-card p-8 bg-urban-charcoal text-white shadow-xl space-y-6">
                <div>
                   <label className="text-[10px] font-black uppercase text-urban-taupe">Upfront Cash Needed</label>
                   <p className="text-4xl font-black italic text-urban-sand">KSh {moveInUpfrontRequired.toLocaleString()}</p>
                   <p className="text-[10px] text-white/50 mt-1 uppercase font-bold tracking-tighter">Incl. Rent, 2x Deposit & Furniture</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                   <label className="text-[10px] font-black uppercase text-urban-taupe">Remaining Post-Move Savings</label>
                   <p className={`text-2xl font-black ${remainingSavings < 0 ? 'text-red-400' : 'text-green-400'}`}>
                     KSh {remainingSavings.toLocaleString()}
                   </p>
                </div>
            </div>
          </div>
        </div>

        {/* MONTHLY CHART */}
        <section className="premium-card p-12 mt-12 bg-white shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-urban-taupe mb-8">Monthly Recurring Spending</h3>
            <div className="space-y-6">
              {[ { label: "Rent", value: rent }, { label: "Food", value: monthlyFood }, { label: "Transport", value: FIXED_TRANSPORT }, { label: "Utilities", value: FIXED_UTILITIES } ].map(item => {
                const percentage = ((item.value / userIncome) * 100).toFixed(1);
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-24 text-left font-bold text-black">{item.label}</div>
                    <div className="flex-1 bg-urban-border h-3 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 bg-urban-sand rounded-full transition-all duration-700" style={{width: `${percentage}%`}} />
                    </div>
                    <div className="w-48 text-right font-black text-urban-taupe text-sm">KSh {item.value.toLocaleString()} ({percentage}%)</div>
                  </div>
                );
              })}
            </div>
            <div className="h-px bg-urban-border my-8" />
            <div className="flex justify-between items-center">
               <span className="text-xl font-bold uppercase tracking-tighter">Net Monthly Savings</span>
               <span className={`text-4xl font-black ${disposableIncome < 0 ? 'text-red-600' : 'text-green-600'}`}>
                 KSh {disposableIncome.toLocaleString()}
               </span>
            </div>
        </section>
      </div>
    </div>
  );
};

export default BudgetSimulator;