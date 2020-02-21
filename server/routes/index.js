const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
const authRoutes = require('./auth');

// API Routes
router.use('/api', apiRoutes);

// Authentication routes
router.use('/auth', authRoutes);

// If no API routes are hit, use the React app client front end.
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
