import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  TrendingUp, 
  AlertTriangle, 
  Map, 
  Calculator, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // --- Mock Data (In a real app, this comes from a Global State or Database) ---
  const userData = {
    income: 50000,
    savings: 120000,
    rentBudget: 15000,
    transport: 5000,
    food: 10000,
    utilities: 4000,
    setupCost: 65000,
    location: "Ruaka"
  };

  // --- DSS Calculations ---
  const monthlyBurnRate = userData.rentBudget + userData.transport + userData.food + userData.utilities;
  const survivalPeriod = (userData.savings / monthlyBurnRate).toFixed(1);
  const riskRatio = (userData.rentBudget / userData.income) * 100;

  // Determine Score & Color
  const getScoreData = () => {
    if (riskRatio > 35) return { score: 45, label: "High Risk", color: "text-red-500", border: "border-red-500" };
    if (riskRatio > 25) return { score: 72, label: "Almost There", color: "text-yellow-500", border: "border-yellow-500" };
    return { score: 94, label: "Safe to Move", color: "text-green-500", border: "border-green-500" };
  };

  const status = getScoreData();

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10 font-sans text-slate-900">
      
      {/* HEADER */}
      <header className="max-w-6xl mx-auto flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Moving Decision Hub</h1>
          <p className="text-slate-500 font-medium italic">Welcome back! Here's your moving analysis.</p>
        </div>
        <button 
          onClick={() => navigate('/advisor')}
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 font-bold text-sm hover:bg-slate-50 transition-all"
        >
          <Settings className="w-4 h-4" /> Edit Profile
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Analysis & Burn Rate */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* RISK SCORE CARD */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-center">
             <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-[10px] mb-4 ${status.border}`}>
                <span className={`text-4xl font-black ${status.color}`}>{status.score}</span>
             </div>
             <h3 className={`text-xl font-bold uppercase tracking-tight ${status.color}`}>{status.label}</h3>
          </div>

          {/* FINANCIAL RUNWAY */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Financial Runway</h3>
              <TrendingUp className="text-green-500 w-5 h-5" />
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Survival Period (No Income)</p>
                <p className="text-3xl font-black text-slate-800">{survivalPeriod} <span className="text-sm font-medium">Months</span></p>
              </div>
              <div className="pt-6 border-t border-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Monthly Burn Rate</p>
                <p className="text-3xl font-black text-slate-800">Ksh {monthlyBurnRate.toLocaleString()}</p>
              </div>
              {Number(survivalPeriod) < 3 && (
                <div className="flex gap-3 bg-red-50 p-4 rounded-2xl text-red-600 border border-red-100">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <p className="text-xs font-bold leading-tight">Consider building a larger emergency fund.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Budget & Navigation */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* BUDGET BREAKDOWN */}
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-8">
              Budget Breakdown for "{userData.location}"
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-urban-sand uppercase tracking-widest">Rent</p>
                <p className="text-xl font-black">Ksh {userData.rentBudget.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-urban-sand uppercase tracking-widest">Transport</p>
                <p className="text-xl font-black">Ksh {userData.transport.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-urban-sand uppercase tracking-widest">Food</p>
                <p className="text-xl font-black">Ksh {userData.food.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-urban-sand uppercase tracking-widest">Utilities</p>
                <p className="text-xl font-black">Ksh {userData.utilities.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">One-Time Setup</p>
                <p className="text-xl font-black">Ksh {userData.setupCost.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Disposable</p>
                <p className="text-xl font-black">Ksh {(userData.income - monthlyBurnRate).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group cursor-pointer" onClick={() => navigate('/matcher')}>
              <Map className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="font-bold text-lg mb-2">Explore Areas</h4>
              <p className="text-xs text-slate-400 mb-4 font-medium">Compare neighborhoods and find the perfect location.</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-500">Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group cursor-pointer" onClick={() => navigate('/simulator')}>
              <Calculator className="w-8 h-8 text-purple-500 mb-4" />
              <h4 className="font-bold text-lg mb-2">Budget Simulator</h4>
              <p className="text-xs text-slate-400 mb-4 font-medium">Adjust sliders to see real-time budget impact.</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-purple-500">Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group cursor-pointer" onClick={() => navigate('/shopping-list')}>
              <ShoppingBag className="w-8 h-8 text-orange-500 mb-4" />
              <h4 className="font-bold text-lg mb-2">Shopping List</h4>
              <p className="text-xs text-slate-400 mb-4 font-medium">View your furniture needs and vendor options.</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-500">Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></div>
            </div>
          </div>
        </div>
      </main>

      {/* CHATBOT FLOATING ICON */}
      <div className="fixed bottom-8 right-8 z-50">
        {isChatOpen && (
          <div className="absolute bottom-20 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="bg-black p-6 text-white text-center">
              <h5 className="font-black text-sm uppercase">Urbanly Assistant</h5>
            </div>
            <div className="p-6 h-64 overflow-y-auto bg-slate-50 text-xs font-medium space-y-4">
              <p className="bg-white p-3 rounded-2xl shadow-sm italic text-slate-600">
                Hi! I'm your moving assistant. Ask me about cheap movers, best areas, saving money, safety, or budget tips!
              </p>
            </div>
            <div className="p-4 border-t flex gap-2">
              <input type="text" placeholder="Type query..." className="flex-1 bg-slate-50 border-none rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-urban-sand" />
              <button className="bg-black text-white p-3 rounded-xl"><ArrowRight className="w-4 h-4"/></button>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-black text-white p-6 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all cursor-pointer"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;