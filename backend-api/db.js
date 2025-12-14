const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_USERPASS,

    {
        host: process.env.DB_HOSTNAME,
        dialect: 'mariadb',
        logging: console.log,
    }
)

async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully, yippie!')
    } catch (error) {
        console.error('Unable to connect. ' + error)
    }
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// need to add others as well
db.books = require("./models/Book.js")(sequelize,DataTypes);
db.users = require("./models/User.js")(sequelize,DataTypes);

db.readingBookList = require("./models/ReadingBookList.js")(sequelize,DataTypes, db.books);

// db.readingBookList.hasOne(db.users)
// db.users.hasMany(db.readingBookList)
// db.readingBookList.hasMany(db.books)
// db.books.hasMany(db.readingBookList)
db.events = require("./models/Event.js")(sequelize,DataTypes);

const sync = (async () => {
    await sequelize.sync({alter: true});
    console.log('DB sync has been completed.');
})

module.exports = {db, sync};