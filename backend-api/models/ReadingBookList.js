module.exports = (sequelize, DataTypes) => {
    const ReadingBookList = sequelize.define(
        'ReadingBookList',{
            ReadingBookListID:{
                type: DataTypes.UUID,
                primaryKey: true,
                DefaultValue: DataTypes.UUIDV7,
            },

            ListName: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            Comment: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            BookAddedDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },

        }
    )
    console.log(ReadingBookList === sequelize.models.ReadingBookList)
    return ReadingBookList;
}