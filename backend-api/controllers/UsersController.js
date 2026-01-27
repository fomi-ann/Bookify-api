const { db } = require('../db');
// const { requireAuth } = require('./Auth'); // your auth helper
const { v7: uuidv7 } = require('uuid');

exports.getAllForUser = async (req, res) => {
  if (!requireAuth(req, res)) return;

  try {
    const lists = await db.ReadingBookList.findAll({
      where: { UserID: req.session.UserID }
    });

    res.status(200).send(lists);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error fetching reading lists' });
  }
};

exports.create = async (req, res) => {
  if (!requireAuth(req, res)) return;

  const { ListName, Comment } = req.body;

  if (!ListName) {
    return res.status(400).send({ error: 'ListName is required' });
  }

  try {
    const newList = await db.ReadingBookList.create({
      ReadingBookListID: uuidv7(),
      ListName,
      Comment: Comment || null,
      UserID: req.session.UserID
    });

    res
      .location(`/reading-book-list/${newList.ReadingBookListID}`)
      .status(201)
      .send(newList);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error creating reading list' });
  }
};

exports.getByID = async (req, res) => {
  if (!requireAuth(req, res)) return;

  const id = req.params.id;

  try {
    const list = await db.ReadingBookList.findByPk(id);

    if (!list) return res.status(404).send({ error: 'Reading list not found' });

    res.status(200).send(list);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error fetching reading list' });
  }
};
