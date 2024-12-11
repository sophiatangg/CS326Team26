const express = require('express');
const { createEvent, getEvents, getFilteredEvents } = require('../controllers/eventController');

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/', getFilteredEvents);

module.exports = router;
