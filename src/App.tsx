import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to Sign Up */}
        <Route path="/" element={<Navigate to="/signup" />} />
        
        {/* Authentication Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* The Welcome Landing Page */}
        <Route path="/welcome" element={<Welcome />} />

        {/* The Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;