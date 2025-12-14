const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.getAll = async(req, res) => {
    const users = await db.users.findAll();
    console.log("getAll: "+ users);
    res
    .status(200)
    .send(users.map(({UserID, UserName}) => {return{UserID, UserName}}))
}

exports.getByID = 
async (req, res) => {
    console.log(req.params.UserID)
    const user = await getUser(req, res);
    console.log(user)
    if (!user) {return res.status(404).send({error: 'User not found'})}
    return res.status(200).send(user)
}

exports.modifyById = 
async(req, res) => {
    const userToBeChanged = await getUser(req, res);
    if(!userToBeChanged) {
        return;
    }
    if (
        !req.body.Email ||
        !req.body.UserName ||
        !req.body.FullName ||
        !req.body.DisplayName ||
        !req.body.PhoneNumber ||
        !req.body.PasswordHASH ||
        !req.body.ProfileImageUrl ||
        !req.body.PagesReadTotal ||
        !req.body.BooksReadCount
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
        userToBeChanged.Email = req.body.Email;
        userToBeChanged.UserName = req.body.UserName;
        userToBeChanged.FullName = req.body.FullName;
        userToBeChanged.DisplayName = req.body.DisplayName;
        userToBeChanged.PhoneNumber = req.body.PhoneNumber;
        userToBeChanged.PasswordHASH = req.body.PasswordHASH;
        userToBeChanged.ProfileImageUrl = req.body.ProfileImageUrl;
        userToBeChanged.PagesReadTotal = req.body.PagesReadTotal;
        userToBeChanged.BooksReadCount = req.body.BooksReadCount;

        await userToBeChanged.save();
        return res
            .location(`${Utilities.getBaseURL(req)}/users/${userToBeChanged.UserID}`).sendStatus(201)
            .send(userToBeChanged);
}

exports.create =
async (req,res) => {
    if (
        !req.body.Email ||
        !req.body.UserName ||
        !req.body.FullName ||
        !req.body.DisplayName ||
        !req.body.PhoneNumber ||
        !req.body.PasswordHASH ||
        !req.body.ProfileImageUrl ||
        !req.body.PagesReadTotal ||
        !req.body.BooksReadCount
    ){
        const bodycontent = req.body;
        var errors = "";
        switch(bodycontent) 
        {
            case !req.body.Email:
                errors+="Email, "
                break;
            case !req.body.UserName:
                errors+="UserName, "
                break;
            case !req.body.FullName:
                errors+="FullName, "
                break;
            case !req.body.DisplayName:
                errors+="DisplayName, "
                break;
            case !req.body.PhoneNumber:
                errors+="DisplayName, "
                break;
            case !req.body.PasswordHASH:
                errors+="Password, "
                break;
            case !req.body.ProfileImageUrl:
                errors+="ProfileImageUrl, "
                break; 
            case !req.body.PagesReadTotal:
                errors+="PagesReadTotal, "
                break;
            case !req.body.BooksReadCount:
                errors+="BooksReadCount, "
                break;
            default:
                break;
        }
        return res.status(400).send({error:`Missing some parameter: ${errors}`})
    }
    const newUser = {
        UserID: UUID.v7(),
        Email: req.body.Email,
        UserName: req.body.UserName,
        FullName: req.body.FullName,
        DisplayName: req.body.DisplayName,
        PhoneNumber: req.body.PhoneNumber,
        PasswordHASH: (await Utilities.gimmePassword(req.body.PasswordHASH)).toString(),
        ProfileImageUrl: req.body.ProfileImageUrl,
        PagesReadTotal: req.body.PagesReadTotal,
        BooksReadCount: req.body.BooksReadCount,
        
    }
    console.log(newUser.UserID)

    if(req.body.PhoneNumber2FA != null){
        newUser.PhoneNumber2FA = Utilities.gimmePassword(req.body.PhoneNumber2FA).toString();}

    const createdUser = await db.users.create(newUser);
    return res
    .location(`${Utilities.getBaseURL(req)}/users/${createdUser.UserID}`).sendStatus(201);
}

exports.deleteById =
    async (req, res) => {
        const userToBeDeleted = await getUser(req, res);
        if (!userToBeDeleted) {
            return;
        }
        await userToBeDeleted.destroy();
        res.status(204).send("No Content")
    }

const getUser =
async (req, res) => {
    const idNumber = req.params.UserID;
    console.log(idNumber)
    const user = await db.users.findByPk(idNumber);
    if(!user) {
        res.status(404).send({error: `User with this id was not found ${idNumber}`})
        return null;
    }
    return user;
}