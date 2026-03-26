import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Wallet, Sofa, ClipboardCheck, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdvisorProps {
  updateParentInventory: (inventory: string[]) => void;
  currentParentInventory: string[];
}

type Step = 1 | 2 | 3 | 4;

const Advisor: React.FC<AdvisorProps> = ({ updateParentInventory, currentParentInventory }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [error, setError] = useState<string | null>(null);
  
  const [data, setData] = useState({
    location: '', 
    workplace: '', 
    maritalStatus: '', 
    income: 0, 
    savings: 0, 
    rentBudget: 0,
  });

  const stepBackgrounds = [ "/house1-bg.jpeg", "/house2-bg.jpeg", "/house3-bg.jpeg", "/house4-bg.jpeg" ];

  const inventoryOptions = [
    "Television", "Refrigerator", "Microwave", 
    "Sofa Set", "Bed Frame", "Gas Cooker"
  ];

  // --- NAIROBI DATASET VALIDATION (As per Yacooti Kaggle Dataset) ---
  const NAIROBI_AREAS = [
    "Kileleshwa", "Westlands", "Karen", "Lavington", "Runda", "Muthaiga", 
    "South B", "South C", "Langata", "Ruaka", "Kilimani", "Madaraka", "Donholm",
    "Embakasi", "Kasarani", "Githurai", "Umoja", "Ruiru", "Roysambu", "Zimmerman",
    "Ngong", "Rongai", "Thika", "Kitengela", "Kikuyu"
  ];

  const validateStep = (): boolean => {
    setError(null);

    if (step === 1) {
      const loc = data.location.trim().toLowerCase();
      const work = data.workplace.trim().toLowerCase();
      
      // Check if location and workplace are in the dataset
      const isLocValid = NAIROBI_AREAS.some(area => area.toLowerCase() === loc);
      const isWorkValid = NAIROBI_AREAS.some(area => area.toLowerCase() === work);

      if (!isLocValid || !isWorkValid) {
        setError("Please enter a supported area from the Nairobi dataset (e.g., Ruaka, Westlands, Roysambu).");
        return false;
      }
    }

    if (step === 2) {
      // Validate figures are above 1000
      if (data.income < 1000 || data.savings < 1000 || data.rentBudget < 1000) {
        setError("Financial figures (Income, Savings, Rent) must be at least KSh 1,000 for a valid analysis.");
        return false;
      }
    }

    return true;
  };

  const handleContinue = () => {
    if (validateStep()) {
      setStep(s => (s + 1) as Step);
    }
  };

  const toggleItem = (itemName: string) => {
    if (currentParentInventory.includes(itemName)) {
      updateParentInventory(currentParentInventory.filter(i => i !== itemName));
    } else {
      updateParentInventory([...currentParentInventory, itemName]);
    }
  };

  const isStep1Complete = !!(data.location && data.workplace && data.maritalStatus);
  const isStep2Complete = data.income > 0 && data.rentBudget > 0 && data.savings > 0;

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-6 text-left">
      <div className="fixed inset-0 -z-10">
        <img src={stepBackgrounds[step - 1] || stepBackgrounds[0]} alt="Atmosphere" className="w-full h-full object-cover transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="flex gap-3 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-urban-sand' : 'bg-white/20'}`} />
          ))}
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-10 shadow-2xl border border-white/40 min-h-[620px] flex flex-col justify-between">
          <div className="flex-grow space-y-8">
            
            {/* ERROR DISPLAY */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-xs font-bold leading-tight">{error}</p>
              </div>
            )}

            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="mb-8">
                  <User className="text-urban-sand w-12 h-12 mb-4" />
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Move Profile.</h2>
                  <p className="text-urban-taupe font-medium mt-2 italic">Select neighborhoods from the Nairobi Cost of Living dataset.</p>
                </header>
                <div className="space-y-4">
                  <input 
                    list="nairobi-areas"
                    type="text" 
                    placeholder="Current Location (e.g. Ruaka)" 
                    className="w-full p-4 bg-black/5 rounded-xl border-none outline-none font-bold" 
                    value={data.location} 
                    onChange={(e) => setData({...data, location: e.target.value})} 
                  />
                  <datalist id="nairobi-areas">
                    {NAIROBI_AREAS.map(area => <option key={area} value={area} />)}
                  </datalist>
                  <input 
                    list="nairobi-areas"
                    type="text" 
                    placeholder="Workplace (e.g. Westlands)" 
                    className="w-full p-4 bg-black/5 rounded-xl border-none outline-none font-bold" 
                    value={data.workplace} 
                    onChange={(e) => setData({...data, workplace: e.target.value})} 
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Marital Status</label>
                    <div className="flex gap-2">
                      {['Single', 'Married', 'Other'].map(s => (
                        <button key={s} onClick={() => setData({...data, maritalStatus: s})} className={`flex-1 py-4 rounded-xl font-bold border transition-all ${data.maritalStatus === s ? 'bg-urban-sand text-white border-urban-sand shadow-lg' : 'border-black/10 hover:bg-black/5'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <header className="mb-8">
                  <Wallet className="text-urban-sand w-12 h-12 mb-4" />
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Budget.</h2>
                  <p className="text-urban-taupe font-medium mt-2">Enter your actual financial figures for analysis.</p>
                </header>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-urban-sand">Monthly Income (KSh)</label>
                    <input type="number" placeholder="Min. 1000" className="w-full p-4 bg-black/5 rounded-xl font-bold text-xl outline-none" value={data.income || ''} onChange={(e) => setData({...data, income: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-urban-sand">Total Savings (KSh)</label>
                    <input type="number" placeholder="Min. 1000" className="w-full p-4 bg-black/5 rounded-xl font-bold text-xl outline-none" value={data.savings || ''} onChange={(e) => setData({...data, savings: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-urban-sand">Max Rent Budget (KSh)</label>
                    <input type="number" placeholder="Min. 1000" className="w-full p-4 bg-black/5 rounded-xl font-bold text-xl outline-none" value={data.rentBudget || ''} onChange={(e) => setData({...data, rentBudget: Number(e.target.value)})} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 (Inventory) and Step 4 (Summary) remain structurally the same but now handle the actual data */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <header className="mb-8">
                  <Sofa className="w-12 h-12 text-urban-sand mb-4" />
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Essentials.</h2>
                  <p className="text-urban-taupe font-medium mt-2">Select items to factor into your upfront setup cost.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {inventoryOptions.map((item) => {
                    const isSelected = currentParentInventory.includes(item);
                    return (
                      <button key={item} onClick={() => toggleItem(item)} className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all duration-300 ${isSelected ? 'border-urban-sand bg-white shadow-xl scale-[1.02]' : 'border-urban-border hover:border-urban-sand/50'}`}>
                        <span className={`font-bold ${isSelected ? 'text-black' : 'text-urban-taupe'}`}>{item}</span>
                        {isSelected ? <CheckCircle2 className="w-6 h-6 text-urban-sand animate-in zoom-in" /> : <div className="w-6 h-6 rounded-full border-2 border-urban-border" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center animate-in zoom-in-95 duration-700">
                <ClipboardCheck className="w-16 h-16 text-urban-sand mx-auto mb-6" />
                <h2 className="text-5xl font-black uppercase italic text-black mb-4">Confirmed.</h2>
                <div className="bg-black/5 rounded-[3rem] p-10 text-left border border-black/5 space-y-4">
                   <div className="flex justify-between items-end border-b border-black/5 pb-4">
                      <p className="text-[10px] font-black uppercase text-urban-sand">Move Location</p>
                      <p className="text-xl font-black text-black">{data.location}</p>
                   </div>
                   <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black uppercase text-urban-sand">Total Savings Pool</p>
                      <p className="text-xl font-black text-black">KSh {data.savings.toLocaleString()}</p>
                   </div>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-10 flex gap-4">
            {step > 1 && (
              <button onClick={() => setStep(s => (s - 1) as Step)} className="flex-1 py-5 rounded-2xl font-black uppercase text-[10px] border border-black/10 hover:bg-black hover:text-white transition-all">
                Back
              </button>
            )}
            
            {step < 4 ? (
              <button 
                disabled={step === 1 ? !isStep1Complete : step === 2 ? !isStep2Complete : false}
                onClick={handleContinue} 
                className="flex-[2] bg-urban-sand text-white py-5 rounded-2xl font-black uppercase text-[10px] shadow-xl shadow-urban-sand/20 disabled:opacity-20"
              >
                Continue <ArrowRight className="w-3 h-3 inline ml-1" />
              </button>
            ) : (
              <button onClick={() => navigate('/dashboard')} className="flex-[2] bg-black text-white py-5 rounded-2xl font-black uppercase text-[10px] shadow-2xl hover:scale-[1.03] transition-transform">
                Open Decision Hub
              </button>
            )}
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Advisor;