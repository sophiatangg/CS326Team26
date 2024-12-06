const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({ ...req.body, creator_id: req.user.id });
        res.status(201).json({ message: 'Event created', event });
    } catch (error) {
        res.status(500).json({ error: 'Error creating event' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
};
