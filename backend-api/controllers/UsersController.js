const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.getAll = async(req, res) => {
    const users = await db.users.findAll();
    console.log("getAll: "+ users);
    res
    .status(200)
    .send(users.map(({UserID, UserName, IsAdmin}) => {return{UserID, UserName, IsAdmin}}))
}

exports.getByID = 
async (req, res) => {
    console.log(req.params.UserID)
    const user = await getUser(req, res,"ID");
    console.log(user)
    if (!user) {return res.status(404).send({error: 'User not found'})}
    return res.status(200).send(user)
}

exports.modifyById = 
async(req, res) => {
    const userToBeChanged = await getUser(req, res, "ID");
    if(!userToBeChanged) {
        return;
    }
    if (
        req.body.Email == null ||
        req.body.UserName == null ||
        req.body.FullName == null ||
        req.body.DisplayName == null ||
        req.body.PhoneNumber == null ||
        req.body.PlainPassword == null ||
        req.body.ProfileImageUrl == null ||
        req.body.PagesReadTotal == null ||
        req.body.BooksReadCount == null
    ){
        return res.status(400).send({error:'Missing some parameter, please review your request data.'})
    }
        userToBeChanged.Email = req.body.Email;
        userToBeChanged.UserName = req.body.UserName;
        userToBeChanged.FullName = req.body.FullName;
        userToBeChanged.DisplayName = req.body.DisplayName;
        userToBeChanged.PhoneNumber = req.body.PhoneNumber;
        userToBeChanged.PlainPassword = req.body.PlainPassword;
        userToBeChanged.ProfileImageUrl = req.body.ProfileImageUrl;
        userToBeChanged.PagesReadTotal = req.body.PagesReadTotal;
        userToBeChanged.BooksReadCount = req.body.BooksReadCount;

        await userToBeChanged.save();
        return res
            .location(`${Utilities.getBaseURL(req)}/users/${userToBeChanged.UserID}`)
            .status(201)
            .send(userToBeChanged);
}

exports.create =
async (req,res) => {
    console.log(req.body)
    if (
        !req.body.Email ||
        !req.body.UserName ||
        !req.body.FullName ||
        !req.body.DisplayName ||
        !req.body.PhoneNumber ||
        !req.body.PlainPassword ||
        !req.body.ProfileImageUrl
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
                errors+="Phonenumber, "
                break;
            case !req.body.PlainPassword:
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
        PasswordHASH: (await Utilities.gimmePassword(req.body.PlainPassword)).toString(),
        ProfileImageUrl: req.body.ProfileImageUrl,
        PagesReadTotal: req.body.PagesReadTotal ?? 0,
        BooksReadCount: req.body.BooksReadCount ?? 0
    };
    console.log(newUser.UserID)

    const resultingUser = await db.users.create(newUser);
    return res
    .location(`${Utilities.getBaseURL(req)}/users/${resultingUser.UserID}`).sendStatus(201);
}

exports.deleteById =
    async (req, res) => {
        const userToBeDeleted = await getUser(req, res, "ID");
        if (!userToBeDeleted) {
            return;
        }
        await userToBeDeleted.destroy();
        res.status(204).send("No Content")
    }

exports.me = async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send({ error: "Not signed in" });
  }
  return res.status(200).send(req.session.user);
};

exports.getByEmail = 
async (req, res) => {
    
    const user = await getUser(req, res,"Email");
    if (!user) {return};
    return res.send(user);
}

const getUser =
async (req,res,gtype) => {
    console.log(req.params)
    var user = null;
    var errorReason = "";
    var errorData = ""
    console.log(gtype)
    if(gtype === "Email" && !req.params.Email){
        res.status(400).send({error:`Missing Email`})
                return null;
    }
    switch(gtype){
        case "ID":
            const userID = req.params.UserID;
            user = await db.users.findByPk(userID);            
            errorReason="ID";
            errorData=userID
            return user;
        case "Email":
            const Email = req.params.Email;
            console.log(Email);
            user = await db.users.findOne({where: { Email: Email}})         
            errorReason="Email"
            errorData=Email     
            return user;
            
    }
    if (!user) {
            res.status(404).send({error:`user by this ${errorReason} does not exist${errorData}`})
            return null;
        }  
    
}