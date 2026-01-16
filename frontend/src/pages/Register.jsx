import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hit the REAL backend
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // Save the Real Token
      localStorage.setItem('token', res.data.token);
      toast.success('Welcome to Pawnder! 🐾');
      navigate('/');
      window.location.reload(); // Force app to see the new token
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-3xl w-full max-w-md shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Join Pawnder</h1>
        <p className="text-center text-gray-500 mb-6">Create an account</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 rounded-xl bg-white/50 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
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
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-purple-600 hover:underline">Already have an account? Login</Link>
        </div>
      </motion.div>
    </div>
  );
}