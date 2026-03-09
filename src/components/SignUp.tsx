import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Path: Auth -> Welcome
    navigate('/welcome'); 
  };

  return (
    <div className="flex min-h-screen bg-urban-beige">
      {/* Visual Branding Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-urban-charcoal">
        <img 
          src="/hero-exterior.jpeg" 
          alt="Urbanly Apartments" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-4">Urbanly.</h1>
          <p className="text-2xl font-light leading-relaxed max-w-md opacity-80">
            The bridge between living with parents and your first independent home.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-urban-charcoal mb-2">Create Account</h3>
            <p className="text-urban-taupe font-medium">Join the data-driven independence movement.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Full Name</label>
              <input required type="text" placeholder="Tracy Kibue" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Email Address</label>
              <input required type="email" placeholder="tracy@urbanly.co.ke" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-urban-sand">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <button type="submit" className="w-full bg-urban-sand text-white font-black py-5 rounded-2xl uppercase tracking-widest shadow-xl shadow-urban-sand/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">
              Begin Journey
            </button>
          </form>

          <p className="mt-10 text-center text-urban-taupe font-medium">
            Already a member? <Link to="/signin" className="text-urban-sand font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;