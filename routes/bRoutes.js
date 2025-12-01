const BooksController = require("../controllers/BooksController")

module.exports = (app) => {
    app.route("/books")
    .get(BooksController.getAll)
}