module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'Event', {
            "EventID": {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue:DataTypes.UUID,
            },
            EventName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            EventStartDate: {
                type: DataTypes.DATETIME,
                allowNull: false
            },
            EventEndDate: {
                type: DataTypes.DATETIME,
                allowNull: false
            },
            EventDescription: {
                type: DataTypes.STRING,
                allowNull: false
            },
            EventLocation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            EventCost: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            EventMaxParticipantAmount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            EventCurrentParticipantAmount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            EventLanguage: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }
    )
    console.log(Event === sequelize.models.Event)
    return Event;
}