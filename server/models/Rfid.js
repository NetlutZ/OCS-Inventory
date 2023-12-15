module.exports = (sequelize, DataTypes) => {
    const Rfid = sequelize.define("Rfid", {
        tag: {
            type: DataTypes.STRING,
        },
        lastEdit: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    return Rfid;
}