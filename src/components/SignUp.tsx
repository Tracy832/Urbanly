import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the Welcome (Hero) page
    navigate('/welcome'); 
  };

  return (
    <div className="flex min-h-screen bg-urban-beige">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="/hero-exterior.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Urbanly" />
        <div className="absolute inset-0 bg-urban-charcoal/30" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-6xl font-bold mb-4">Urbanly.</h1>
          <p className="text-xl font-light">Bridge the gap to your independence.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 bg-white">
        <div className="max-w-md w-full mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-urban-charcoal">Create Account</h3>
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input required type="text" placeholder="Jane Doe" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input required type="email" placeholder="jane@urbanly.co.ke" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-urban-sand/20 outline-none transition-all" />
            </div>
            <button type="submit" className="w-full bg-urban-sand text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-urban-sand/30 transition-all cursor-pointer">
              Create Account
            </button>
          </form>
          <p className="mt-8 text-center text-urban-taupe">
            Already have an account? <Link to="/signin" className="text-urban-sand font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;