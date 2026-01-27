const { db } = require('../db');

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
exports.create = async (req, res) => {
  if (!req.body.ListName) {
    return res.status(400).send({ error: 'ListName is required' });
  }

  try {
    const list = await db.ReadingBookList.create({
      ListName: req.body.ListName,
      Comment: req.body.Comment || null
    });
    res.status(201).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to create reading list' });
  }
};
