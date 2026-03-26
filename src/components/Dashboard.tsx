import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShieldCheck, Map, Calculator, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ 
    income: 0, 
    savings: 0, 
    rent: 0, 
    area: "", 
    name: "Guest" 
  });

  useEffect(() => {
    setData({
      income: Number(localStorage.getItem('user_income')) || 0,
      savings: Number(localStorage.getItem('user_savings')) || 0,
      rent: Number(localStorage.getItem('user_rent')) || 0,
      area: localStorage.getItem('user_location') || "None",
      name: localStorage.getItem('user_name') || "User"
    });
  }, []);

  // DSS Calculation: Savings / (Rent + Estimated Food/Transport/Bills)
  const monthlyBurnRate = data.rent + 20000;
  const runway = monthlyBurnRate > 0 ? (data.savings / monthlyBurnRate).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-10 text-left font-sans selection:bg-urban-sand/30">
      
      {/* HEADER WITH PERSONALIZATION */}
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2 text-urban-sand animate-in fade-in slide-in-from-left-4 duration-500">
            <User className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Decision Hub Premium</span>
          </div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter text-black leading-none">
            Welcome, {data.name}.
          </h1>
          <p className="text-slate-500 italic mt-2">
            Relocation analysis for <span className="text-black font-bold uppercase">{data.area}</span>
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/')} 
          className="bg-white px-6 py-3 rounded-2xl border border-slate-100 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
        >
          Reset Analysis
        </button>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RUNWAY CARD */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp className="w-24 h-24" />
           </div>
           <p className="text-[10px] font-black uppercase text-slate-400 mb-8 tracking-[0.2em]">Financial Survival Runway</p>
           <p className="text-7xl font-black italic text-black tracking-tighter">
             {runway} <span className="text-sm font-medium uppercase tracking-normal not-italic text-slate-400">Months</span>
           </p>
           <div className="mt-10 flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest">
             <ShieldCheck className="w-4 h-4 text-green-500" /> 
             Safe Buffer Calculated
           </div>
        </div>

        {/* NAVIGATION STATS GRID */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div 
             className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group" 
             onClick={() => navigate('/matcher')}
           >
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <Map className="text-blue-500 w-6 h-6 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-black text-2xl uppercase italic tracking-tighter mb-2">Area Matcher</h4>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Scanning the Nairobi dataset for properties in <span className="text-black font-bold">{data.area}</span> near KSh {data.rent.toLocaleString()}.
              </p>
           </div>

           <div 
             className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group" 
             onClick={() => navigate('/simulator')}
           >
              <div className="bg-purple-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                <Calculator className="text-purple-500 w-6 h-6 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-black text-2xl uppercase italic tracking-tighter mb-2">Live Simulator</h4>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Tweak your KSh {data.income.toLocaleString()} monthly budget to optimize your runway.
              </p>
           </div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-20 pt-10 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
          Urbanly DSS — Data Integrity Verified
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;