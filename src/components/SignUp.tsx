import React from 'react';

const SignUp: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-urban-beige">
      {/* LEFT SIDE: The Architectural Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-urban-sand">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-exterior.jpeg" 
            alt="Modern Urbanly Apartment Exterior" 
            className="w-full h-full object-cover"
          />
          {/* Subtle beige overlay to blend the photo with the brand theme */}
          <div className="absolute inset-0 bg-urban-sand/15 mix-blend-multiply" />
          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-6xl font-bold mb-4 tracking-tight drop-shadow-md">Urbanly.</h1>
          <p className="text-2xl font-light leading-relaxed max-w-md drop-shadow-sm">
            Your bridge from home to independence. 
            Designed for the modern Kenyan lifestyle.
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
            <h3 className="text-3xl font-semibold text-urban-charcoal mb-3">Begin your journey</h3>
            <p className="text-urban-taupe text-lg">Enter your details to build your move-out plan.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="group">
              <label className="block text-sm font-medium text-urban-charcoal mb-2 group-focus-within:text-urban-sand transition-colors">
                Full Name
              </label>
              <input 
                type="text" 
                placeholder="Jane Doe"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-urban-sand/30 focus:border-urban-sand transition-all"
              />
            </div>

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
              <label className="block text-sm font-medium text-urban-charcoal mb-2 group-focus-within:text-urban-sand transition-colors">
                Current Goal
              </label>
              <select className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-urban-sand/30 focus:border-urban-sand transition-all appearance-none cursor-pointer">
                <option>Moving out from my parents' home</option>
                <option>Relocating to a new neighborhood</option>
                <option>Budgeting for future independence</option>
              </select>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-urban-charcoal mb-2 group-focus-within:text-urban-sand transition-colors">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-urban-sand/30 focus:border-urban-sand transition-all"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-urban-sand hover:bg-urban-sand-dark text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg shadow-urban-sand/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
            >
              Create Account
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-50 pt-8">
            <p className="text-urban-taupe font-medium">
              Already using Urbanly? 
              <button className="ml-2 text-urban-sand font-bold hover:underline">Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;