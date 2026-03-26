import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Cpu } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white font-sans selection:bg-urban-sand/30 text-left">
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-exterior.jpeg" alt="Urbanly" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-urban-charcoal/50 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl px-8 text-center text-white">
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 drop-shadow-2xl italic">
            Urbanly.
          </h1>
          <p className="text-xl md:text-3xl font-light leading-relaxed mb-12 max-w-3xl mx-auto opacity-90">
            Make informed decisions about your move with <span className="font-bold text-urban-sand">data-driven insights</span>, 
            budget planning, and real-time affordability analysis.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate('/signup')} // CHANGED: Now goes to Signup first
              className="group inline-flex items-center gap-6 bg-urban-sand text-white px-12 py-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all duration-500 transform hover:-translate-y-3 cursor-pointer shadow-2xl"
            >
              Get Started
              <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
            </button>
            
            <button 
              onClick={() => navigate('/login')} 
              className="px-12 py-6 rounded-2xl font-black text-xl uppercase tracking-widest text-white border-2 border-white/30 hover:bg-white/10 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* SYSTEM FEATURES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm">
          <BarChart3 className="w-10 h-10 text-urban-sand mb-6" />
          <h3 className="text-2xl font-bold mb-4 uppercase italic tracking-tighter">Smart Budget Analysis</h3>
          <p className="text-urban-taupe leading-relaxed text-lg font-medium">Real-time calculations of your moving costs, monthly expenses, and financial runway.</p>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-urban-charcoal text-white shadow-xl">
          <ShieldCheck className="w-10 h-10 text-urban-sand mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-urban-sand uppercase italic tracking-tighter">Risk Assessment</h3>
          <p className="opacity-70 leading-relaxed text-lg font-medium">Get instant feedback on whether your move is financially safe with our traffic light system.</p>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm">
          <Cpu className="w-10 h-10 text-urban-sand mb-6" />
          <h3 className="text-2xl font-bold mb-4 uppercase italic tracking-tighter">Interactive Simulator</h3>
          <p className="text-urban-taupe leading-relaxed text-lg font-medium">Adjust rent, furniture quality, and food budget with sliders to see live impact.</p>
        </div>
      </section>

      {/* HOW IT WORKS STEPPER */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-center mb-20 italic">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { n: "1", t: "Create Account", d: "Join the platform and save your personal relocation profile." },
              { n: "2", t: "Advisor Input", d: "Tell us about your income, savings, and workplace goals." },
              { n: "3", t: "Plan Your Budget", d: "Use our simulator to find the perfect financial balance." },
              { n: "4", t: "Make Your Move", d: "Move with the confidence of data-backed insights." }
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-urban-sand text-white flex items-center justify-center font-black mx-auto mb-6 text-xl shadow-lg">
                  {step.n}
                </div>
                <h4 className="font-bold text-xl mb-3 uppercase tracking-tighter italic">{step.t}</h4>
                <p className="text-urban-taupe text-sm leading-relaxed font-medium">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-[10px] font-black uppercase tracking-[0.5em] text-urban-taupe opacity-50 border-t border-gray-100">
        Urbanly DSS — Built for Independence
      </footer>
    </div>
  );
};

export default Welcome;