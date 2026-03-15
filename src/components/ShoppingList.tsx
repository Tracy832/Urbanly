import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ExternalLink } from 'lucide-react';

const ShoppingList: React.FC = () => {
  const navigate = useNavigate();
  const missingItems = ["Bed", "Gas Cooker", "Fridge"];

  return (
    <div className="min-h-screen bg-white p-10">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 font-black text-xs uppercase text-slate-400 mb-10 tracking-widest"><ArrowLeft className="w-4 h-4" /> Back</button>
      <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-10">Shopping List.</h1>
      <div className="space-y-4">
        {missingItems.map(item => (
          <div key={item} className="p-6 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><ShoppingCart className="w-5 h-5 text-urban-sand" /></div>
              <span className="font-bold text-lg">{item}</span>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black">View Vendors <ExternalLink className="w-3 h-3" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;