import React from 'react';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-urban-beige">
      {/* LEFT SIDE: The Architectural Visual (Consistent Branding) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-urban-sand">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-exterior.jpeg" 
            alt="Urbanly Modern Living" 
            className="w-full h-full object-cover"
          />
          {/* Matching beige overlay */}
          <div className="absolute inset-0 bg-urban-sand/20 mix-blend-multiply" />
          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-6xl font-bold mb-4 tracking-tight drop-shadow-md">Urbanly.</h1>
          <p className="text-2xl font-light leading-relaxed max-w-md drop-shadow-sm">
            Welcome back. Let's pick up where you left off on your move.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: The Minimalist Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile-only branding */}
          <div className="lg:hidden mb-12">
            <h2 className="text-3xl font-bold text-urban-sand">Urbanly.</h2>
          </div>

          <div className="mb-10 text-left">
            <h3 className="text-3xl font-semibold text-urban-charcoal mb-3">Welcome back</h3>
            <p className="text-urban-taupe text-lg">Enter your credentials to access your dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="group">
              <label className="block text-sm font-medium text-urban-charcoal mb-2 group-focus-within:text-urban-sand transition-colors">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="jane@urbanly.co.ke"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-urban-sand/30 focus:border-urban-sand transition-all"
              />
            </div>

            <div className="group">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-urban-charcoal group-focus-within:text-urban-sand transition-colors">
                  Password
                </label>
                <button type="button" className="text-xs text-urban-sand font-bold hover:underline cursor-pointer">
                  Forgot Password?
                </button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-urban-sand/30 focus:border-urban-sand transition-all"
              />
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 text-urban-sand border-gray-300 rounded focus:ring-urban-sand cursor-pointer" 
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-urban-taupe font-medium cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-urban-sand hover:bg-urban-sand-dark text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg shadow-urban-sand/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-100 pt-8">
            <p className="text-urban-taupe font-medium">
              New to Urbanly? 
              <Link to="/signup" className="ml-2 text-urban-sand font-bold hover:underline transition-all">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;