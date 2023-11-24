module.exports = (sequelize, DataTypes) => {
    const Activitys = sequelize.define("Activitys", {
        activityCode: {
            type: DataTypes.STRING,
        },
        activityDate: {
            type: DataTypes.DATE,
        },
        activityTime: {
            type: DataTypes.TIME,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        

    });

    Activitys.associate = (models) => {
        Activitys.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });

        Activitys.hasMany(models.Device, {
            foreignKey: 'activityId',
            onDelete: 'CASCADE',
        });
    };

    return Activitys;
}