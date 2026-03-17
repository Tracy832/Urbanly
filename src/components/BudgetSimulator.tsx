import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calculator, Home, Sofa, Utensils, Zap, 
  TrendingUp, TrendingDown, Target, Info, Sparkles, Bus 
} from 'lucide-react';

// --- DATA SCENARIOS (Decision Support Logic) ---
const INCOME = 100000;
const SAVINGS = 120000;
const TRANSPORT = 4400; 
const UTILITIES = 5000;  

const BudgetSimulator: React.FC = () => {
  const navigate = useNavigate();

  // 1. User Inputs (The Decision Variables)
  const [rent, setRent] = useState(20000);
  const [furnitureQuality, setFurnitureQuality] = useState(79500); 
  const [dailyFood, setDailyFood] = useState(500); 

  // 2. Calculations (The Model Logic)
  const monthlyFood = dailyFood * 30;
  const setupCost = rent + furnitureQuality; 
  const remainingSavings = SAVINGS - setupCost;
  const financialRunway = setupCost > SAVINGS ? 0 : Math.floor(SAVINGS / setupCost);

  const totalMonthlySpend = rent + TRANSPORT + monthlyFood + UTILITIES;
  const disposableIncome = INCOME - totalMonthlySpend;
  
  // FIX: Convert calculation to a Number so comparisons work correctly
  const savingsRate = Number(((disposableIncome / INCOME) * 100).toFixed(1));

  // 3. DSS Output Formatting (Risk Assessment)
  const getRiskScore = () => {
    if (rent > INCOME * 0.3 || setupCost > SAVINGS) return { score: 40, color: 'text-red-600', label: 'High Risk' };
    if (rent > INCOME * 0.25 || remainingSavings < 20000) return { score: 65, color: 'text-orange-500', label: 'Caution' };
    return { score: 90, color: 'text-green-600', label: 'Safe Move' };
  };

  const risk = getRiskScore();

  return (
    <div className="min-h-screen bg-urban-cream p-6 md:p-12 font-sans text-urban-charcoal relative">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-10 flex items-center gap-4 text-left">
          <button onClick={() => navigate('/dashboard')} className="hover:text-urban-sand transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">Budget Simulator</h1>
            <p className="text-urban-taupe font-medium text-sm">Adjust parameters to see real-time budget impact</p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* --- LEFT COLUMN: INPUT SLIDERS --- */}
          <div className="xl:col-span-8 space-y-8 text-left">
            <h2 className="text-lg font-black uppercase tracking-widest text-urban-taupe mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-urban-sand" /> Simulation Controls
            </h2>

            {/* Rent Slider */}
            <div className="premium-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1 w-full md:w-2/3">
                <div className="flex items-center gap-2"><Home className="w-5 h-5 text-urban-sand" /><label className="font-black">Monthly Rent</label></div>
                <p className="text-sm text-urban-taupe">Adjust to see affordability</p>
                <input 
                  type="range" min="5000" max="60000" step="1000" value={rent} 
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="w-full h-2 bg-urban-border rounded-lg appearance-none cursor-pointer accent-urban-sand"
                />
              </div>
              <div className="text-left md:text-right">
                 <p className="text-4xl font-black">KSh {rent.toLocaleString()}</p>
                 <p className="text-xs font-bold text-urban-taupe">Recommended: KSh 20,000</p>
              </div>
            </div>

            {/* Furniture Slider */}
            <div className="premium-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1 w-full md:w-2/3">
                <div className="flex items-center gap-2"><Sofa className="w-5 h-5 text-urban-sand" /><label className="font-black">Furniture Quality</label></div>
                <p className="text-sm text-urban-taupe">From basic to premium furnishings</p>
                <input 
                  type="range" min="39000" max="120000" step="500" value={furnitureQuality} 
                  onChange={(e) => setFurnitureQuality(Number(e.target.value))}
                  className="w-full h-2 bg-urban-border rounded-lg appearance-none cursor-pointer accent-urban-sand"
                />
              </div>
              <div className="text-left md:text-right">
                 <p className="text-4xl font-black">KSh {furnitureQuality.toLocaleString()}</p>
              </div>
            </div>

            {/* Food Slider */}
            <div className="premium-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1 w-full md:w-2/3">
                <div className="flex items-center gap-2"><Utensils className="w-5 h-5 text-urban-sand" /><label className="font-black">Daily Food Budget</label></div>
                <p className="text-sm text-urban-taupe">Monthly food expenses</p>
                <input 
                  type="range" min="200" max="3000" step="50" value={dailyFood} 
                  onChange={(e) => setDailyFood(Number(e.target.value))}
                  className="w-full h-2 bg-urban-border rounded-lg appearance-none cursor-pointer accent-urban-sand"
                />
              </div>
              <div className="text-left md:text-right">
                 <p className="text-4xl font-black">KSh {monthlyFood.toLocaleString()}</p>
                 <p className="text-xs font-bold text-urban-taupe">~KSh {dailyFood} per day</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: ANALYSIS & METRICS --- */}
          <div className="xl:col-span-4 space-y-10 text-left">
            <h2 className="text-lg font-black uppercase tracking-widest text-urban-taupe mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-urban-sand" /> Impact Analysis
            </h2>

            {/* Risk Assessment */}
            <div className="premium-card p-8 text-center space-y-4">
                <p className="text-sm font-black uppercase tracking-widest text-urban-taupe">Live Risk Assessment</p>
                <div className={`text-6xl font-black ${risk.color}`}>{risk.score}</div>
                <p className="text-xl font-bold">{risk.label}</p>
                <div className="w-full bg-urban-border h-3 rounded-full relative overflow-hidden">
                    <div className={`absolute inset-y-0 left-0 rounded-full transition-all ${risk.color === 'text-red-600' ? 'bg-red-600' : risk.color === 'text-orange-500' ? 'bg-orange-500' : 'bg-green-600'}`} style={{width: `${risk.score}%`}} />
                </div>
            </div>

            {/* Financial Metrics */}
            <div className="premium-card p-8 space-y-6">
                <p className="text-sm font-black uppercase tracking-widest text-urban-taupe">Financial Metrics</p>
                <div>
                   <label className="text-xs font-black uppercase text-urban-taupe">Setup Cost</label>
                   <p className="text-2xl font-bold">KSh {setupCost.toLocaleString()}</p>
                </div>
                <div>
                   <label className="text-xs font-black uppercase text-urban-taupe">Remaining Savings</label>
                   <p className={`text-2xl font-bold ${remainingSavings < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      KSh {remainingSavings.toLocaleString()}
                   </p>
                </div>
                <div>
                   <label className="text-xs font-black uppercase text-urban-taupe">Financial Runway</label>
                   <p className="text-4xl font-black italic">{financialRunway} months</p>
                </div>
            </div>

            {/* Quick Tips Logic Fixed */}
            <div className="bg-urban-sand text-white p-8 rounded-[2rem] space-y-4">
                <Sparkles className="w-8 h-8"/>
                <p className="font-bold text-sm">Quick Tip</p>
                <p className="text-xl font-medium leading-relaxed">
                   {savingsRate > 20 
                    ? `You're in a great position, saving ${savingsRate}% of your income.`
                    : savingsRate > 5
                    ? `You're saving ${savingsRate}% of your income. It's safe but watch out.`
                    : `Danger zone. Your savings rate is low (${savingsRate}%) and your runway is limited.`}
                </p>
            </div>
          </div>
        </div>

        {/* MONTHLY BREAKDOWN BAR CHART */}
        <section className="premium-card p-10 mt-12 text-left">
            <h3 className="text-sm font-black uppercase tracking-widest text-urban-taupe mb-8">Monthly Expense Breakdown (KSh {totalMonthlySpend.toLocaleString()})</h3>
            <div className="space-y-6">
              {[
                { label: "Rent", value: rent, icon: Home },
                { label: "Food", value: monthlyFood, icon: Utensils },
                { label: "Transport", value: TRANSPORT, icon: Bus },
                { label: "Utilities", value: UTILITIES, icon: Zap },
              ].map(item => {
                const percentage = ((item.value / INCOME) * 100).toFixed(1);
                return (
                  <div key={item.label} className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-2 w-40 font-bold">
                       <item.icon className="w-4 h-4 text-urban-sand"/> {item.label}
                    </div>
                    <div className="flex-1 bg-urban-border h-3 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 bg-urban-charcoal rounded-full" style={{width: `${percentage}%`}} />
                    </div>
                    <div className="w-40 text-right font-black text-urban-taupe text-sm">
                      {percentage}% | KSh {item.value.toLocaleString()}
                    </div>
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