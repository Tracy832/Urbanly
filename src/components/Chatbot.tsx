import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-black p-6 text-white flex justify-between items-center">
            <span className="font-black text-xs uppercase tracking-widest">Urbanly AI</span>
            <X className="w-4 h-4 cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <div className="p-6 h-64 bg-slate-50 text-xs font-medium italic text-slate-500 overflow-y-auto">
            Hi! I'm your moving assistant. Ask me about cheap movers, best areas, saving money, or budget tips!
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input type="text" placeholder="Type query..." className="flex-1 bg-slate-50 p-3 rounded-xl outline-none text-xs" />
            <button className="bg-black text-white p-3 rounded-xl"><Send className="w-4 h-4"/></button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-black text-white p-6 rounded-full shadow-2xl hover:scale-110 transition-all">
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Chatbot;