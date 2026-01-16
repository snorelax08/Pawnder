const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB (Try local, fallback to log)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pawnder')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error (Ignore if no MongoDB installed):', err.message));

app.get('/', (req, res) => res.send('Pawnder API Running'));

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/swipes', require('./routes/swipes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));