const UsersController = require("../controllers/UsersController")
const SessionsController = require("../controllers/SessionsController")

module.exports = (app) => {
  app.route("/users")
    .get(UsersController.getAll)
    .post(UsersController.create)

  app.get("/sessions/me", SessionsController.reAuthenticate)

  app.route("/users/:UserID")
    .get(UsersController.getByID)
    .delete(UsersController.deleteById)
    .put(UsersController.modifyById)

  app.route("/users/:LoginEmail")
    .get(UsersController.getByEmail)
}
