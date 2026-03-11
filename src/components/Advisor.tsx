import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Wallet, MapPin, Zap, CheckCircle2, RotateCcw } from 'lucide-react';

const Advisor: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    income: 0,
    workplace: '',
    priority: '',
    lifestyle: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
    const getDecision = () => {
    const budget = data.income * 0.3;
    const stepBackgrounds = [
    "/house-bg-1.jpeg", 
    "/house-bg-2.jpeg", 
    "/house-bg-3.jpeg", 
    "/house-bg-4.jpeg"
  ];
    if (budget < 15000) {
      return { 
        area: "Roysambu / Kasarani", 
        reason: "Based on your income, these areas offer the best value-to-security ratio, allowing you to maintain a healthy financial runway." 
      };
    }
    if (data.priority === 'Security' || data.priority === 'Quiet') {
      return { 
        area: "Ruaka / South B", 
        reason: "These locations feature controlled access and lower noise levels, matching your preference for a secure, serene environment." 
      };
    }
    if (data.workplace === 'Westlands' || data.workplace === 'CBD') {
      return { 
        area: "Ngong Road / Kilimani", 
        reason: "To minimize travel fatigue and transport costs, we recommend these hubs due to their proximity to your workplace." 
      };
    }
    return { 
      area: "Lang'ata", 
      reason: "This is our 'Balanced Choice' for you, offering a mix of affordability, social amenities, and reliable transport." 
    };
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-6">
      
      {/* THE DYNAMIC BACKGROUND LAYER */}
{/* --- THE VIBRANT BACKGROUND LAYER --- */}
<div className="fixed inset-0 -z-10">
  <img 
    src="house1-bg.jpeg"
    alt="House Background" 
    /* REMOVED: grayscale and brightness filters */
    className="w-full h-full object-cover transition-all duration-1000" 
  />
  {/* A soft dark overlay to add depth and professional contrast */}
  <div className="absolute inset-0 bg-black/20"></div>
</div>
      {/* 3. THE CONTENT LAYER */}
      <div className="relative z-10 max-w-xl w-full">
        
        {/* Progress Bar */}
        <div className="flex gap-3 mb-12">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-urban-sand' : 'bg-black/10'}`} 
            />
          ))}
        </div>

        {/* STEP WRAPPER: Card with soft glass effect */}
        <div className="bg-white/70 backdrop-blur-lg rounded-[3rem] p-10 shadow-2xl border border-white/30 min-h-[550px] flex flex-col justify-between">
          
          {/* STEP 1: Income */}
{step === 1 && (
  /* This container handles the overall fade animation */
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    {/* --- THE BACKGROUND LAYER for STEP 1 --- */}
    <div className="absolute inset-0 z-0">
      <img 
        src="/house1-bg.jpeg"
        className="w-full h-full object-cover grayscale opacity-15"
        alt="budget-bg"
      />
      <div className="absolute inset-0 bg-linear-to-t from-white/95 via-white/80 to-white/60"></div>
    </div>

    {/* --- THE CONTENT LAYER (Sits on top of the image) --- */}
    <div className="relative z-10 w-full max-w-2xl px-6">
      <div className="bg-black/5 w-16 h-16 rounded-3xl flex items-center justify-center mb-8">
        <Wallet className="text-urban-sand w-8 h-8" />
      </div>
      <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 italic text-black leading-none">
            The Budget.
          </h2>
          <p className="text-urban-taupe text-lg mb-10 font-medium">
            What is your monthly net income? (KSh)
          </p>

          <input 
            autoFocus
            type="number" 
            placeholder="0"
            className="w-full text-7xl font-black border-b-4 border-black/5 focus:border-urban-sand outline-none pb-6 bg-transparent transition-all placeholder:text-black/10"
            onChange={(e) => setData({...data, income: Number(e.target.value)})}
          />
        </div>
        </div>
      )}
          {/* STEP 2: Location */}
          {step === 2 && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-urban-sand/10 w-16 h-16 rounded-3xl flex items-center justify-center mb-8">
            <Wallet className="text-urban-sand w-8 h-8" />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">The Commute.</h2>
              <p className="text-urban-taupe text-lg mb-10">Where do you spend most of your work week?</p>
              <div className="grid grid-cols-1 gap-3">
                {['CBD', 'Westlands', 'Upperhill', 'Remote/WFH'].map(loc => (
                  <button 
                    key={loc}
                    onClick={() => { setData({...data, workplace: loc}); nextStep(); }}
                    className="w-full p-6 text-left rounded-2xl border-2 border-white bg-white/40 hover:border-urban-sand hover:bg-white/80 font-bold transition-all shadow-sm"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Priorities */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-black/5 w-16 h-16 rounded-3xl flex items-center justify-center mb-8">
                <Zap className="text-urban-sand w-8 h-8" />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">The Vibe.</h2>
              <p className="text-urban-taupe text-lg mb-10">What is your absolute non-negotiable?</p>
              <div className="grid grid-cols-1 gap-3">
                {['Security', 'Low Rent', 'Quiet Environment', 'Social Life'].map(p => (
                  <button 
                    key={p}
                    onClick={() => { setData({...data, priority: p}); nextStep(); }}
                    className="w-full p-6 text-left rounded-2xl border-2 border-white bg-white/40 hover:border-urban-sand hover:bg-white/80 font-bold transition-all shadow-sm"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Conclusion */}
          {step === 4 && (
            <div className="text-center animate-in zoom-in-95 duration-1000">
              <div className="flex justify-center mb-8">
                <CheckCircle2 className="w-20 h-20 text-urban-sand" />
              </div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-urban-taupe mb-4">Urbanly Recommendation</h2>
              <h3 className="text-6xl font-black uppercase tracking-tighter mb-6">{getDecision().area}</h3>
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white mb-10 shadow-lg">
                <p className="text-urban-charcoal leading-relaxed font-medium italic">
                  "{getDecision().reason}"
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => navigate('/signup')}
                  className="w-full bg-black text-white py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-urban-sand transition-all shadow-lg"
                >
                  Save Plan
                </button>
                <button onClick={() => setStep(1)} className="flex items-center justify-center gap-2 text-urban-taupe font-bold text-xs uppercase tracking-widest">
                  <RotateCcw className="w-4 h-4" /> Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. NAVIGATION BUTTONS */}
        <div className="mt-12 flex justify-between items-center">
          {step > 1 && step < 4 && (
            <button onClick={prevStep} className="text-urban-taupe font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          )}
          {step === 1 && data.income > 0 && (
            <button onClick={nextStep} className="ml-auto bg-black text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 shadow-md">
              Next <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Advisor;