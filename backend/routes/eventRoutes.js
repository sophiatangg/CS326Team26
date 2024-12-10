const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/', filterEvents);

module.exports = router;
