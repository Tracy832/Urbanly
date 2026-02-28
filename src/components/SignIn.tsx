import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the Welcome (Hero) page
    navigate('/welcome'); 
  };

  return (
    <div className="flex min-h-screen bg-urban-beige">
      {/* Left Visual Side (Same as SignUp for consistency) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="/hero-exterior.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Urbanly" />
        <div className="absolute inset-0 bg-urban-charcoal/30 backdrop-blur-[1px]" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-6xl font-bold mb-4">Urbanly.</h1>
          <p className="text-xl font-light">Welcome back to your move-out planner.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 bg-white">
        <div className="max-w-md w-full mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-urban-charcoal">Sign In</h3>
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input required type="email" placeholder="jane@urbanly.co.ke" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <button type="submit" className="w-full bg-urban-sand text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-urban-sand/30 transition-all cursor-pointer">
              Sign In
            </button>
          </form>
          <p className="mt-8 text-center text-urban-taupe">
            New here? <Link to="/signup" className="text-urban-sand font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;