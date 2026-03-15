import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Welcome from './components/Welcome';
import Advisor from './components/Advisor';
import Dashboard from './components/Dashboard';
import LocationMatcher from './components/LocationMatcher';
import BudgetSimulator from './components/BudgetSimulator';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/matcher" element={<LocationMatcher />} />
          <Route path="/simulator" element={<BudgetSimulator />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;