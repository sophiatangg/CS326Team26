const express = require('express');
const userRoutes = require('./userRoutes.js');
const eventRoutes = require('./eventRoutes');
const rsvpRoutes = require('./rsvpRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/rsvp', rsvpRoutes);

module.exports = router;
