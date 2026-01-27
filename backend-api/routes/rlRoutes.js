const ReadingBookListController = require('../controllers/ReadingBookListController');

module.exports = (app) => {
  app.route('/reading-book-list')
     .get(ReadingBookListController.getAll)   // must be function reference
     .post(ReadingBookListController.create);

  app.route('/reading-book-list/:id')
     .get(ReadingBookListController.getByID);
};
