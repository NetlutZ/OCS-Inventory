module.exports = (sequelize, DataTypes) => {
    const Rfid = sequelize.define("Rfid", {
        rfid: {
            type: DataTypes.STRING,
        },
        lastScan: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        count: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
        },
        อิอิ: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false

    });

    return Rfid;
}