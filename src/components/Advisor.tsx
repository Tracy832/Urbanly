import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Wallet, Sofa, ClipboardCheck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

// --- Types ---
type Step = 1 | 2 | 3 | 4;

interface InventoryItem {
  name: string;
  owned: boolean;
  estCost: number;
}

interface UserData {
  location: string;
  workplace: string;
  maritalStatus: string;
  religion: string;
  income: number;
  savings: number;
  rentBudget: number;
  inventory: InventoryItem[];
}

const INITIAL_INVENTORY: InventoryItem[] = [
  { name: "Bed & Mattress", owned: false, estCost: 18000 },
  { name: "Gas Cooker/Cylinder", owned: false, estCost: 8500 },
  { name: "Fridge", owned: false, estCost: 25000 },
  { name: "TV", owned: false, estCost: 15000 },
  { name: "Kitchen Starter Kit", owned: false, estCost: 5000 },
];

const Advisor: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<UserData>({
    location: '',
    workplace: '',
    maritalStatus: '',
    religion: '',
    income: 0,
    savings: 0,
    rentBudget: 0,
    inventory: INITIAL_INVENTORY
  });

  // --- UPDATED BACKGROUND FILENAMES ---
  const stepBackgrounds = [
    "/house1-bg.jpeg",
    "/house2-bg.jpeg",
    "/house3-bg.jpeg",
    "/house4-bg.jpeg"
  ];

  // --- Logic Helpers ---
  const itemsToBuy = data.inventory.filter(item => !item.owned);
  const totalSetupCost = itemsToBuy.reduce((sum, item) => sum + item.estCost, 0);
  
  const isStep1Complete = !!(data.location && data.workplace && data.maritalStatus);
  const isStep2Complete = data.income > 0 && data.rentBudget > 0 && data.savings > 0;

  const toggleInventory = (index: number) => {
    const newInventory = [...data.inventory];
    newInventory[index].owned = !newInventory[index].owned;
    setData({ ...data, inventory: newInventory });
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-6">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 -z-10">
        <img
          src={stepBackgrounds[step - 1] || stepBackgrounds[0]}
          alt="Atmosphere"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        
        {/* Progress Bar (Using updated urban-sand) */}
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
          
          <div className="flex-grow">
            {/* STEP 1: Personal Profile */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="mb-8">
                  <div className="bg-black/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                    <User className="text-urban-sand w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Tell us about yourself.</h2>
                  <p className="text-urban-taupe font-medium mt-2">Help us personalize your moving experience.</p>
                </header>

                <div className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Current Location</label>
                    <input type="text" placeholder="e.g. Eldoret" className="w-full p-4 bg-black/5 rounded-xl border-none font-bold outline-none focus:ring-1 focus:ring-urban-sand transition-all" value={data.location} onChange={(e) => setData({...data, location: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Workplace</label>
                    <input type="text" placeholder="e.g. CBD Nairobi" className="w-full p-4 bg-black/5 rounded-xl border-none font-bold outline-none focus:ring-1 focus:ring-urban-sand transition-all" value={data.workplace} onChange={(e) => setData({...data, workplace: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Marital Status</label>
                    <div className="flex gap-2">
                      {['Single', 'Married', 'Other'].map(s => (
                        <button key={s} onClick={() => setData({...data, maritalStatus: s})} className={`flex-1 py-4 rounded-xl font-bold transition-all border ${data.maritalStatus === s ? 'bg-urban-sand text-white border-urban-sand' : 'bg-transparent text-urban-charcoal border-black/10 hover:bg-black/5'}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Religion (Optional)</label>
                    <input type="text" placeholder="e.g. Christian" className="w-full p-4 bg-black/5 rounded-xl border-none font-bold outline-none" value={data.religion} onChange={(e) => setData({...data, religion: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Financial Information */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <header className="mb-8 text-left">
                  <div className="bg-black/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                    <Wallet className="text-urban-sand w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Financial Info.</h2>
                  <p className="text-urban-taupe font-medium mt-2">Calculate your moving affordability.</p>
                </header>

                <div className="space-y-5 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Monthly Net Income (After Tax)</label>
                    <input type="number" placeholder="KSh 0" className="w-full p-5 bg-black/5 rounded-2xl border-none font-bold text-2xl outline-none focus:ring-1 focus:ring-urban-sand transition-all" onChange={(e) => setData({...data, income: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Current Savings</label>
                    <input type="number" placeholder="KSh 0" className="w-full p-5 bg-black/5 rounded-2xl border-none font-bold text-2xl outline-none focus:ring-1 focus:ring-urban-sand transition-all" onChange={(e) => setData({...data, savings: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Maximum Rent Budget</label>
                    <input type="number" placeholder="KSh 0" className="w-full p-5 bg-black/5 rounded-2xl border-none font-bold text-2xl outline-none focus:ring-1 focus:ring-urban-sand transition-all" onChange={(e) => setData({...data, rentBudget: Number(e.target.value)})} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Items Inventory */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <header className="mb-6 text-left">
                  <div className="bg-black/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-urban-sand">
                    <Sofa className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black leading-none">Items Inventory.</h2>
                  <p className="text-urban-taupe font-medium mt-2">Select items you already own.</p>
                </header>

                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {data.inventory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-black/5 rounded-2xl border border-black/5">
                      <span className="font-bold text-sm text-black">{item.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleInventory(idx)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${item.owned ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}
                        >
                          I Have It
                        </button>
                        <button
                          onClick={() => toggleInventory(idx)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${!item.owned ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400'}`}
                        >
                          Need
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Summary (Almost There) */}
            {step === 4 && (
              <div className="text-center animate-in zoom-in-95 duration-1000">
                <ClipboardCheck className="w-16 h-16 text-urban-sand mx-auto mb-6" />
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 leading-none italic text-black">Almost there!</h2>
                <p className="text-urban-taupe font-medium mb-8">Review your information for your personalized analysis.</p>
                
                <div className="bg-black/5 rounded-[2.5rem] p-8 text-left space-y-4 mb-8 border border-black/5">
                  <div className="grid grid-cols-2 gap-6 text-sm font-medium">
                    <div><p className="text-[10px] font-black uppercase text-urban-sand mb-1">Status</p><p className="text-xl font-bold text-black">{data.maritalStatus}</p></div>
                    <div><p className="text-[10px] font-black uppercase text-urban-sand mb-1">Rent Budget</p><p className="text-xl font-bold text-black">KSh {data.rentBudget.toLocaleString()}</p></div>
                    <div><p className="text-[10px] font-black uppercase text-urban-sand mb-1">Items Needed</p><p className="text-xl font-bold text-red-500">{itemsToBuy.length}</p></div>
                    <div><p className="text-[10px] font-black uppercase text-urban-sand mb-1">Est. Setup Cost</p><p className="text-xl font-bold text-urban-sand">KSh {totalSetupCost.toLocaleString()}</p></div>
                  </div>
                </div>

                <div className="bg-urban-sand/10 p-5 rounded-2xl border border-urban-sand/10">
                  <p className="text-sm font-bold text-urban-charcoal">
                    Click <span className="text-urban-sand">Get Started</span> to see your moving analysis.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* NAVIGATION BUTTONS */}
          <footer className="mt-10 flex gap-4">
            {step > 1 && (
              <button
                onClick={() => setStep(s => (s > 1 ? (s - 1) : 1) as Step)}
                className="flex-1 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] border border-black/10 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 text-black"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            )}
            {step < 4 ? (
              <button
                disabled={step === 1 ? !isStep1Complete : step === 2 ? !isStep2Complete : false}
                onClick={() => setStep(s => (s < 4 ? (s + 1) : 4) as Step)}
                className="flex-[2] bg-urban-sand text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-urban-sand/20 disabled:opacity-20 flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button onClick={() => navigate('/dashboard')} className="flex-[2] bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center justify-center gap-2">
                Get Started <CheckCircle2 className="w-3 h-3" />
              </button>
            )}
          </footer>

        </div>
      </div>
    </main>
  );
};

export default Advisor;