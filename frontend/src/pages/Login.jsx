import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      toast.success('Welcome back!');
      navigate('/');
      window.location.reload();
    } catch (err) {
      toast.error('Invalid Credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-3xl w-full max-w-md shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Pawnder 🐾</h1>
        <p className="text-center text-gray-500 mb-8">Find your furry soulmate</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 rounded-xl bg-white/50 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 rounded-xl bg-white/50 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-purple-600 hover:underline">New here? Create Account</Link>
        </div>
      </motion.div>
    </div>
  );
}