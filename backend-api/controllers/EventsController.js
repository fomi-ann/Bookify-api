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
        !req.body.EventMaxParticipantAmount ||
        !req.body.EventCurrentParticipantAmount ||
        !req.body.EventLanguage
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
    const newEvent = {
        EventID: UUID.v7(),
        EventName: req.body.Name,
        EventStartDate: req.body.EventStartDate,
        EventEndDate: req.body.EventEndDate,
        EventDescription: req.body.EventDescription,
        EventLocation: req.body.EventLocation,
        EventCost: req.body.EventCost,
        EventMaxParticipantAmount: req.body.EventMaxParticipantAmount,
        EventCurrentParticipantAmount: req.body.EventCurrentParticipantAmount,
        EventLanguage: req.body.EventLanguage,
    }
    console.log(newEvent.EventID)

    const createdEvent = await db.events.create(newEvent);
    return res
    .location(`${Utilities.getBaseURL(req)}/events/${createdEvent.EventID}`).sendStatus(201);
}