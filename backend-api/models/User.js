module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            "UserID": {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue:DataTypes.UUID,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ProfileImageUrl: {
                type: DataTypes.STRING,
                allowNull: false
            },
            PagesReadTotal: {
                type: DataTypes.INT,
                allowNull: false
            },
            BooksReadCount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        }
    )
    console.log(User === sequelize.models.User)
    return User;
}