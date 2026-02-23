import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

/**
 * Urbanly Main Application Routing
 * This configuration manages the flow from authentication directly into the 
 * data-driven dashboard, bypassing the previous onboarding steps.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Default Landing: Redirects the root path to Sign Up */}
        <Route path="/" element={<Navigate to="/signup" />} />
        
        {/* 2. Authentication Flow */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* 3. Core Dashboard: The heart of the Urbanly experience */}
        {/* All authentication buttons are now pointed here */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* 4. Error Handling: Catch-all redirect to ensure a smooth UX */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;