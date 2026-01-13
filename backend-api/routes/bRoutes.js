const BooksController = require("../controllers/BooksController")
const UsersController = require("../controllers/UsersController")
const SessionsController = require("../controllers/SessionsController")

module.exports = (app) => {
    app.route("/books")
    .get(BooksController.getAll)
    .post(BooksController.create)
    app.route("/books/:BookID")
    .get(BooksController.getByID)
    .delete(BooksController.deleteById)
    .put(BooksController.modifyById)

    app.route("/users")
    .get(UsersController.getAll)
    .post(UsersController.create)
    app.route("/users/:UserID")
    .get(UsersController.getByID)
    app.route("/users/:LoginEmail")
    .get(UsersController.getByEmail)
    app.route("/session")
    .post(SessionsController.newSession)
}