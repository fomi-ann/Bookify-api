const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.create = async (req, res) => {
    if( !req.body.ListName ){
        return res.status(400).send({error:"you are missing Reading List Name"})
    }
    if (!req.body.UserID || !req.body.BookID){
        return res.status(404).send({error: "User or Book not found"})
    }
    let newReadingBookList = {
        ReadingBookListID: UUID.v7(),
        ListName: req.body.ListName,
        Comment: req.body.Comment,
        BookAddedDate: req.body.BookAddedData,
        UserID: req.body.UserID,
        BookID: req.body.BookID
    }
    const createdReadingBookList = await db.order.create(newReadingBookList);
    res
    .location(`${Utilities.getBaseURL(req)}/readingBookLists/${createdReadingBookList.ReadingBookListID}`)
    .sendStatus(201);
}