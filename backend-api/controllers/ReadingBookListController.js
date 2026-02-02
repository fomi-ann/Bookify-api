const { db } = require("../db");
const Utilities = require("./Utilities");
const UUID = require("uuid");

exports.create = async (req, res) => {
  if (!req.body.ListName) {
    return res.status(400).send({ error: "ListName is required" });
  }

  try {
    const newReadingBookList = {
      UserID: req.session.UserID,
      ReadingBookListID: UUID.v7(),
      ListName: req.body.ListName,
      Comment: req.body.Comment || null,
    };
    const createdReadingList =
      await db.ReadingBookList.create(newReadingBookList);
    console.log(createdReadingList);
    res.status(201).json(createdReadingList);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to create reading list" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const UserID = req.query.UserID || req.session.UserID;

    if (!UserID) {
      return res
        .status(400)
        .json({ error: "UserID is required to fetch lists" });
    }

    // userID
    const lists = await db.ReadingBookList.findAll({
      where: {
        UserID: UserID,
      },
    });

    res.status(200).json(lists);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).send({ error: "Failed to fetch reading lists" });
  }
};

exports.getByID = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        error: "Action requires the ID of the specific Reading Book List.",
      });
    }

    const list = await db.ReadingBookList.findByPk(id);

    if (!list) {
      return res.status(404).json({
        error: "Reading Book List with the given ID does not exist.",
      });
    }

    res.status(200).json(list);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

exports.modifyById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        error: "Action requires the ID of the specific Reading Book List.",
      });
    }

    const list = await db.ReadingBookList.findByPk(id);
    if (!list) {
      return res.status(404).json({
        error: "Reading Book List with the given ID does not exist.",
      });
    }

    list.ListName = req.body.ListName || list.ListName;
    list.Comment =
      req.body.Comment !== undefined ? req.body.Comment : list.Comment;

    await list.save();

    res.status(201).json(list);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const id = req.params.id;

    const list = await db.ReadingBookList.findByPk(id);

    if (!list) {
      return res.status(404).json({
        error: "Reading Book List with specified ID is not found.",
      });
    }
    await list.destroy();

    res.status(204).send("No Content");
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

// add to reading list
exports.addBookToList = async (req, res) => {
  try {
    const { ReadingBookListID, BookID } = req.body;

    // check if book already added
    const existingEntry = await db.ReadingBookListBooks.findOne({
      where: { ReadingBookListID, BookID },
    });

    if (existingEntry) {
      return res
        .status(400)
        .json({ error: "This book is already in that list!" });
    }

    await db.ReadingBookListBooks.create({
      ReadingBookListID,
      BookID,
    });

    res.status(201).json({ message: "Book added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add book to the list." });
  }
};

// get books in ReadingBookList
exports.getByID = async (req, res) => {
  try {
    const id = req.params.id;

    const list = await db.ReadingBookList.findByPk(id, {
      include: [
        {
          model: db.books,
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

// remove (delete) book from list
exports.removeBookFromList = async (req, res) => {
  try {
    const { ReadingBookListID, BookID } = req.params;

    const deleted = await db.ReadingBookListBooks.destroy({
      where: {
        ReadingBookListID: ReadingBookListID,
        BookID: BookID,
      },
    });

    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Relation not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

// try merge
