import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Cpu } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white font-sans text-left">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/hero-exterior.jpeg" alt="Urbanly" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-6 italic">
            Urbanly.
          </h1>

          <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto">
            Make smarter moving decisions with data-driven insights.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/advisor')}
              className="bg-yellow-500 px-8 py-4 rounded-xl font-bold flex items-center gap-3"
            >
              Get Started
              <ArrowRight />
            </button>

            <button
              onClick={() => navigate('/login')}
              className="border px-8 py-4 rounded-xl font-bold"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-6 shadow rounded-xl">
          <BarChart3 className="mb-4" />
          <h3 className="font-bold text-xl mb-2">Smart Budget</h3>
          <p>Track your real moving costs in real-time.</p>
        </div>

        <div className="p-6 shadow rounded-xl bg-black text-white">
          <ShieldCheck className="mb-4" />
          <h3 className="font-bold text-xl mb-2">Risk Check</h3>
          <p>Know if your move is financially safe.</p>
        </div>

        <div className="p-6 shadow rounded-xl">
          <Cpu className="mb-4" />
          <h3 className="font-bold text-xl mb-2">Simulator</h3>
          <p>Adjust your budget and see live results.</p>
        </div>
      </section>

    </div>
  );
};

export default Welcome;