const {Sequelize, DataTypes} = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

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

const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: "Sessions"
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// need to add others as well
db.books = require("./models/Book.js")(sequelize,DataTypes);
db.users = require("./models/User.js")(sequelize,DataTypes);
db.events = require("./models/Event.js")(sequelize,DataTypes);

db.ReadingBookList = require("./models/ReadingBookList.js")(
  sequelize,
  Sequelize.DataTypes
);

db.ReadingBookListBooks = require("./models/ReadingBookListBooks.js")(
  sequelize,
  Sequelize.DataTypes
);

db.users.hasMany(db.ReadingBookList, {
  foreignKey: 'UserID'
});

db.ReadingBookList.belongsTo(db.users, {
  foreignKey: 'UserID'
});

db.ReadingBookList.belongsToMany(db.books, {
  through: db.ReadingBookListBooks,
  foreignKey: 'ReadingBookListID'
});

db.books.belongsToMany(db.ReadingBookList, {
  through: db.ReadingBookListBooks,
  foreignKey: 'BookID'
});


// db.events.belongsToMany(db.users, {through: db.participants, as: "Participants"})

const sync = (async () => {
    await sessionStore.sync()
    await sequelize.sync({alter: true});
    console.log('DB sync has been completed.');
})

module.exports = {db, sync, sessionStore};