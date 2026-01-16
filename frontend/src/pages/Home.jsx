import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, LogOut, MessageCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Home() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      // Get all pets
      const res = await axios.get('http://localhost:5000/api/pets');
      setPets(res.data.pets);
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch pets");
    }
  };

  const handleSwipe = async (direction, petId) => {
    // 1. Remove from screen immediately (Optimistic UI)
    setPets(prev => prev.filter(p => p._id !== petId));

    // 2. Get Token
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    // 3. Call API
    try {
      if (direction === 'right') {
        await axios.post(`http://localhost:5000/api/swipes/like/${petId}`, {}, config);
        toast.success('Liked! 💖');
      } else {
        await axios.post(`http://localhost:5000/api/swipes/pass/${petId}`, {}, config);
        toast('Passed', { icon: '👋' });
      }
    } catch (err) {
      // If error, silently fail or show toast
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 px-4">
      {/* Header */}
      <nav className="flex justify-between items-center w-full max-w-md mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Pawnder</h2>
        
        <div className="flex gap-4">
          {/* Matches Button */}
          <Link to="/matches" className="p-2 bg-white/50 rounded-full hover:bg-purple-100 transition">
            <MessageCircle size={20} className="text-purple-600" />
          </Link>

          {/* Logout Button */}
          <button onClick={handleLogout} className="p-2 bg-white/50 rounded-full hover:bg-red-100 transition">
            <LogOut size={20} className="text-gray-600" />
          </button>
        </div>
      </nav>

      {/* Card Stack */}
      <div className="relative w-full max-w-sm h-[500px]">
        <AnimatePresence>
          {pets.map((pet, index) => (
            <motion.div
              key={pet._id}
              initial={{ scale: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x > 100) handleSwipe('right', pet._id);
                else if (offset.x < -100) handleSwipe('left', pet._id);
              }}
              // Stack effect: Give slight rotation and offset to cards behind
              style={{ zIndex: 50 - index }}
              animate={{ 
                scale: index === 0 ? 1 : 0.95,
                y: index === 0 ? 0 : 10 
              }}
              className="absolute w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <img src={pet.image} className="w-full h-3/4 object-cover pointer-events-none" alt={pet.name} />
              
              {/* Text Overlay */}
              <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white pt-20">
                <h3 className="text-3xl font-bold">{pet.name}, {pet.age}</h3>
                <p className="text-gray-200 text-lg">{pet.breed}</p>
                <div className="flex gap-2 mt-3">
                  {pet.traits && pet.traits.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/30">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {pets.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-700">No more pets!</h3>
            <p className="text-gray-500">Come back later for more.</p>
          </div>
        )}
      </div>

      {/* Manual Buttons */}
      <div className="flex gap-8 mt-8 z-50">
        <button 
          onClick={() => pets.length > 0 && handleSwipe('left', pets[0]._id)}
          className="p-4 bg-white rounded-full shadow-lg text-red-500 hover:scale-110 hover:bg-red-50 transition"
        >
          <X size={32} />
        </button>
        <button 
          onClick={() => pets.length > 0 && handleSwipe('right', pets[0]._id)}
          className="p-4 bg-white rounded-full shadow-lg text-green-500 hover:scale-110 hover:bg-green-50 transition"
        >
          <Heart size={32} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}