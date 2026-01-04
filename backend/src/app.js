const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const marketRoutes = require('./routes/marketRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');
const testRoutes = require('./routes/testRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images) - Optional for now
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount routes
app.use('/auth', authRoutes);
app.use('/reports', reportRoutes);
app.use('/market', marketRoutes);
app.use('/gamification', gamificationRoutes);
app.use('/user', userRoutes)
app.use('/test', testRoutes)

module.exports = app;
