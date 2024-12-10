const express = require('express');
const { createRsvp, getRsvps, getRsvpById, updateRsvp, deleteRsvp } = require('../controllers/rsvpController.js');

const router = express.Router();

router.post('/', createRsvp); // Route to create a new RSVP
router.get('/', getRsvps); // Route to get all RSVPs
router.get('/:id', getRsvpById); // Route to get a single RSVP by ID
router.put('/:id', updateRsvp); // Route to update an RSVP
router.delete('/:id', deleteRsvp); // Route to delete an RSVP

module.exports = router;
