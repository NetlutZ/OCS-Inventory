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
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        token:{
            type: DataTypes.STRING,
        },
        role:{
            type: DataTypes.STRING,
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