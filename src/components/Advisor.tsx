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

  // --- BACKEND DEVELOPER AREA MAP ---
  const NAIROBI_AREAS = [
    "Westlands", "Kileleshwa", "Ngong", "Kasarani", "South B", "Kitengela", 
    "Juja", "Githurai", "Donholm", "Rongai", "Mlolongo", "Ruiru", "Karen", 
    "Thika", "Ruaka", "Langata", "Kikuyu", "Umoja", "Embakasi"
  ];

  const validateStep = (): boolean => {
    setError(null);
    if (step === 1) {
      const loc = data.location.trim();
      if (!NAIROBI_AREAS.some(area => area.toLowerCase() === loc.toLowerCase())) {
        setError("Please select a valid area from the Nairobi list (e.g., Ruaka, Karen, Ruiru).");
        return false;
      }
    }
    if (step === 2) {
      if (data.income < 1000 || data.savings < 1000 || data.rentBudget < 1000) {
        setError("Financial figures must be at least KSh 1,000 for a valid analysis.");
        return false;
      }
    }
    return true;
  };

  const handleFinish = () => {
    // SAVE EVERYTHING TO LOCAL STORAGE FOR DASHBOARD/SIMULATOR
    localStorage.setItem('user_income', data.income.toString());
    localStorage.setItem('user_savings', data.savings.toString());
    localStorage.setItem('user_rent', data.rentBudget.toString());
    localStorage.setItem('user_location', data.location);
    navigate('/dashboard');
  };

  const toggleItem = (itemName: string) => {
    if (currentParentInventory.includes(itemName)) {
      updateParentInventory(currentParentInventory.filter(i => i !== itemName));
    } else {
      updateParentInventory([...currentParentInventory, itemName]);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-6 text-left">
      <div className="fixed inset-0 -z-10">
        <img src={stepBackgrounds[step - 1] || stepBackgrounds[0]} alt="" className="w-full h-full object-cover opacity-50 transition-opacity" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-white/95 rounded-[3rem] p-10 shadow-2xl min-h-[620px] flex flex-col justify-between">
          <div className="flex-grow space-y-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                <AlertCircle className="w-5 h-5" />
                <p className="text-xs font-bold leading-tight">{error}</p>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <header>
                  <User className="text-urban-sand w-12 h-12 mb-4" />
                  <h2 className="text-4xl font-black uppercase italic leading-none text-black">Location.</h2>
                </header>
                <input list="areas" type="text" placeholder="Target Neighborhood" className="w-full p-4 bg-black/5 rounded-xl font-bold" value={data.location} onChange={(e) => setData({...data, location: e.target.value})} />
                <datalist id="areas">
                  {NAIROBI_AREAS.map(a => <option key={a} value={a} />)}
                </datalist>
                <input type="text" placeholder="Workplace Area" className="w-full p-4 bg-black/5 rounded-xl font-bold" value={data.workplace} onChange={(e) => setData({...data, workplace: e.target.value})} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <header>
                  <Wallet className="text-urban-sand w-12 h-12 mb-4" />
                  <h2 className="text-4xl font-black uppercase italic leading-none text-black">Financials.</h2>
                </header>
                <div className="space-y-4">
                  <input type="number" placeholder="Monthly Income (KSh)" className="w-full p-4 bg-black/5 rounded-xl font-black text-2xl" onChange={(e) => setData({...data, income: Number(e.target.value)})} />
                  <input type="number" placeholder="Total Savings (KSh)" className="w-full p-4 bg-black/5 rounded-xl font-black text-2xl" onChange={(e) => setData({...data, savings: Number(e.target.value)})} />
                  <input type="number" placeholder="Rent Cap (KSh)" className="w-full p-4 bg-black/5 rounded-xl font-black text-2xl" onChange={(e) => setData({...data, rentBudget: Number(e.target.value)})} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <header><Sofa className="w-12 h-12 text-urban-sand mb-4" /><h2 className="text-4xl font-black uppercase italic leading-none text-black">Inventory.</h2></header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto">
                  {inventoryOptions.map((item) => (
                    <button key={item} onClick={() => toggleItem(item)} className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${currentParentInventory.includes(item) ? 'border-urban-sand bg-white shadow-lg' : 'border-urban-border'}`}>
                      <span className="font-bold">{item}</span>
                      {currentParentInventory.includes(item) && <CheckCircle2 className="w-6 h-6 text-urban-sand" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center">
                <ClipboardCheck className="w-16 h-16 text-urban-sand mx-auto mb-6" />
                <h2 className="text-5xl font-black uppercase italic text-black">Confirmed.</h2>
                <p className="text-urban-taupe font-bold">Analysis for {data.location} ready.</p>
              </div>
            )}
          </div>

          <footer className="mt-10 flex gap-4">
            {step > 1 && <button onClick={() => setStep(s => (s - 1) as Step)} className="flex-1 py-5 rounded-2xl font-black uppercase text-[10px] border">Back</button>}
            <button onClick={step === 4 ? handleFinish : () => validateStep() && setStep(s => (s + 1) as Step)} className="flex-[2] bg-black text-white py-5 rounded-2xl font-black uppercase text-[10px] shadow-2xl">
              {step === 4 ? "Enter Dashboard" : "Continue"}
            </button>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Advisor;