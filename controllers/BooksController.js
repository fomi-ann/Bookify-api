const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.getAll = async(req, res) => {
    const books = await db.books.findAll();
    console.log("getAll: "+ books);
    res
    .status(200)
    .send(books.map(({BookID, Name}) => {return{BookID, Name}}))
}

exports.getByID = 
async (req, res) => {
    console.log(req.params.BookID)
    const book = await getBook(req, res);
    console.log(book)
    if (!book) {return res.status(404).send({error: 'Book not found'})}
    return res.status(200).send(book)
}

const getBook =
async (req, res) => {
    const idNumber = req.params.BookID;
    console.log(idNumber)
    // if(isNaN(idNumber)) {
    //     res.status(400).send({error: `Entered id is not valid ${idNumber}`})
    //     return null;
    // }
    const book = await db.books.findByPk(idNumber);
    if(!book) {
        res.status(404).send({error: `Book with this id was not found ${idNumber}`})
        return null;
    }
    return book;
}