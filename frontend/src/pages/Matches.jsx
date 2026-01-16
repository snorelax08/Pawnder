import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/swipes/matches', {
          headers: { 'x-auth-token': token }
        });
        setMatches(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen p-6 pt-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center mb-8">
        <Link to="/" className="p-3 bg-white/50 rounded-full hover:bg-white transition mr-4">
          <ArrowLeft size={24} className="text-purple-700" />
        </Link>
        <h1 className="text-3xl font-bold text-white">My Matches 🐾</h1>
      </div>

      {/* The Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((pet, index) => (
          <motion.div 
            key={pet._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-3xl p-4 flex gap-4 items-center shadow-lg hover:bg-white/40 transition"
          >
            <img 
              src={pet.image} 
              className="w-24 h-24 rounded-2xl object-cover border-2 border-white/50" 
              alt={pet.name} 
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">{pet.name}, {pet.age}</h3>
              <p className="text-purple-700 font-medium text-sm mb-2">{pet.breed}</p>
              
              <div className="flex items-center text-gray-600 text-sm mb-1">
                <MapPin size={14} className="mr-1" /> {pet.location}
              </div>
              
              <button className="flex items-center text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold mt-2">
                <Phone size={12} className="mr-1" /> Contact Shelter
              </button>
            </div>
          </motion.div>
        ))}

        {matches.length === 0 && (
          <div className="text-center col-span-2 text-white/80 mt-10">
            <h2 className="text-xl">No matches yet... 😢</h2>
            <p>Go back and swipe right on some pets!</p>
          </div>
        )}
      </div>
    </div>
  );
}