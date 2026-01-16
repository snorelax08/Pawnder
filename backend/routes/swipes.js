const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// SWIPE RIGHT (LIKE)
router.post('/like/:petId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const petId = req.params.petId;

    // Prevent duplicates
    if (!user.likedPets.includes(petId)) {
      user.likedPets.push(petId);
      await user.save();
    }
    res.json({ msg: 'Liked!', likes: user.likedPets });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// SWIPE LEFT (PASS)
router.post('/pass/:petId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const petId = req.params.petId;

    if (!user.passedPets.includes(petId)) {
      user.passedPets.push(petId);
      await user.save();
    }
    res.json({ msg: 'Passed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }

});

// GET MATCHES (The pets I liked)
router.get('/matches', auth, async (req, res) => {
  try {
    // 1. Find the user
    // 2. .populate('likedPets') replaces the ID numbers with the actual Pet Data
    const user = await User.findById(req.user.id).populate('likedPets');

    // 3. Send back the list of pets
    res.json(user.likedPets);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;