module.exports = (sequelize, DataTypes) => {
  const ReadingBookListBooks = sequelize.define(
    'ReadingBookListBooks',
    {
      ReadingBookListID: {
        type: DataTypes.UUID,
        primaryKey: true,
      },

      BookID: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    }
  );

  return ReadingBookListBooks;
};