import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShieldCheck, Map, Calculator, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ income: 0, savings: 0, rent: 0, area: "" });

  useEffect(() => {
    setData({
      income: Number(localStorage.getItem('user_income')) || 0,
      savings: Number(localStorage.getItem('user_savings')) || 0,
      rent: Number(localStorage.getItem('user_rent')) || 0,
      area: localStorage.getItem('user_location') || "None"
    });
  }, []);

  const runway = (data.savings / (data.rent + 20000)).toFixed(1);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-10 text-left font-sans">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Decision Hub.</h1>
        <p className="text-slate-500 italic">Relocation analysis for <span className="text-black font-bold uppercase">{data.area}</span></p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* RUNWAY CARD */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
           <p className="text-[10px] font-black uppercase text-slate-400 mb-6">Financial Runway</p>
           <p className="text-5xl font-black italic">{runway} <span className="text-sm font-medium">Months</span></p>
           <div className="mt-6 flex items-center gap-2 text-green-500 font-bold text-xs uppercase"><ShieldCheck className="w-4 h-4"/> Buffer calculated</div>
        </div>

        {/* STATS GRID */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all cursor-pointer" onClick={() => navigate('/matcher')}>
              <Map className="text-blue-500 mb-4" />
              <h4 className="font-bold text-lg">Area Matcher</h4>
              <p className="text-xs text-slate-400">Finding properties in {data.area} for KSh {data.rent.toLocaleString()}</p>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all cursor-pointer" onClick={() => navigate('/simulator')}>
              <Calculator className="text-purple-500 mb-4" />
              <h4 className="font-bold text-lg">Live Simulator</h4>
              <p className="text-xs text-slate-400">Tweak your KSh {data.income.toLocaleString()} monthly budget.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;