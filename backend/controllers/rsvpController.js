const { Rsvp } = require('../models'); // Import the Rsvp model

// Create a new RSVP
exports.createRsvp = async (req, res) => {
    try {
        const { rsvp_id, user_id, event_id, response, dietary_restrictions, accessibility_needs } = req.body;
        const rsvp = await Rsvp.create({
            rsvp_id,
            user_id,
            event_id,
            response,
            dietary_restrictions,
            accessibility_needs,
        });
        res.status(201).json({ message: 'RSVP created', rsvp });
    } catch (error) {
        console.error('Error creating RSVP:', error);
        res.status(500).json({ error: 'Error creating RSVP' });
    }
};

// Get all RSVPs
exports.getRsvps = async (req, res) => {
    try {
        const rsvps = await Rsvp.findAll();
        res.status(200).json({ message: 'RSVPs retrieved', rsvps });
    } catch (error) {
        console.error('Error retrieving RSVPs:', error);
        res.status(500).json({ error: 'Error retrieving RSVPs' });
    }
};

// Get a single RSVP by ID
exports.getRsvpById = async (req, res) => {
    try {
        const { id } = req.params;
        const rsvp = await Rsvp.findByPk(id);
        if (!rsvp) {
            return res.status(404).json({ error: 'RSVP not found' });
        }
        res.status(200).json({ message: 'RSVP retrieved', rsvp });
    } catch (error) {
        console.error('Error retrieving RSVP:', error);
        res.status(500).json({ error: 'Error retrieving RSVP' });
    }
};

// Update an RSVP
exports.updateRsvp = async (req, res) => {
    try {
        const { id } = req.params;
        const rsvp = await Rsvp.findByPk(id);
        if (!rsvp) {
            return res.status(404).json({ error: 'RSVP not found' });
        }
        const updatedRsvp = await rsvp.update(req.body);
        res.status(200).json({ message: 'RSVP updated', updatedRsvp });
    } catch (error) {
        console.error('Error updating RSVP:', error);
        res.status(500).json({ error: 'Error updating RSVP' });
    }
};

// Delete an RSVP
exports.deleteRsvp = async (req, res) => {
    try {
        const { id } = req.params;
        const rsvp = await Rsvp.findByPk(id);
        if (!rsvp) {
            return res.status(404).json({ error: 'RSVP not found' });
        }
        await rsvp.destroy();
        res.status(204).json({ message: 'RSVP deleted' });
    } catch (error) {
        console.error('Error deleting RSVP:', error);
        res.status(500).json({ error: 'Error deleting RSVP' });
    }
};
