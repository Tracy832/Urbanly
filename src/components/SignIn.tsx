import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/welcome'); 
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-12 text-left">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-urban-charcoal mb-4">Urbanly.</h1>
            <h3 className="text-xl font-bold text-urban-taupe">Welcome back.</h3>
          </div>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Email</label>
              <input required type="email" placeholder="tracy@urbanly.co.ke" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <button type="submit" className="w-full bg-urban-charcoal text-white font-black py-5 rounded-2xl uppercase tracking-widest shadow-xl hover:bg-urban-sand transition-all cursor-pointer">
              Enter Portal
            </button>
          </form>

          <p className="mt-10 text-center text-urban-taupe font-medium">
            New to the platform? <Link to="/signup" className="text-urban-sand font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
      
      {/* Right Side Visual with your Apartment Photo */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="/hero-exterior.jpeg" alt="Apartment" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-urban-sand/20 backdrop-blur-[1px]" />
      </div>
    </div>
  );
};

export default SignIn;