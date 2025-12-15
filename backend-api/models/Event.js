module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'Event', {
            "EventID": {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue:DataTypes.UUIDV7,
            },
            EventName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            EventStartDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            EventEndDate: {
                type: DataTypes.DATE,
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
            EventMaxParticipantCount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            EventCurrentParticipantCount: {
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