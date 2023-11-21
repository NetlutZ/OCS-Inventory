module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define("Device", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serialNumber:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        rfid:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        warrantyExpirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    return Device;
}