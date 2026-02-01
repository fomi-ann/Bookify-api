const { db } = require('../db');
const UUID = require('uuid');

// Fetch all lists
exports.getAll = async (req, res) => {
  try {
    const lists = await db.ReadingBookList.findAll();
    res.status(200).json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch reading lists' });
  }
};

// Fetch single list by ID
exports.getByID = async (req, res) => {
  try {
    const list = await db.ReadingBookList.findByID(req.params.id);
    if (!list) return res.status(404).send({ error: 'List not found' });
    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch reading list' });
  }
};

// Create new list
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
