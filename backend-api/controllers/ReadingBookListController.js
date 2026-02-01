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

exports.getAll = async (req, res) => {
  try {

    const UserID = req.query.UserID || req.session.UserID;

    if (!UserID) {
      return res.status(400).json({ error: "UserID is required to fetch lists" });
    }

    // userID
    const lists = await db.ReadingBookList.findAll({
      where: {
        UserID: UserID
      }
    });

    res.status(200).json(lists);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).send({ error: 'Failed to fetch reading lists' });
  }
};

exports.getByID = async (req, res) => {
try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ 
        error: "Action requires the ID of the specific Reading Book List." 
      });
    }

    const list = await db.ReadingBookList.findByPk(id);

    if (!list) {
      return res.status(404).json({ 
        error: "Reading Book List with the given ID does not exist." 
      });
    }

    res.status(200).json(list);

  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};