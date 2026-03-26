import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 1. Define the Props Type
type SignInProps = {
  setAuth: (value: boolean) => void;
};

const SignIn: React.FC<SignInProps> = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 2. TRIGGER AUTH: Update global app state to "Logged In"
    setAuth(true);
    
    // 3. PATH: Proceed to the Hero/Welcome journey
    navigate('/welcome'); 
  };

  return (
    <div className="flex min-h-screen bg-white text-left selection:bg-urban-sand/30">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 animate-in fade-in slide-in-from-left-4 duration-700">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-12 text-left">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-urban-charcoal mb-4 italic">Urbanly.</h1>
            <h3 className="text-xl font-bold text-urban-taupe uppercase tracking-widest text-[10px]">Welcome back.</h3>
          </div>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Email Address</label>
              <input 
                required 
                type="email" 
                placeholder="tracy@urbanly.co.ke" 
                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Secure Password</label>
              <input 
                required 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all font-bold" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-urban-charcoal text-white font-black py-5 rounded-2xl uppercase tracking-widest shadow-xl hover:bg-urban-sand transition-all cursor-pointer transform active:scale-95"
            >
              Enter Portal
            </button>
          </form>

          <p className="mt-10 text-center text-urban-taupe font-medium text-sm">
            New to the platform? <Link to="/signup" className="text-urban-sand font-bold hover:underline uppercase tracking-tighter">Create Account</Link>
          </p>
        </div>
      </div>
      
      {/* Right Side Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="/hero-exterior.jpeg" alt="Apartment" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-urban-sand/20 backdrop-blur-[1px]" />
      </div>
    </div>
  );
};

export default SignIn;