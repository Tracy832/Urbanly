import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Wallet, Sofa, ClipboardCheck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

// --- Props to connect data to App.tsx ---
interface AdvisorProps {
  updateParentInventory: (inventory: string[]) => void;
  currentParentInventory: string[];
}

type Step = 1 | 2 | 3 | 4;

const Advisor: React.FC<AdvisorProps> = ({ updateParentInventory, currentParentInventory }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  
  // RESTORED: Your original financial and personal state
  const [data, setData] = useState({
    location: '', 
    workplace: '', 
    maritalStatus: '', 
    religion: '',
    income: 0, 
    savings: 0, 
    rentBudget: 0,
  });

  // Backgrounds you liked
  const stepBackgrounds = [ "/house1-bg.jpeg", "/house2-bg.jpeg", "/house3-bg.jpeg", "/house4-bg.jpeg" ];

  // These names MUST match the names in ShoppingList.tsx exactly
  const inventoryOptions = [
    "Television", "Refrigerator", "Microwave", 
    "Sofa Set", "Bed Frame", "Gas Cooker"
  ];

  // Helper function to update App.tsx global state
  const toggleItem = (itemName: string) => {
    if (currentParentInventory.includes(itemName)) {
      updateParentInventory(currentParentInventory.filter(i => i !== itemName));
    } else {
      updateParentInventory([...currentParentInventory, itemName]);
    }
  };

  // Validation to prevent skipping steps
  const isStep1Complete = !!(data.location && data.workplace && data.maritalStatus);
  const isStep2Complete = data.income > 0 && data.rentBudget > 0 && data.savings > 0;

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-6 text-left">
      
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 -z-10">
        <img 
          src={stepBackgrounds[step - 1] || stepBackgrounds[0]} 
          alt="Atmosphere" 
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        
        {/* Progress Bar */}
        <div className="flex gap-3 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-urban-sand' : 'bg-white/20'}`} 
            />
          ))}
        </div>

        {/* MAIN CARD */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-10 shadow-2xl border border-white/40 min-h-[620px] flex flex-col justify-between">
          
          <div className="flex-grow space-y-8">
            
            {/* STEP 1: Personal Profile (Restored original layout) */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="mb-8">
                  <div className="bg-black/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                    <User className="text-urban-sand w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Personal Profile.</h2>
                  <p className="text-urban-taupe font-medium mt-2">Let's get to know your moving needs.</p>
                </header>

                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Current Location (e.g. Eldoret)" 
                    className="w-full p-4 bg-black/5 rounded-xl border-none outline-none font-bold focus:ring-1 focus:ring-urban-sand" 
                    value={data.location} 
                    onChange={(e) => setData({...data, location: e.target.value})} 
                  />
                  <input 
                    type="text" 
                    placeholder="Workplace (e.g. Nairobi CBD)" 
                    className="w-full p-4 bg-black/5 rounded-xl border-none outline-none font-bold focus:ring-1 focus:ring-urban-sand" 
                    value={data.workplace} 
                    onChange={(e) => setData({...data, workplace: e.target.value})} 
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Marital Status</label>
                    <div className="flex gap-2">
                      {['Single', 'Married', 'Other'].map(s => (
                        <button 
                          key={s} 
                          onClick={() => setData({...data, maritalStatus: s})} 
                          className={`flex-1 py-4 rounded-xl font-bold border transition-all ${data.maritalStatus === s ? 'bg-urban-sand text-white border-urban-sand shadow-lg' : 'border-black/10 hover:bg-black/5'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Financials (Restored original layout) */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <header className="mb-8">
                  <div className="bg-black/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                    <Wallet className="text-urban-sand w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Financials.</h2>
                  <p className="text-urban-taupe font-medium mt-2">What's your comfortable budget range?</p>
                </header>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-urban-sand">Monthly Income</label>
                    <input type="number" placeholder="KSh 0" className="w-full p-4 bg-black/5 rounded-xl font-bold text-xl outline-none" onChange={(e) => setData({...data, income: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-urban-sand">Current Savings</label>
                    <input type="number" placeholder="KSh 0" className="w-full p-4 bg-black/5 rounded-xl font-bold text-xl outline-none" onChange={(e) => setData({...data, savings: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-urban-sand">Maximum Rent Budget</label>
                    <input type="number" placeholder="KSh 0" className="w-full p-4 bg-black/5 rounded-xl font-bold text-xl outline-none" onChange={(e) => setData({...data, rentBudget: Number(e.target.value)})} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Items Inventory */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <header className="mb-8">
                  <div className="bg-black/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-urban-sand">
                    <Sofa className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Inventory.</h2>
                  <p className="text-urban-taupe font-medium mt-2">Select items you **Need** to buy for your new place.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {inventoryOptions.map((item) => {
                    const isSelected = currentParentInventory.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleItem(item)}
                        className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all duration-300 ${isSelected ? 'border-urban-sand bg-white shadow-xl scale-[1.02]' : 'border-urban-border hover:border-urban-sand/50'}`}
                      >
                        <span className={`font-bold ${isSelected ? 'text-black' : 'text-urban-taupe'}`}>{item}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-6 h-6 text-urban-sand animate-in zoom-in" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-urban-border" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Summary */}
            {step === 4 && (
              <div className="text-center animate-in zoom-in-95 duration-700">
                <ClipboardCheck className="w-16 h-16 text-urban-sand mx-auto mb-6" />
                <h2 className="text-5xl font-black uppercase italic text-black mb-4">All Set!</h2>
                <div className="bg-black/5 rounded-[3rem] p-10 text-left border border-black/5 space-y-4">
                   <div className="flex justify-between items-end border-b border-black/5 pb-4">
                      <p className="text-[10px] font-black uppercase text-urban-sand">Inventory Picked</p>
                      <p className="text-2xl font-black text-black">{currentParentInventory.length} Items</p>
                   </div>
                   <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black uppercase text-urban-sand">Rent Target</p>
                      <p className="text-2xl font-black text-black">KSh {data.rentBudget.toLocaleString()}</p>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* NAVIGATION BUTTONS */}
          <footer className="mt-10 flex gap-4">
            {step > 1 && (
              <button 
                onClick={() => setStep(s => (s - 1) as Step)} 
                className="flex-1 py-5 rounded-2xl font-black uppercase text-[10px] border border-black/10 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            )}
            
            {step < 4 ? (
              <button 
                disabled={step === 1 ? !isStep1Complete : step === 2 ? !isStep2Complete : false}
                onClick={() => setStep(s => (s + 1) as Step)} 
                className="flex-[2] bg-urban-sand text-white py-5 rounded-2xl font-black uppercase text-[10px] shadow-xl shadow-urban-sand/20 disabled:opacity-20 flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button 
                onClick={() => navigate('/dashboard')} 
                className="flex-[2] bg-black text-white py-5 rounded-2xl font-black uppercase text-[10px] shadow-2xl hover:scale-[1.03] transition-transform flex items-center justify-center gap-2"
              >
                Generate Analysis <CheckCircle2 className="w-3 h-3" />
              </button>
            )}
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Advisor;