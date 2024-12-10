// const Event = require('../models/Event');
const { Event } = require('../models'); // Ensure correct path to the models directory

exports.createEvent = async (req, res) => {
    try {
        // const event = await Event.create({ ...req.body, creator_id: req.user.id });
        const event = await Event.create({ ...req.body });

        res.status(201).json({ message: 'Event created', event });
    } catch (error) {
        console.log(error);
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

exports.getFilteredEvents = async (req,res) => {
    try{
        const {catergory, location, date} = req.query;
        const filterCriteria = {};
        if (category) {
            filterCriteria.catergory = catergory;
        }
        if (location) {
            filterCriteria.location = location;
        }  
        if (date) {
            filterCriteria.date = date; 
        }
        const events = await Event.findAll({
            where: filterCriteria 
        })
        res.status(200).json(events);

    }catch (error) {
        res.status(500).json({ error: 'Error filtering events' });
    }
}

