import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

type SignInProps = {
  setAuth: (value: boolean) => void;
};

const SignIn: React.FC<SignInProps> = ({ setAuth }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (pass: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(pass);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
    setError("Invalid password format.The password must be exactly 8 characters long and include at least one uppercase letter, one lowercase letter, and one special symbol.");
      return;
    }

    setAuth(true);
    navigate('/welcome'); 
  };

  return (
    <div className="flex min-h-screen bg-white text-left selection:bg-urban-sand/30">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-urban-charcoal mb-4 italic">Urbanly.</h1>
            <h3 className="text-xl font-bold text-urban-taupe uppercase tracking-widest text-[10px]">Welcome back.</h3>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-xs font-bold">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Email</label>
              <input required type="email" placeholder="tracy@urbanly.co.ke" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none font-bold" 
              />
            </div>
            <button type="submit" className="w-full bg-urban-charcoal text-white font-black py-5 rounded-2xl uppercase tracking-widest shadow-xl hover:bg-urban-sand transition-all">
              Enter Portal
            </button>
          </form>
          <p className="mt-10 text-center text-urban-taupe font-medium text-sm">
            New? <Link to="/signup" className="text-urban-sand font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="/hero-exterior.jpeg" alt="Apartment" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-urban-sand/20 backdrop-blur-[1px]" />
      </div>
    </div>
  );
};

export default SignIn;