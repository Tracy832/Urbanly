import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  TrendingUp, 
  AlertTriangle, 
  Map, 
  Calculator, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // --- 1. ACTUAL DATA RETRIEVAL ---
  // We pull the figures entered in the Advisor from localStorage
  const [userData, setUserData] = useState({
    income: 0,
    savings: 0,
    rentBudget: 0,
    location: "Nairobi",
    inventoryCount: 0
  });

  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem('urbanly_items') || '[]');
    // In a real app, you'd also save the numeric fields from Advisor. 
    // For now, we'll pull what's available or use the validated defaults.
    setUserData({
      income: Number(localStorage.getItem('user_income')) || 65000,
      savings: Number(localStorage.getItem('user_savings')) || 120000,
      rentBudget: Number(localStorage.getItem('user_rent')) || 20000,
      location: localStorage.getItem('user_location') || "Ruaka",
      inventoryCount: savedInventory.length
    });
  }, []);

  // --- 2. KENYAN CONTEXT DSS CALCULATIONS ---
  const FIXED_TRANSPORT = 5000;
  const FIXED_UTILITIES = 4000;
  const ESTIMATED_FOOD = 12000;
  
  const monthlyBurnRate = userData.rentBudget + FIXED_TRANSPORT + ESTIMATED_FOOD + FIXED_UTILITIES;
  
  // Rule: You need 2.5x - 3x rent + inventory costs to move safely
  const estimatedSetupCost = (userData.rentBudget * 3) + (userData.inventoryCount * 12000); 
  
  // Financial Runway (Survival Months)
  const remainingSavings = userData.savings - estimatedSetupCost;
  const survivalPeriod = remainingSavings > 0 ? (remainingSavings / monthlyBurnRate).toFixed(1) : "0";
  
  const riskRatio = (userData.rentBudget / userData.income) * 100;

  // --- 3. RISK SCORE LOGIC (Based on your Safe Rule of Thumb) ---
  const getScoreData = () => {
    const isOverstretched = riskRatio > 40;
    const hasLowBuffer = Number(survivalPeriod) < 3;
    const cannotAffordMove = remainingSavings < 0;

    if (cannotAffordMove || isOverstretched) {
      return { 
        score: 35, 
        label: "High Risk", 
        color: "text-red-500", 
        border: "border-red-500",
        advice: "Your move-in costs exceed savings or rent is >40% of income."
      };
    }
    if (hasLowBuffer) {
      return { 
        score: 68, 
        label: "Save More", 
        color: "text-orange-500", 
        border: "border-orange-500",
        advice: "You can move, but your emergency fund is below the 3-month safety mark."
      };
    }
    return { 
      score: 96, 
      label: "Safe to Move", 
      color: "text-green-500", 
      border: "border-green-500",
      advice: "You have upfront costs covered and a healthy survival buffer."
    };
  };

  const status = getScoreData();

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10 font-sans text-slate-900 text-left">
      
      {/* HEADER */}
      <header className="max-w-6xl mx-auto flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Decision Hub.</h1>
          <p className="text-slate-500 font-medium italic mt-2">Analysis for relocation to <span className="text-black font-bold">{userData.location}</span></p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 font-bold text-sm hover:bg-slate-50 transition-all"
        >
          <Settings className="w-4 h-4" /> Reset Advisor
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Risk & Runway */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-center flex flex-col items-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Affordability Score</p>
             <div className={`inline-flex items-center justify-center w-36 h-36 rounded-full border-[12px] mb-6 ${status.border} transition-all duration-1000`}>
                <span className={`text-5xl font-black ${status.color}`}>{status.score}</span>
             </div>
             <h3 className={`text-xl font-bold uppercase tracking-tight ${status.color}`}>{status.label}</h3>
             <p className="text-xs font-medium text-slate-400 mt-2 px-4 leading-relaxed">{status.advice}</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Survival Runway</h3>
              <ShieldCheck className={Number(survivalPeriod) >= 3 ? "text-green-500" : "text-orange-500"} />
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Post-Move Buffer</p>
                <p className="text-3xl font-black text-slate-800">{survivalPeriod} <span className="text-sm font-medium uppercase">Months</span></p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 italic">Target: 3-6 Months</p>
              </div>
              <div className="pt-6 border-t border-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Disposable Income</p>
                <p className="text-3xl font-black text-slate-800">Ksh {(userData.income - monthlyBurnRate).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Costs & Tools */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-8">
              Simulated Moving Costs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-urban-sand uppercase tracking-widest">Target Rent</p>
                <p className="text-xl font-black">Ksh {userData.rentBudget.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-urban-sand uppercase tracking-widest">Monthly Burn</p>
                <p className="text-xl font-black">Ksh {monthlyBurnRate.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-urban-sand uppercase tracking-widest">Inventory</p>
                <p className="text-xl font-black">{userData.inventoryCount} Items</p>
              </div>
              <div className="space-y-1 pt-4 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upfront Needed</p>
                <p className="text-xl font-black text-red-500">Ksh {estimatedSetupCost.toLocaleString()}</p>
              </div>
              <div className="space-y-1 pt-4 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Savings</p>
                <p className="text-xl font-black text-slate-800">Ksh {userData.savings.toLocaleString()}</p>
              </div>
              <div className="space-y-1 pt-4 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gap/Surplus</p>
                <p className={`text-xl font-black ${remainingSavings < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  Ksh {remainingSavings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group cursor-pointer" 
              onClick={() => navigate('/matcher')}
            >
              <Map className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="font-bold text-lg mb-2 italic">Area Matches</h4>
              <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">View neighborhoods in Nairobi matching your KSh {userData.rentBudget.toLocaleString()} budget.</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-500">
                View Matches <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group cursor-pointer" 
              onClick={() => navigate('/simulator')}
            >
              <Calculator className="w-8 h-8 text-purple-500 mb-4" />
              <h4 className="font-bold text-lg mb-2 italic">Live Simulator</h4>
              <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">Tweak your food and rent sliders to optimize your {survivalPeriod} month runway.</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-purple-500">
                Adjust Budget <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CHATBOT ICON (Keep as is) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-black text-white p-6 rounded-full shadow-2xl hover:scale-110 transition-all cursor-pointer"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;