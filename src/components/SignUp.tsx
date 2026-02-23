import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  // 1. THIS IS THE TRIGGER: It must be linked to the form
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing
    console.log("Button clicked, navigating to dashboard..."); 
    navigate('/dashboard'); // This must match the path in your App.tsx
  };

  return (
    <div className="flex min-h-screen bg-urban-beige">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-urban-sand">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-exterior.jpeg" 
            alt="Urbanly Apartments" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-urban-sand/15 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">Urbanly.</h1>
          <p className="text-2xl font-light leading-relaxed max-w-md">
            Your bridge from home to independence.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-left">
            <h3 className="text-3xl font-semibold text-urban-charcoal mb-3">Begin your journey</h3>
            <p className="text-urban-taupe text-lg">Enter your details to build your move-out plan.</p>
          </div>

          {/* 2. THE CRITICAL CONNECTION: onSubmit must be on the FORM tag */}
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="group">
              <label className="block text-sm font-medium text-urban-charcoal mb-2">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="Jane Doe"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-urban-sand/30 focus:border-urban-sand transition-all"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-urban-charcoal mb-2">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="jane@urbanly.co.ke"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-urban-sand/30 focus:border-urban-sand transition-all"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-urban-charcoal mb-2">Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-urban-sand/30 focus:border-urban-sand transition-all"
              />
            </div>

            {/* 3. THE BUTTON TYPE: Must be "submit" */}
            <button 
              type="submit" 
              className="w-full bg-urban-sand hover:bg-urban-sand-dark text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg shadow-urban-sand/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-100 pt-8">
            <p className="text-urban-taupe font-medium">
              Already using Urbanly? 
              <Link to="/signin" className="ml-2 text-urban-sand font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;