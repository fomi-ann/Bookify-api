const UsersController = require("../controllers/UsersController")

module.exports = (app) => {
    app.route("/users")
    .post(UsersController.create)

}