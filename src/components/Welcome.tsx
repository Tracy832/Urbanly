import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Cpu, MapPin, Calculator, ShoppingBag } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white font-sans selection:bg-urban-sand/30">
      
      {/* 1. HERO SECTION (Fixed Background) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-exterior.jpeg" 
            alt="Urbanly Modern Living" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-urban-charcoal/50 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl px-8 text-center text-white animate-in fade-in zoom-in-95 duration-1000">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 drop-shadow-2xl">
            Urbanly.
          </h1>
          <p className="text-xl md:text-3xl font-light leading-relaxed mb-12 max-w-3xl mx-auto">
            Make informed decisions about your move with <span className="font-bold text-urban-sand">data-driven insights</span>, 
            budget planning, and real-time affordability analysis.
          </p>

          <button 
            onClick={() => navigate('/dashboard')}
            className="group inline-flex items-center gap-6 bg-white text-urban-charcoal hover:bg-urban-sand hover:text-white px-12 py-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all duration-500 transform hover:-translate-y-3 cursor-pointer shadow-2xl"
          >
            Get Started
            <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. SMART ANALYSIS & FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 rounded-[2.5rem] bg-urban-beige/30 border border-urban-sand/10 hover:shadow-xl transition-all">
          <BarChart3 className="w-10 h-10 text-urban-sand mb-6" />
          <h3 className="text-2xl font-bold mb-4">Smart Budget Analysis</h3>
          <p className="text-urban-taupe leading-relaxed text-lg">Real-time calculations of your moving costs, monthly expenses, and financial runway.</p>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-urban-charcoal text-white hover:shadow-xl transition-all">
          <ShieldCheck className="w-10 h-10 text-urban-sand mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-urban-sand">Risk Assessment</h3>
          <p className="opacity-70 leading-relaxed text-lg">Get instant feedback on whether your move is financially safe with our traffic light system.</p>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-urban-beige/30 border border-urban-sand/10 hover:shadow-xl transition-all">
          <Cpu className="w-10 h-10 text-urban-sand mb-6" />
          <h3 className="text-2xl font-bold mb-4">Interactive Simulator</h3>
          <p className="text-urban-taupe leading-relaxed text-lg">Adjust rent, furniture quality, and food budget with sliders to see live impact.</p>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-center mb-20">How it Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { n: "1", t: "Share Your Profile", d: "Tell us about your income, savings, and workplace." },
              { n: "2", t: "Explore Locations", d: "Compare neighborhoods based on rent, transport, and amenities." },
              { n: "3", t: "Plan Your Budget", d: "Use our simulator to find the perfect balance." },
              { n: "4", t: "Make Your Move", d: "Get your shopping list and move with confidence." }
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-10 h-10 rounded-full bg-urban-sand text-white flex items-center justify-center font-bold mx-auto mb-6 text-lg shadow-lg">
                  {step.n}
                </div>
                <h4 className="font-bold text-xl mb-3">{step.t}</h4>
                <p className="text-urban-taupe text-sm leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS COUNTER */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-12 rounded-[3rem] bg-white border-2 border-urban-beige hover:border-urban-sand transition-all group">
            <span className="text-7xl font-black text-urban-charcoal group-hover:text-urban-sand transition-colors">5+</span>
            <p className="text-xl font-bold uppercase tracking-widest text-urban-taupe mt-4">Neighborhoods</p>
          </div>
          <div className="p-12 rounded-[3rem] bg-white border-2 border-urban-beige hover:border-urban-sand transition-all group">
            <span className="text-7xl font-black text-urban-charcoal group-hover:text-urban-sand transition-colors">10+</span>
            <p className="text-xl font-bold uppercase tracking-widest text-urban-taupe mt-4">Budget Factors</p>
          </div>
          <div className="p-12 rounded-[3rem] bg-white border-2 border-urban-beige hover:border-urban-sand transition-all group">
            <span className="text-7xl font-black text-urban-charcoal group-hover:text-urban-sand transition-colors">15+</span>
            <p className="text-xl font-bold uppercase tracking-widest text-urban-taupe mt-4">Furniture Items</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-urban-taupe border-t border-gray-100">
        <p className="font-medium tracking-widest uppercase text-xs">Urbanly. © 2026 — Decision Support Systems</p>
      </footer>
    </div>
  );
};

export default Welcome;