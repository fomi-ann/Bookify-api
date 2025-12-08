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

exports.modifyById = 
async(req, res) => {
    const bookToBeChanged = await getBook(req, res);
    if(!bookToBeChanged) {
        return;
    }
    if (
        !req.body.Name ||
        !req.body.Description ||
        !req.body.ReadingTimeMin ||
        !req.body.PageCount ||
        !req.body.ReleaseYear ||
        !req.body.Language ||
        !req.body.ISBN ||
        !req.body.CoverImageUrl
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
        bookToBeChanged.Name = req.body.Name;
        bookToBeChanged.Description = req.body.Description;
        bookToBeChanged.ReadingTimeMin = req.body.ReadingTimeMin;
        bookToBeChanged.PageCount = req.body.PageCount;
        bookToBeChanged.ReleaseYear = req.body.ReleaseYear;
        bookToBeChanged.Language = req.body.Language;
        bookToBeChanged.ISBN = req.body.ISBN;
        bookToBeChanged.CoverImageUrl = req.body.CoverImageUrl;

        await bookToBeChanged.save();
        return res
            .location(`${Utilities.getBaseURL(req)}/books/${bookToBeChanged.BookID}`).sendStatus(201)
            .send(bookToBeChanged);
}

exports.create =
async (req,res) => {
    if (
        !req.body.Name ||
        !req.body.Description ||
        !req.body.ReadingTimeMin ||
        !req.body.PageCount ||
        !req.body.ReleaseYear ||
        !req.body.Language ||
        !req.body.ISBN ||
        !req.body.CoverImageUrl
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
    const newBook = {
        BookID: UUID.v7(),
        Name: req.body.Name,
        Description: req.body.Description,
        ReadingTimeMin: req.body.ReadingTimeMin,
        PageCount: req.body.PageCount,
        ReleaseYear: req.body.ReleaseYear,
        Language: req.body.Language,
        ISBN: req.body.ISBN,
        CoverImageUrl: req.body.CoverImageUrl,
    }
    console.log(newBook.BookID)

    const createdBook = await db.books.create(newBook);
    return res
    .location(`${Utilities.getBaseURL(req)}/books/${createdBook.BookID}`).sendStatus(201);
}

exports.deleteById =
    async (req, res) => {
        const bookToBeDeleted = await getBook(req, res);
        if (!bookToBeDeleted) {
            return;
        }
        await bookToBeDeleted.destroy();
        res.status(204).send("No Content")
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