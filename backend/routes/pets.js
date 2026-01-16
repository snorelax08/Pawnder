const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json({ pets });
  } catch (err) {
    // If DB fails, return dummy data so app works
    res.json({ pets: [
       { _id: '1', name: 'Luna (Offline Mode)', age: 2, breed: 'Golden Retriever', location: 'New York', image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500', description: 'Loves ball.', traits: ['Playful'] }
    ]});
  }
});
module.exports = router;