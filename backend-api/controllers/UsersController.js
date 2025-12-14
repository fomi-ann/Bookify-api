const {db} = require('.../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.create =
async (req,res) => {
    if (
        !req.body.Email ||
        !req.body.Username ||
        !req.body.Password ||
        !req.body.ProfileImageUrl ||
        !req.body.PagesReadTotal ||
        !req.body.BooksReadCount
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
    const newUser = {
        UserID: UUID.v7(),
        Email: req.body.Email,
        Username: req.body.Username,
        Password: req.body.Password,
        ProfileImageUrl: req.body.ProfileImageUrl,
        PagesReadTotal: req.body.PagesReadTotal,
        BooksReadCount: req.body.BooksReadCount
    }
    console.log(newUser.UserID)

    const createdUser = await db.users.create(newUser);
    return res
    .location(`${Utilities.getBaseURL(req)}/users/${createdUser.UserID}`).sendStatus(201);
}