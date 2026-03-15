import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';

const BudgetSimulator: React.FC = () => {
  const navigate = useNavigate();
  const [rent, setRent] = useState(15000);
  const total = rent + 5000 + 10000 + 4000; // Simplified calculation

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 font-black text-xs uppercase text-slate-400 mb-10 tracking-widest"><ArrowLeft className="w-4 h-4" /> Back</button>
        <div className="bg-white rounded-[3rem] p-12 shadow-xl">
          <Calculator className="w-12 h-12 text-urban-sand mb-6" />
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Budget Simulator.</h2>
          <div className="space-y-10">
            <div>
              <div className="flex justify-between font-black text-sm uppercase mb-4"><span>Rent Range</span><span>KSh {rent}</span></div>
              <input type="range" min="5000" max="60000" value={rent} onChange={(e) => setRent(Number(e.target.value))} className="w-full accent-urban-sand" />
            </div>
            <div className="pt-10 border-t">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Estimated Monthly Total</p>
              <p className="text-6xl font-black tracking-tighter italic">KSh {total.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSimulator;