import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ShieldCheck, Bus, DollarSign } from 'lucide-react';

const locations = [
  { name: "Ruaka", rent: "15-25k", safety: "High", commute: "20 mins", tag: "Best Value" },
  { name: "Kasarani", rent: "10-18k", safety: "Medium", commute: "45 mins", tag: "Affordable" },
  { name: "Kilimani", rent: "35-60k", safety: "High", commute: "10 mins", tag: "Premium" },
];

const LocationMatcher: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white p-10">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 font-black text-xs uppercase text-slate-400 mb-10 tracking-widest hover:text-black"><ArrowLeft className="w-4 h-4" /> Back to Hub</button>
      <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-10">Neighborhood Matcher.</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map(loc => (
          <div key={loc.name} className="p-8 rounded-[2.5rem] border-2 border-slate-50 bg-slate-50/30 hover:border-urban-sand transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-urban-sand bg-white px-3 py-1 rounded-full shadow-sm">{loc.tag}</span>
            <h3 className="text-3xl font-black mt-4 mb-6">{loc.name}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-bold"><DollarSign className="w-4 h-4 text-green-500" /> Rent: {loc.rent}</div>
              <div className="flex items-center gap-3 text-sm font-bold"><ShieldCheck className="w-4 h-4 text-blue-500" /> Safety: {loc.safety}</div>
              <div className="flex items-center gap-3 text-sm font-bold"><Bus className="w-4 h-4 text-orange-500" /> Commute: {loc.commute}</div>
            </div>
            <button className="w-full mt-8 py-4 bg-black text-white rounded-xl font-bold text-xs uppercase tracking-widest">Select Area</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationMatcher;