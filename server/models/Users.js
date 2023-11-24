module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    Users.associate = (models) => {
        Users.hasMany(models.Activitys, {
            foreignKey: 'userId',   
            onDelete: 'CASCADE',
        });
    };
    return Users;
}