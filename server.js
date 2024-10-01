const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
require('dotenv').config();

const tracksRoutes = require('./controllers/tracks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(methodOverride('_method')); // Use method override for PUT/DELETE

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Routes
app.use('/tracks', tracksRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
