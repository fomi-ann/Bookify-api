const ReadingBookListController = require('../controllers/ReadingBookListController');

module.exports = (app) => {
  app.route('/reading-book-list')
     .post(ReadingBookListController.create)
     .get(ReadingBookListController.getAll);
};