const mongoose = require('mongoose');
const Pet = require('./models/Pet');

mongoose.connect('mongodb://localhost:27017/pawnder')
  .then(() => seedDB())
  .catch(err => {
    console.log('❌ Could not connect to MongoDB. Skipping seed.');
    process.exit(1);
  });

const pets = [
  { name: 'Luna', age: 2, breed: 'Golden Retriever', location: 'New York', image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500', description: 'Loves ball.', traits: ['Playful'] },
  { name: 'Max', age: 4, breed: 'German Shepherd', location: 'Chicago', image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500', description: 'Very loyal.', traits: ['Protective'] },
  { name: 'Bella', age: 1, breed: 'Frenchie', location: 'LA', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500', description: 'Snuggle bug.', traits: ['Cute'] }
];

const seedDB = async () => {
  try {
    await Pet.deleteMany({});
    await Pet.insertMany(pets);
    console.log('✅ Database Seeded!');
  } catch (e) {
    console.log(e);
  }
  process.exit();
};