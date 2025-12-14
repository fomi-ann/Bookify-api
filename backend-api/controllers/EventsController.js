const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

// Create an Event
exports.create =
async (req,res) => {
    if (
        !req.body.EventName ||
        !req.body.EventStartDate||
        !req.body.EventEndDate ||
        !req.body.EventDescription ||
        !req.body.EventLocation ||
        !req.body.EventCost ||
        !req.body.EventMaxParticipantCount ||
        !req.body.EventCurrentParticipantCount ||
        !req.body.EventLanguage
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
    const newEvent = {
        EventID: UUID.v7(),
        EventName: req.body.EventName,
        EventStartDate: req.body.EventStartDate,
        EventEndDate: req.body.EventEndDate,
        EventDescription: req.body.EventDescription,
        EventLocation: req.body.EventLocation,
        EventCost: req.body.EventCost,
        EventMaxParticipantCount: req.body.EventMaxParticipantCount,
        EventCurrentParticipantCount: req.body.EventCurrentParticipantCount,
        EventLanguage: req.body.EventLanguage,
    }
    console.log(newEvent.EventID)

    const createdEvent = await db.events.create(newEvent);
    return res
    .location(`${Utilities.getBaseURL(req)}/events/${createdEvent.EventID}`).sendStatus(201);
}

// Get all Events
exports.getAll = async(req, res) => {
    const events = await db.events.findAll();
    console.log("getAll: "+ events);
    res
    .status(200)
    .send(events.map(({EventID, EventName}) => {return{EventID, EventName}}))
}

// Get Event
const getEvent =
async (req, res) => {
    const idNumber = req.params.EventID;
    console.log(idNumber)
    const event = await db.events.findByPk(idNumber);
    if(!event) {
        res.status(404).send({error: `Event with this id was not found ${idNumber}`})
        return null;
    }
    return event;
}

// Get Event by ID
exports.getByID = 
async (req, res) => {
    console.log(req.params.EventID)
    const event = await getEvent(req, res);
    console.log(event)
    if (!event) {return res.status(404).send({error: 'Event not found'})}
    return res.status(200).send(event)
}