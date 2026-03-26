import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (pass: string) => {
    // Regex: At least 8 chars, 1 Upper, 1 Lower, 1 Special
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(pass);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 special symbol.");
      return;
    }

    localStorage.setItem('user_name', fullName);
    navigate('/'); 
  };

  return (
    <div className="flex min-h-screen bg-urban-beige text-left">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-urban-charcoal text-left">
        <img src="/hero-exterior.jpeg" alt="Urbanly" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 italic">Urbanly.</h1>
          <p className="text-2xl font-light leading-relaxed max-w-md opacity-80">The bridge to independent living.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-urban-charcoal mb-2 italic">Create Account</h3>
            <p className="text-urban-taupe font-medium">Join the data-driven independence movement.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-xs font-bold animate-in fade-in zoom-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Full Name</label>
              <input required type="text" placeholder="Tracy Kibue" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none font-bold" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Password</label>
              <input 
                required 
                type="password" 
                placeholder="Ex: Urban@26" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-4 rounded-2xl border ${error ? 'border-red-300' : 'border-gray-100'} bg-gray-50 focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all font-bold`} 
              />
            </div>

            <button type="submit" className="w-full bg-urban-sand text-white font-black py-5 rounded-2xl uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              Begin Journey
            </button>
          </form>
          <p className="mt-10 text-center text-urban-taupe font-medium">
            Already a member? <Link to="/login" className="text-urban-sand font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;