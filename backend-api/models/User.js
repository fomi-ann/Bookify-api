module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            "UserID": {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue:DataTypes.UUIDV7,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            UserName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            FullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            DisplayName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            PhoneNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            PasswordHASH: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ProfileImageUrl: {
                type: DataTypes.STRING,
                allowNull: false
            },
            PagesReadTotal: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            BooksReadCount: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IsAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    )
    console.log(User === sequelize.models.User)
    return User;
}