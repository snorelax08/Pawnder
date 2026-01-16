import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Matches from './pages/Matches';

// A special guard: If no token, go to Login
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Set Login as the default page if not logged in */}
        <Route path="/login" element={<Login />} />
        
        {/* Register Route */}
        <Route path="/register" element={<Register />} />
        
        {/* Protected Home Page */}
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        {/* 👇 THIS WAS MISSING: The Matches Page Route */}
        <Route path="/matches" element={
          <PrivateRoute>
            <Matches />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;