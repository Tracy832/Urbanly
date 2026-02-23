import React, { useState, useMemo } from 'react';
import { Map, Calculator, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [salary, setSalary] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);

  // Logic: Calculates readiness based on rent-to-income (30% rule) + 3 months emergency fund
  const readinessScore = useMemo(() => {
    if (salary === 0) return 0;
    // Calculation: 30% of salary + savings weightage
    const financialHealth = (salary * 0.3) + (savings / 6);
    const score = Math.min((financialHealth / 30000) * 100, 100);
    return Math.round(score);
  }, [salary, savings]);

  return (
    <div className="min-h-screen bg-white text-urban-charcoal font-sans selection:bg-urban-sand/30">
      
      {/* 1. HERO SECTION - Using your apartment photo background */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/hero-exterior.jpeg" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Urbanly Apartments"
        />
        {/* Soft Beige & Charcoal Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-urban-charcoal/40 via-urban-sand/5 to-white" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-7xl md:text-[14rem] font-black uppercase tracking-tighter leading-none drop-shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
            Urbanly.
          </h1>
          <p className="text-lg md:text-2xl font-light tracking-[0.5em] mt-4 uppercase opacity-90">
            Modern Independence
          </p>
        </div>

        {/* Floating "Glass" Feature Tags */}
        <div className="hidden lg:flex absolute bottom-12 left-12 space-x-4">
          <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20 text-white max-w-xs shadow-2xl">
            <Shield className="w-5 h-5 text-urban-sand mb-2" />
            <p className="text-xs font-black uppercase tracking-widest mb-1">Safety Scores</p>
            <p className="text-[10px] opacity-70 leading-relaxed">Verified security ratings for Nairobi's rising neighborhoods.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20 text-white max-w-xs shadow-2xl">
            <Zap className="w-5 h-5 text-urban-sand mb-2" />
            <p className="text-xs font-black uppercase tracking-widest mb-1">Smart Match</p>
            <p className="text-[10px] opacity-70 leading-relaxed">AI mapping based on your workplace and financial profile.</p>
          </div>
        </div>
      </section>

      {/* 2. MAIN DASHBOARD BODY */}
      <main className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Financial Command Center */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.1)] border border-gray-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-extrabold tracking-tight text-urban-charcoal">Readiness Index</h2>
                  <p className="text-urban-taupe font-medium mt-1">Real-time feasibility for your move-out goal</p>
                </div>
                <div className="flex items-center gap-4 bg-urban-beige/50 py-4 px-8 rounded-3xl border border-urban-sand/10">
                  <TrendingUp className="text-urban-sand w-8 h-8" />
                  <span className="text-5xl font-black text-urban-sand">{readinessScore}%</span>
                </div>
              </div>

              {/* Progress Gauge */}
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden mb-16">
                <div 
                  className="h-full bg-urban-sand transition-all duration-1000 ease-out shadow-[0_0_25px_rgba(194,178,128,0.5)]"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>

              {/* Interactive Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group">
                  <label className="block text-[10px] font-black text-urban-sand uppercase tracking-[0.25em] mb-4 group-focus-within:text-urban-charcoal transition-colors">
                    Monthly Net Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 bottom-4 text-2xl font-bold text-gray-300">KSh</span>
                    <input 
                      type="number" 
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full pl-16 pb-4 text-4xl font-bold bg-transparent border-b-2 border-gray-100 focus:border-urban-sand outline-none transition-all placeholder:text-gray-100"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-urban-sand uppercase tracking-[0.25em] mb-4 group-focus-within:text-urban-charcoal transition-colors">
                    Current Savings
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 bottom-4 text-2xl font-bold text-gray-300">KSh</span>
                    <input 
                      type="number" 
                      onChange={(e) => setSavings(Number(e.target.value))}
                      className="w-full pl-16 pb-4 text-4xl font-bold bg-transparent border-b-2 border-gray-100 focus:border-urban-sand outline-none transition-all placeholder:text-gray-100"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-urban-beige/30 p-10 rounded-[3rem] border border-urban-sand/5 hover:bg-urban-beige/50 transition-all cursor-pointer group">
                  <h4 className="text-2xl font-bold mb-3">Market Trends</h4>
                  <p className="text-urban-taupe leading-relaxed">Rental prices in Ruaka and South B have stabilized. A great window to scout apartments.</p>
                  <div className="mt-8 flex items-center text-urban-sand font-bold gap-2 group-hover:gap-4 transition-all">
                    View Areas <ArrowRight className="w-5 h-5" />
                  </div>
               </div>
               <div className="bg-urban-charcoal p-10 rounded-[3rem] text-white hover:scale-[1.02] transition-transform cursor-pointer shadow-xl shadow-gray-200">
                  <h4 className="text-2xl font-bold mb-3 text-urban-sand">The Checklist</h4>
                  <p className="text-sm opacity-70 leading-relaxed">Calculate the exact price of your 'Move-out Kit'—from beds to kitchenware.</p>
                  <div className="mt-8 h-10 w-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-urban-sand" />
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
              <h3 className="font-black text-xs uppercase tracking-widest text-urban-taupe mb-8">Navigation</h3>
              <div className="space-y-4">
                {[
                  { icon: <Map className="w-5 h-5"/>, label: "Area Matcher" },
                  { icon: <Calculator className="w-5 h-5"/>, label: "Budget Simulator" },
                  { icon: <Shield className="w-5 h-5"/>, label: "Safety Reports" },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-5 rounded-2xl hover:bg-urban-beige/40 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="text-urban-sand">{item.icon}</div>
                      <span className="font-bold text-sm text-urban-charcoal">{item.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* Pro Tip Highlight Card */}
            <div className="bg-urban-sand rounded-[3rem] p-10 text-white shadow-lg shadow-urban-sand/30">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-70">Expert Insight</p>
              <p className="text-xl font-medium leading-tight mb-8">Most Nairobi rentals require 1 month rent + 1 month security deposit upfront.</p>
              <button className="w-full bg-white text-urban-sand font-extrabold py-4 px-6 rounded-2xl text-xs uppercase tracking-widest hover:bg-urban-beige transition-colors">
                Read Move-out Guide
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;