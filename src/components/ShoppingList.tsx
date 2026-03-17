import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingCart, Tag, MapPin, ChevronDown, 
  ChevronUp, CheckCircle2, Lightbulb, Wallet, Package 
} from 'lucide-react';

// --- Data Structure for Vendors ---
interface Vendor {
  name: string;
  location: string;
  price: number;
  isCheapest: boolean;
}

interface ShoppingItem {
  id: string;
  category: 'Kitchen' | 'Bedroom' | 'Living Room';
  name: string;
  priceRange: string;
  selectedPrice: number;
  vendors: Vendor[];
}

const INITIAL_ITEMS: ShoppingItem[] = [
  {
    id: '1',
    category: 'Kitchen',
    name: 'Refrigerator',
    priceRange: 'KSh 18,000 - KSh 60,000',
    selectedPrice: 22000,
    vendors: [
      { name: "Hotpoint", location: "Various", price: 22000, isCheapest: true },
      { name: "Naivas Electronics", location: "Various", price: 25000, isCheapest: false }
    ]
  },
  {
    id: '2',
    category: 'Kitchen',
    name: 'Microwave',
    priceRange: 'KSh 6,000 - KSh 15,000',
    selectedPrice: 7500,
    vendors: [
      { name: "Hotpoint", location: "Various", price: 7500, isCheapest: true },
      { name: "Jumia", location: "Online", price: 8200, isCheapest: false }
    ]
  },
  {
    id: '3',
    category: 'Bedroom',
    name: 'Wardrobe',
    priceRange: 'KSh 15,000 - KSh 45,000',
    selectedPrice: 12000,
    vendors: [
      { name: "Kamukunji Market", location: "Nairobi CBD", price: 12000, isCheapest: true },
      { name: "Furniture Palace", location: "Westlands", price: 28000, isCheapest: false }
    ]
  }
];

const ShoppingList: React.FC = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [items] = useState<ShoppingItem[]>(INITIAL_ITEMS);

  const totalCost = items.reduce((sum, item) => sum + item.selectedPrice, 0);
  const SAVINGS = 120000;
  const afterPurchase = SAVINGS - totalCost;
  const budgetProgress = (totalCost / SAVINGS) * 100;

  return (
    <div className="min-h-screen bg-urban-cream p-6 md:p-12 font-sans text-urban-charcoal">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-10 flex items-center gap-4 text-left">
          <button onClick={() => navigate('/dashboard')} className="hover:text-urban-sand transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">Shopping List</h1>
            <p className="text-urban-taupe font-medium text-sm">{items.length} items to purchase</p>
          </div>
        </header>

        {/* SHOPPING CATEGORIES */}
        <div className="space-y-12">
          {['Kitchen', 'Bedroom'].map(cat => (
            <div key={cat} className="space-y-6">
              <h2 className="text-xl font-black flex items-center gap-2 border-b border-urban-border pb-2">
                <Package className="w-5 h-5 text-urban-sand" /> {cat}
              </h2>
              
              <div className="space-y-4">
                {items.filter(i => i.category === cat).map(item => (
                  <div key={item.id} className="premium-card overflow-hidden transition-all duration-300">
                    <div className="p-8 flex justify-between items-center">
                      <div className="text-left">
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <p className="text-xs font-medium text-urban-taupe mt-1">Range: {item.priceRange}</p>
                        <div className="flex items-center gap-1 text-urban-taupe text-[10px] font-bold uppercase mt-3">
                          <MapPin className="w-3 h-3" /> {item.vendors[0].name} • {item.vendors[0].location}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-black mb-4">KSh {item.selectedPrice.toLocaleString()}</p>
                        <button 
                          onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                          className="text-xs font-black uppercase tracking-widest text-urban-sand flex items-center gap-1 hover:opacity-70 transition-opacity"
                        >
                          {expandedId === item.id ? (
                            <>Hide Vendors <ChevronUp className="w-4 h-4" /></>
                          ) : (
                            <>Compare Vendors <ChevronDown className="w-4 h-4" /></>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* VENDOR COMPARISON DRAWER (Figma Reference) */}
                    {expandedId === item.id && (
                      <div className="bg-urban-sand/5 border-t border-urban-border p-6 space-y-3 animate-in slide-in-from-top-2">
                        {item.vendors.map(vendor => (
                          <div 
                            key={vendor.name} 
                            className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${
                              vendor.isCheapest ? 'bg-white border-urban-sand' : 'bg-transparent border-transparent opacity-60'
                            }`}
                          >
                            <div className="text-left">
                              <p className="font-bold flex items-center gap-2">
                                {vendor.name} 
                                {vendor.isCheapest && <span className="text-[9px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase">Cheapest</span>}
                              </p>
                              <p className="text-[10px] text-urban-taupe font-bold uppercase">{vendor.location}</p>
                            </div>
                            <p className="font-black">KSh {vendor.price.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER SUMMARY SECTION (Figma Reference) */}
        <section className="mt-16 space-y-8">
          <div className="premium-card p-10 bg-white shadow-xl">
            <h2 className="text-sm font-black uppercase tracking-widest text-urban-taupe mb-8 text-left">Cost Summary</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase text-urban-taupe">Selected Total</span>
                <span className="text-4xl font-black">KSh {totalCost.toLocaleString()}</span>
              </div>
              
              <div className="pt-6 border-t border-urban-border space-y-2">
                <div className="flex justify-between text-xs font-bold text-urban-taupe">
                  <span>Your Savings</span>
                  <span>KSh {SAVINGS.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-black text-green-600">
                  <span>After Purchase</span>
                  <span>KSh {afterPurchase.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Bar (Figma Reference) */}
              <div className="pt-6">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                  <span>Furniture Setup Progress</span>
                  <span className="text-urban-sand">Budget Used</span>
                </div>
                <div className="w-full bg-urban-border h-4 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${budgetProgress}%` }} />
                </div>
                <p className="text-[10px] font-bold text-green-600 mt-3 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> You can afford this setup
                </p>
              </div>
            </div>
          </div>

          {/* SHOPPING TIPS  */}
          <div className="premium-card p-10 bg-urban-charcoal text-white text-left">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-urban-sand" /> Shopping Tips
            </h3>
            <ul className="space-y-4 text-sm font-medium text-urban-taupe">
              <li className="flex gap-3">
                <span className="text-urban-sand">•</span> Visit Kamukunji Market for best bargains on wardrobes and curtains.
              </li>
              <li className="flex gap-3">
                <span className="text-urban-sand">•</span> Compare prices across multiple vendors before committing.
              </li>
              <li className="flex gap-3">
                <span className="text-urban-sand">•</span> Consider buying used high-quality items to save more than 40%.
              </li>
              <li className="flex gap-3">
                <span className="text-urban-sand">•</span> Negotiate prices, especially at local markets like Gikomba or Toi.
              </li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ShoppingList;