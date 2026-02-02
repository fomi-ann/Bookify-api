const ReadingBookListController = require('../controllers/ReadingBookListController');

module.exports = (app) => {
  app.route('/reading-book-list')
     .post(ReadingBookListController.create)
     .get(ReadingBookListController.getAll);

     app.route('/reading-book-list/:id')
     .get(ReadingBookListController.getByID)
     .put(ReadingBookListController.modifyById)
     .delete(ReadingBookListController.deleteById);

     app.post('/reading-book-list/add-book', ReadingBookListController.addBookToList);
     app.delete('/reading-book-list/:ReadingBookListID/book/:BookID', ReadingBookListController.removeBookFromList);
};