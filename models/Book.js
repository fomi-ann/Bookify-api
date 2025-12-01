

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define(
        'Book', {
            BookID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue:DataTypes.UUID,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ReadingTimeMin: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            PageCount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Language: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ReleaseYear: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ISBN: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            CoverImageUrl: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Rating: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
        }
    )
    console.log(Book === sequelize.models.Book)
    return Book;
}