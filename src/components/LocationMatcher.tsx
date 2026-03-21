import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, ShieldCheck, Bus,
  TrendingUp, ChevronRight, X, CheckCircle2, Info
} from 'lucide-react';

const NEIGHBORHOODS = [
  { 
    id: '1', name: "Ruaka", vibe: "High Student Density", 
    description: "Vibrant and energetic, perfect for social bachelors and students. Known for modern apartments and active nightlife.",
    status: 'Affordable', transportSacco: "Super Metro", transportFare: 100, rent: 15000, safetyRating: 4, rentTrend: "+11.1%",
    amenities: ["Fiber Internet", "Modern Gyms", "Churches", "Quick Mart", "Nightlife Hubs"]
  },
  { 
    id: '2', name: "Rongai", vibe: "Quiet Family Area", 
    description: "A peaceful suburban escape with fresh air and a strong sense of community, ideal for families.",
    status: 'Affordable', transportSacco: "Prestige Shuttle", transportFare: 120, rent: 14000, safetyRating: 3, rentTrend: "+9.5%",
    amenities: ["Spacious Compounds", "Schools nearby", "Churches & Mosques", "Clean Water Supply", "Nature Trails"]
  },
  { 
    id: '3', name: "Kasarani", vibe: "Mixed Residential", 
    description: "A balanced urban center catering to both young professionals and students with easy highway access.",
    status: 'Affordable', transportSacco: "Embassava Sacco", transportFare: 70, rent: 18000, safetyRating: 4, rentTrend: "+12.5%",
    amenities: ["Malls", "Sports Complex", "Reliable Electricity", "Health Clinics", "Boda Boda Stages"]
  },
];

const LocationMatcher: React.FC = () => {
  const navigate = useNavigate();
  const [maxRent, setMaxRent] = useState(20000);
  const [selectedSafety, setSelectedSafety] = useState(1);
  const [activeLocation, setActiveLocation] = useState<typeof NEIGHBORHOODS[0] | null>(null);

  return (
    <div className="min-h-screen bg-urban-cream p-6 md:p-12 font-sans text-urban-charcoal relative">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-10 flex items-center gap-4 text-left">
          <button onClick={() => navigate('/dashboard')} className="hover:text-urban-sand transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">Location Matcher</h1>
            <p className="text-urban-taupe font-medium text-sm">Find the perfect neighborhood for your budget</p>
          </div>
        </header>

        {/* FILTER SECTION */}
        <section className="premium-card p-8 mb-10 shadow-sm border border-urban-border text-left">
          <h2 className="text-xl font-bold mb-8">Filter Locations</h2>
          
          <div className="space-y-8">
            {/* Rent Input Box */}
            <div className="space-y-3">
              <label className="text-sm font-bold">Max Rent (KSh)</label>
              <div className="w-full max-w-md p-4 bg-black/5 rounded-xl border border-black/5 font-bold text-lg">
                {maxRent.toLocaleString()}
              </div>
              <input 
                type="range" min="5000" max="60000" step="1000" 
                value={maxRent} onChange={(e) => setMaxRent(Number(e.target.value))}
                className="w-full max-w-md h-1.5 bg-urban-border rounded-lg appearance-none cursor-pointer accent-urban-sand"
              />
            </div>

            {/* Segmented Safety Selector (FIXED CODE) */}
            <div className="space-y-3">
              <label className="text-sm font-bold">Minimum Safety Rating</label>
              <div className="flex bg-black/5 p-1 rounded-xl max-w-2xl">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedSafety(num)}
                    className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                      selectedSafety === num 
                      ? 'bg-urban-sand text-white shadow-md' 
                      : 'text-urban-charcoal hover:bg-black/5'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-2">
              {['Near Church', 'Near Mosque', 'Fibre Internet Available'].map((label) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-2 border-urban-border accent-urban-sand" />
                  <span className="text-sm font-bold">{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <p className="mt-8 text-sm font-medium text-urban-taupe">Showing 3 of 5 areas</p>
        </section>

        {/* RESULTS FEED */}
        <div className="space-y-6">
          {NEIGHBORHOODS.map(loc => (
            <div key={loc.id} className="premium-card p-10 group hover:border-urban-sand transition-all relative text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Neighborhood Info */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-black">{loc.name}</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                      ✓ Affordable
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-urban-taupe font-bold text-sm italic">
                    <MapPin className="w-4 h-4 text-urban-sand" /> {loc.vibe}
                  </div>
                  <div className="flex items-center gap-2 text-urban-charcoal font-bold text-sm">
                    <Bus className="w-4 h-4 text-blue-500" /> {loc.transportSacco} - KSh {loc.transportFare}
                  </div>
                </div>

                {/* Safety & Trend */}
                <div className="lg:col-span-4 flex flex-col justify-center border-l border-urban-border pl-8">
                   <div className="mb-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-urban-taupe mb-1">Safety</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <ShieldCheck key={star} className={`w-4 h-4 ${star <= loc.safetyRating ? 'text-urban-sand fill-urban-sand' : 'text-urban-border'}`} />
                        ))}
                      </div>
                   </div>
                   <div className="pt-4 border-t border-urban-border">
                      <p className="text-[10px] font-black uppercase tracking-widest text-urban-taupe mb-1">Rent Trend</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-black text-green-600">{loc.rentTrend}</span>
                      </div>
                   </div>
                </div>

                {/* Price & Modal Trigger */}
                <div className="lg:col-span-3 flex flex-col items-end justify-center">
                  <p className="text-4xl font-black tracking-tighter">KSh {loc.rent.toLocaleString()}</p>
                  <p className="text-xs font-bold text-urban-taupe mb-6">per month</p>
                  <button 
                    onClick={() => setActiveLocation(loc)}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-urban-sand hover:underline transition-all"
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- POP-UP MODAL (View Details) --- */}
      {activeLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-urban-charcoal/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-urban-cream w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl premium-card animate-in zoom-in-95 duration-300 text-left">
            <div className="p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">{activeLocation.name}</h2>
                  <p className="text-urban-sand font-black uppercase tracking-widest text-xs mt-2 underline underline-offset-4">{activeLocation.vibe}</p>
                </div>
                <button onClick={() => setActiveLocation(null)} className="p-3 bg-white rounded-full shadow-md hover:bg-urban-sand hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-6 rounded-[2rem] border border-urban-border">
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-urban-taupe mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Area Insights
                  </h4>
                  <p className="text-urban-charcoal font-medium leading-relaxed italic">"{activeLocation.description}"</p>
                </div>

                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-urban-taupe mb-4">Neighborhood Amenities</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {activeLocation.amenities.map(item => (
                      <div key={item} className="flex items-center gap-3 bg-urban-sand/5 p-4 rounded-2xl">
                        <CheckCircle2 className="w-4 h-4 text-urban-sand" />
                        <span className="text-sm font-bold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-urban-border">
                  <button 
                    onClick={() => { alert('Neighborhood selected!'); setActiveLocation(null); }}
                    className="flex-1 bg-urban-sand text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl"
                  >
                    Select this Area
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMatcher;