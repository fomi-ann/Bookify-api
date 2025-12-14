const UsersController = require("../controllers/UsersController")

module.exports = (app) => {
    app.route("/users")
    .get(UsersController.getAll)
    .post(UsersController.create)
    app.route("/users/:UserID")
    .get(UsersController.getByID)
    .delete(UsersController.deleteById)
    .put(UsersController.modifyById)
}