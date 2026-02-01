const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.create = 
async (req, res) => {
  if (
    !req.body.ListName
  ) {
    return res.status(400).send({ error: 'ListName is required' });
  }

  try {
    const newReadingBookList = {
      UserID: req.session.UserID,
      ReadingBookListID: UUID.v7(),
      ListName: req.body.ListName,
      Comment: req.body.Comment || null
    }
    const createdReadingList = await db.ReadingBookList.create(newReadingBookList);
    console.log(createdReadingList);
    res.status(201).json(createdReadingList);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to create reading list' });
  }
};
