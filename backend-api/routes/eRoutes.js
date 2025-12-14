const EventsController = require("../controllers/EventsController")

module.exports = (app) => {
    app.route("/events")
    .post(EventsController.create)
    .get(EventsController.getAll)
}