import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-urban-sand">
          Urbanly.
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/budget" className="text-urban-charcoal hover:text-urban-sand font-medium transition-colors">Financials</Link>
          <Link to="/explore" className="text-urban-charcoal hover:text-urban-sand font-medium transition-colors">House Hunt</Link>
          <Link to="/logistics" className="text-urban-charcoal hover:text-urban-sand font-medium transition-colors">Logistics</Link>
        </div>

        {/* Profile Action */}
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-urban-beige border border-urban-sand/20 flex items-center justify-center text-urban-sand font-bold">
            JD
          </div>
        </div>
      </div>
    </nav>
  );
};