module.exports = (sequelize, DataTypes) => {
  const ReadingBookList = sequelize.define(
    'ReadingBookList', {
    "ReadingBookListID": {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV7,
    },

    ListName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    UserID: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  });

  return ReadingBookList;
};
